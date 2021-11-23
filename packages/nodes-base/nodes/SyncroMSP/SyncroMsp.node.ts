import {
	INodeTypeBaseDescription,
	INodeVersionedType,
} from 'n8n-workflow';

import { NodeVersionedType } from '../../src/NodeVersionedType';

import { SyncroMspV1 } from './v1/SyncroMspV1.node';

export class SyncroMsp extends NodeVersionedType {
	constructor() {
		const baseDescription: INodeTypeBaseDescription = {
			displayName: 'SyncroMSP',
			name: 'syncromsp',
			icon: 'file:syncromsp.png',
			group: ['output'],
			subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
			description: 'Gets data from SyncroMSP',
			defaultVersion: 1,
		};

		const nodeVersions: INodeVersionedType['nodeVersions'] = {
			1: new SyncroMspV1(baseDescription),
		};

		super(nodeVersions, baseDescription);
	}
}
