import type {
	INodeTypeDescription,
	INodeType,
	IExecuteFunctions,
 } from 'n8n-workflow';

import { NodeConnectionType } from 'n8n-workflow';

import { router } from './actions/router';
import { loadOptions } from './methods';
import * as table from './actions/table';
import * as machine from './actions/machine';

export class Tulip implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Tulip',
		name: 'tulip',
		icon: 'file:tulip.svg',
		group: ['transform'],
		version: 1,
		description: 'Consume Tulip API',
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		defaults: {
			name: 'Tulip',
		},
		usableAsTool: true,
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
		credentials: [
			{
					name: 'tulipApi',
					required: true,
					testedBy: 'tulipApiTest',
			},
	],
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				default: 'table',
				noDataExpression: true,
				options: [
					{
						name: 'Table',
						value: 'table',
					},
					{
						name: 'Machine',
						value: 'machine',
					},
				],
			},
			...table.description,
			...machine.description,
		],
	}

	methods = { loadOptions };

	async execute(this: IExecuteFunctions) {
		return await router.call(this);
	}
}
