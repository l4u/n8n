import {
	INodeProperties,
} from 'n8n-workflow';

export const leadOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		displayOptions: {
			show: {
				resource: [
					'lead',
				],
			},
		},
		options: [
			{
				name: 'Add Lead To Campaign',
				value: 'addToCampaign',
				description: 'Add lead to a campaign',
			},
			{
				name: 'Add Note',
				value: 'addNote',
				description: 'Add note to a lead',
			},
			{
				name: 'Create',
				value: 'create',
				description: 'Create a lead',
			},
			{
				name: 'Create or Update',
				value: 'upsert',
				description: 'Create a new lead, or update the current one if it already exists (upsert)',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a lead',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a lead',
			},
			{
				name: 'Get All',
				value: 'getAll',
				description: 'Get all leads',
			},
			{
				name: 'Get Summary',
				value: 'getSummary',
				description: `Returns an overview of Lead's metadata`,
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a lead',
			},
		],
		default: 'create',
		description: 'The operation to perform.',
	},
];

export const leadFields: INodeProperties[] = [

	/* -------------------------------------------------------------------------- */
	/*                                lead:create                                 */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Match Against',
		name: 'externalId',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getExternalIdFields',
			loadOptionsDependsOn: [
				'resource',
			],
		},
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: [
					'lead',
				],
				operation: [
					'upsert',
				],
			},
		},
		description: `The field to check to see if the lead already exists`,
	},
	{
		displayName: 'Value to Match',
		name: 'externalIdValue',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: [
					'lead',
				],
				operation: [
					'upsert',
				],
			},
		},
		description: `If this value exists in the 'match against' field, update the lead. Otherwise create a new one`,
	},
	{
		displayName: 'Company',
		name: 'company',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: [
					'lead',
				],
				operation: [
					'create',
					'upsert',
				],
			},
		},
		description: 'Company of the lead. If person account record types have been enabled, and if the value of Company is null, the lead converts to a person account.',
	},
	{
		displayName: 'Last Name',
		name: 'lastname',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: [
					'lead',
				],
				operation: [
					'create',
					'upsert',
				],
			},
		},
		description: 'Required. Last name of the lead. Limited to 80 characters.',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: [
					'lead',
				],
				operation: [
					'create',
					'upsert',
				],
			},
		},
		options: [
			{
				displayName: 'Annual Revenue',
				name: 'annualRevenue',
				type: 'number',
				typeOptions: {
					numberPrecision: 2,
					numberStepSize: 1,
				},
				default: '',
				description: 'Annual revenue for the company of the lead.',
			},
			{
				displayName: 'City',
				name: 'city',
				type: 'string',
				default: '',
				description: 'City for the address of the lead.',
			},
			{
				displayName: 'Custom Fields',
				name: 'customFieldsUi',
				placeholder: 'Add Custom Field',
				type: 'fixedCollection',
				typeOptions: {
					multipleValues: true,
				},
				description: 'Filter by custom fields ',
				default: {},
				options: [
					{
						name: 'customFieldsValues',
						displayName: 'Custom Field',
						values: [
							{
								displayName: 'Field ID',
								name: 'fieldId',
								type: 'options',
								typeOptions: {
									loadOptionsMethod: 'getCustomFields',
								},
								default: '',
								description: 'The ID of the field to add custom field to.',
							},
							{
								displayName: 'Value',
								name: 'value',
								type: 'string',
								default: '',
								description: 'The value to set on custom field.',
							},
						],
					},
				],
			},
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				typeOptions: {
					alwaysOpenEditWindow: true,
				},
				default: '',
				description: 'Description of the lead.',
			},
			{
				displayName: 'Email',
				name: 'email',
				type: 'string',
				default: '',
				description: 'Email address for the lead.',
			},
			{
				displayName: 'Fist Name',
				name: 'firstname',
				type: 'string',
				default: '',
				description: 'First name of the lead. Limited to 40 characters.',
			},
			{
				displayName: 'Industry',
				name: 'industry',
				type: 'string',
				default: '',
				description: 'Website for the lead.',
			},
			{
				displayName: 'Is Unread By Owner',
				name: 'IsUnreadByOwner',
				type: 'boolean',
				default: false,
				description: 'If true, lead has been assigned, but not yet viewed. See Unread Leads for more information. Label is Unread By Owner.',
			},
			{
				displayName: 'Jigsaw',
				name: 'jigsaw',
				type: 'string',
				default: '',
				description: `references the ID of a contact in Data.com.
				If a lead has a value in this field, it means that a contact was imported as a lead from Data.com.`,
			},
			{
				displayName: 'Lead Source',
				name: 'leadSource',
				type: 'options',
				typeOptions: {
					loadOptionsMethod: 'getLeadSources',
				},
				default: '',
				description: 'Source from which the lead was obtained.',
			},
			{
				displayName: 'Mobile Phone',
				name: 'mobilePhone',
				type: 'string',
				default: '',
				description: `Contact’s mobile phone number.`,
			},
			{
				displayName: 'Number Of Employees',
				name: 'numberOfEmployees',
				type: 'number',
				typeOptions: {
					numberStepSize: 1,
				},
				default: '',
				description: 'Number of employees at the lead’s company. Label is Employees.',
			},
			{
				displayName: 'Owner',
				name: 'owner',
				type: 'options',
				typeOptions: {
					loadOptionsMethod: 'getLeadOwners',
				},
				default: '',
				description: 'The owner of the lead.',
			},
			{
				displayName: 'Phone',
				name: 'phone',
				type: 'string',
				default: '',
				description: 'Phone number for the lead.',
			},
			{
				displayName: 'Postal Code',
				name: 'postalCode',
				type: 'string',
				default: '',
				description: 'Postal code for the address of the lead. Label is Zip/Postal Code.',
			},
			{
				displayName: 'Record Type ID',
				name: 'recordTypeId',
				type: 'options',
				typeOptions: {
					loadOptionsMethod: 'getRecordTypes',
				},
				default: '',
			},
			{
				displayName: 'Rating',
				name: 'rating',
				type: 'string',
				default: '',
				description: 'Rating of the lead.',
			},
			{
				displayName: 'Salutation',
				name: 'salutation',
				type: 'string',
				default: '',
				description: 'Salutation for the lead.',
			},
			{
				displayName: 'State',
				name: 'state',
				type: 'string',
				default: '',
				description: 'State for the address of the lead.',
			},
			{
				displayName: 'Status',
				name: 'status',
				type: 'options',
				typeOptions: {
					loadOptionsMethod: 'getLeadStatuses',
				},
				default: '',
				description: 'Status code for this converted lead.',
			},
			{
				displayName: 'Street',
				name: 'street',
				type: 'string',
				default: '',
				description: 'Street number and name for the address of the lead.',
			},
			{
				displayName: 'Title',
				name: 'title',
				type: 'string',
				default: '',
				description: 'Title for the lead, for example CFO or CEO.',
			},
			{
				displayName: 'Website',
				name: 'website',
				type: 'string',
				default: '',
				description: 'Website for the lead.',
			},
		],
	},

	/* -------------------------------------------------------------------------- */
	/*                                 lead:update                                */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Lead ID',
		name: 'leadId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: [
					'lead',
				],
				operation: [
					'update',
				],
			},
		},
		description: 'ID of Lead that needs to be fetched.',
	},
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: [
					'lead',
				],
				operation: [
					'update',
				],
			},
		},
		options: [
			{
				displayName: 'Annual Revenue',
				name: 'annualRevenue',
				type: 'number',
				typeOptions: {
					numberPrecision: 2,
					numberStepSize: 1,
				},
				default: '',
				description: 'Annual revenue for the company of the lead.',
			},
			{
				displayName: 'City',
				name: 'city',
				type: 'string',
				default: '',
				description: 'City for the address of the lead.',
			},
			{
				displayName: 'Company',
				name: 'company',
				type: 'string',
				default: '',
				description: 'Company of the lead. If person account record types have been enabled, and if the value of Company is null, the lead converts to a person account.',
			},
			{
				displayName: 'Custom Fields',
				name: 'customFieldsUi',
				placeholder: 'Add Custom Field',
				type: 'fixedCollection',
				typeOptions: {
					multipleValues: true,
				},
				description: 'Filter by custom fields ',
				default: {},
				options: [
					{
						name: 'customFieldsValues',
						displayName: 'Custom Field',
						values: [
							{
								displayName: 'Field ID',
								name: 'fieldId',
								type: 'options',
								typeOptions: {
									loadOptionsMethod: 'getCustomFields',
								},
								default: '',
								description: 'The ID of the field to add custom field to.',
							},
							{
								displayName: 'Value',
								name: 'value',
								type: 'string',
								default: '',
								description: 'The value to set on custom field.',
							},
						],
					},
				],
			},
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				typeOptions: {
					alwaysOpenEditWindow: true,
				},
				default: '',
				description: 'Description of the lead.',
			},
			{
				displayName: 'Email',
				name: 'email',
				type: 'string',
				default: '',
				description: 'Email address for the lead.',
			},
			{
				displayName: 'Fist Name',
				name: 'firstname',
				type: 'string',
				default: '',
				description: 'First name of the lead. Limited to 40 characters.',
			},
			{
				displayName: 'Industry',
				name: 'industry',
				type: 'string',
				default: '',
				description: 'Website for the lead.',
			},
			{
				displayName: 'Is Unread By Owner',
				name: 'IsUnreadByOwner',
				type: 'boolean',
				default: false,
				description: 'If true, lead has been assigned, but not yet viewed. See Unread Leads for more information. Label is Unread By Owner.',
			},
			{
				displayName: 'Jigsaw',
				name: 'jigsaw',
				type: 'string',
				default: '',
				description: `references the ID of a contact in Data.com.
				If a lead has a value in this field, it means that a contact was imported as a lead from Data.com.`,
			},
			{
				displayName: 'Last Name',
				name: 'lastname',
				type: 'string',
				default: '',
				description: 'Required. Last name of the lead. Limited to 80 characters.',
			},
			{
				displayName: 'Lead Source',
				name: 'leadSource',
				type: 'options',
				typeOptions: {
					loadOptionsMethod: 'getLeadSources',
				},
				default: '',
				description: 'Source from which the lead was obtained.',
			},
			{
				displayName: 'Mobile Phone',
				name: 'mobilePhone',
				type: 'string',
				default: '',
				description: `Contact’s mobile phone number.`,
			},
			{
				displayName: 'Number Of Employees',
				name: 'numberOfEmployees',
				type: 'number',
				typeOptions: {
					numberStepSize: 1,
				},
				default: '',
				description: 'Number of employees at the lead’s company. Label is Employees.',
			},
			{
				displayName: 'Owner',
				name: 'owner',
				type: 'options',
				typeOptions: {
					loadOptionsMethod: 'getLeadOwners',
				},
				default: '',
				description: 'The owner of the lead.',
			},
			{
				displayName: 'Postal Code',
				name: 'postalCode',
				type: 'string',
				default: '',
				description: 'Postal code for the address of the lead. Label is Zip/Postal Code.',
			},
			{
				displayName: 'Phone',
				name: 'phone',
				type: 'string',
				default: '',
				description: 'Phone number for the lead.',
			},
			{
				displayName: 'Record Type ID',
				name: 'recordTypeId',
				type: 'options',
				typeOptions: {
					loadOptionsMethod: 'getRecordTypes',
				},
				default: '',
			},
			{
				displayName: 'Rating',
				name: 'rating',
				type: 'string',
				default: '',
				description: 'Rating of the lead.',
			},
			{
				displayName: 'Salutation',
				name: 'salutation',
				type: 'string',
				default: '',
				description: 'Salutation for the lead.',
			},
			{
				displayName: 'State',
				name: 'state',
				type: 'string',
				default: '',
				description: 'State for the address of the lead.',
			},
			{
				displayName: 'Status',
				name: 'status',
				type: 'options',
				typeOptions: {
					loadOptionsMethod: 'getLeadStatuses',
				},
				default: '',
				description: 'Status code for this converted lead.',
			},
			{
				displayName: 'Street',
				name: 'street',
				type: 'string',
				default: '',
				description: 'Street number and name for the address of the lead.',
			},
			{
				displayName: 'Title',
				name: 'title',
				type: 'string',
				default: '',
				description: 'Title for the lead, for example CFO or CEO.',
			},
			{
				displayName: 'Website',
				name: 'website',
				type: 'string',
				default: '',
				description: 'Website for the lead.',
			},
		],
	},

	/* -------------------------------------------------------------------------- */
	/*                                  lead:get                                  */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Lead ID',
		name: 'leadId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: [
					'lead',
				],
				operation: [
					'get',
				],
			},
		},
		description: 'ID of Lead that needs to be fetched.',
	},

	/* -------------------------------------------------------------------------- */
	/*                                  lead:delete                               */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Lead ID',
		name: 'leadId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: [
					'lead',
				],
				operation: [
					'delete',
				],
			},
		},
		description: 'ID of Lead that needs to be fetched.',
	},

	/* -------------------------------------------------------------------------- */
	/*                                 lead:getAll                                */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: [
					'lead',
				],
				operation: [
					'getAll',
				],
			},
		},
		default: false,
		description: 'If all results should be returned or only up to a given limit.',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		displayOptions: {
			show: {
				resource: [
					'lead',
				],
				operation: [
					'getAll',
				],
				returnAll: [
					false,
				],
			},
		},
		typeOptions: {
			minValue: 1,
			maxValue: 100,
		},
		default: 50,
		description: 'How many results to return.',
	},
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: [
					'lead',
				],
				operation: [
					'getAll',
				],
			},
		},
		options: [
			{
				displayName: 'Conditions',
				name: 'conditionsUi',
				placeholder: 'Add Condition',
				type: 'fixedCollection',
				typeOptions: {
					multipleValues: true,
				},
				description: 'The condition to set.',
				default: {},
				options: [
					{
						name: 'conditionValues',
						displayName: 'Condition',
						values: [
							{
								displayName: 'Field',
								name: 'field',
								type: 'options',
								typeOptions: {
									loadOptionsMethod: 'getLeadFields',
								},
								default: '',
								description: 'For date, number, or boolean, please use expressions.',
							},
							{
								displayName: 'Operation',
								name: 'operation',
								type: 'options',
								options: [
									{
										name: '=',
										value: 'equal',
									},
									{
										name: '>',
										value: '>',
									},
									{
										name: '<',
										value: '<',
									},
									{
										name: '>=',
										value: '>=',
									},
									{
										name: '<=',
										value: '<=',
									},
								],
								default: 'equal',
							},
							{
								displayName: 'Value',
								name: 'value',
								type: 'string',
								default: '',
							},
						],
					},
				],
			},
			{
				displayName: 'Fields',
				name: 'fields',
				type: 'string',
				default: '',
				description: 'Fields to include separated by ,',
			},
		],
	},

	/* -------------------------------------------------------------------------- */
	/*                            contact:addToCampaign                           */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Lead ID',
		name: 'leadId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: [
					'lead',
				],
				operation: [
					'addToCampaign',
				],
			},
		},
		description: 'ID of contact that needs to be fetched.',
	},
	{
		displayName: 'Campaign',
		name: 'campaignId',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getCampaigns',
		},
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: [
					'lead',
				],
				operation: [
					'addToCampaign',
				],
			},
		},
		description: 'ID of the campaign that needs to be fetched.',
	},
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: [
					'lead',
				],
				operation: [
					'addToCampaign',
				],
			},
		},
		options: [
			{
				displayName: 'Status',
				name: 'status',
				type: 'string',
				default: '',
				description: 'Controls the HasResponded flag on this object.',
			},
		],
	},

	/* -------------------------------------------------------------------------- */
	/*                             lead:addNote                                   */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Lead ID',
		name: 'leadId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: [
					'lead',
				],
				operation: [
					'addNote',
				],
			},
		},
		description: 'ID of lead that needs to be fetched.',
	},
	{
		displayName: 'Title',
		name: 'title',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: [
					'lead',
				],
				operation: [
					'addNote',
				],
			},
		},
		description: 'Title of the note.',
	},
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: [
					'lead',
				],
				operation: [
					'addNote',
				],
			},
		},
		options: [
			{
				displayName: 'Body',
				name: 'body',
				type: 'string',
				default: '',
				typeOptions: {
					alwaysOpenEditWindow: true,
				},
				description: 'Body of the note. Limited to 32 KB.',
			},
			{
				displayName: 'Is Private',
				name: 'isPrivate',
				type: 'boolean',
				default: false,
				description: 'If true, only the note owner or a user with the “Modify All Data” permission can view the note or query it via the API',
			},
			{
				displayName: 'Owner',
				name: 'owner',
				type: 'options',
				typeOptions: {
					loadOptionsMethod: 'getUsers',
				},
				default: '',
				description: 'ID of the user who owns the note.',
			},
		],
	},
];
