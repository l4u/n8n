import {
	IExecuteFunctions,
} from 'n8n-core';

import {
	IDataObject,
	ILoadOptionsFunctions,
	INodeExecutionData,
	INodePropertyOptions,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';

import {
	lingvaNexApiRequest,
} from './GenericFunctions';

export class LingvaNex implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'LingvaNex',
		name: 'lingvaNex',
		icon: 'file:lingvanex.png',
		group: ['output'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Consume LingvaNex API',
		defaults: {
			name: 'LingvaNex',
			color: '#00ade8',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'lingvaNexApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				options: [
					{
						name: 'Translate',
						value: 'translate',
						description: 'Translate data',
					},
				],
				default: 'translate',
				description: 'The operation to perform',
			},
			// ----------------------------------
			//         All
			// ----------------------------------
			{
				displayName: 'Text',
				name: 'text',
				type: 'string',
				default: '',
				description: 'The input text to translate',
				required: true,
				displayOptions: {
					show: {
						operation: [
							'translate',
						],
					},
				},
			},
			{
				displayName: 'Translate To',
				name: 'translateTo',
				type: 'options',
				typeOptions: {
					loadOptionsMethod: 'getLanguages',
				},
				default: '',
				description: 'The language to use for translation of the input text, set to one of the language codes listed in <a href="https://cloud.google.com/translate/docs/languages">Language Support</a>',
				required: true,
				displayOptions: {
					show: {
						operation: [
							'translate',
						],
					},
				},
			},
			{
				displayName: 'Additional Options',
				name: 'options',
				type: 'collection',
				placeholder: 'Add Option',
				default: {},
				displayOptions: {
					show: {
						operation: [
							'translate',
						],
					},
				},
				options: [
					{
						displayName: 'From',
						name: 'from',
						type: 'options',
						typeOptions: {
							loadOptionsMethod: 'getLanguages',
						},
						default: '',
						description: 'The language code in the format “language code_code of the country”. If this parameter is not present, the auto-detect language mode is enabled.',
					},
					{
						displayName: 'Platform',
						name: 'platform',
						type: 'string',
						default: 'api',
						description: '',
					},
					{
						displayName: 'Translate Mode',
						name: 'translateMode',
						type: 'string',
						default: '',
						description: 'Describe the input text format. Possible value is "html" for translating and preserving html structure. If value is not specified or is other than "html" than plain text is translating.',
					},
				],
			},
		],
	};

	methods = {
		loadOptions: {
			async getLanguages(
				this: ILoadOptionsFunctions,
			): Promise<INodePropertyOptions[]> {
				const returnData: INodePropertyOptions[] = [];
				const data = await lingvaNexApiRequest.call(
					this,
					'GET',
					'/getLanguages',
					{},
					{'platform': 'api'},
				);
				for (const language of data.result) {
					returnData.push({
						name: language.englishName,
						value: language.full_code,
					});
				}
				return returnData;
			},
		},
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const length = items.length as unknown as number;

		const operation = this.getNodeParameter('operation', 0) as string;
		const responseData = [];
		for (let i = 0; i < length; i++) {
			if (operation === 'translate') {
				const text = this.getNodeParameter('text', i) as string;
				const translateTo = this.getNodeParameter('translateTo', i) as string;
				const options = this.getNodeParameter('options', i) as IDataObject;

				const body: IDataObject = {
					data: text,
					to: translateTo,
					platform: 'api',
				};

				Object.assign(body, options);

				const response = await lingvaNexApiRequest.call(this, 'POST', `/translate`, body);
				responseData.push(response);
			}
		}
		return [this.helpers.returnJsonArray(responseData)];
	}
}
