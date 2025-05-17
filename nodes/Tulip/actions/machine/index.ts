/* eslint-disable n8n-nodes-base/node-param-default-wrong-for-limit */
/* eslint-disable n8n-nodes-base/node-param-min-value-wrong-for-limit */
/* eslint-disable n8n-nodes-base/node-param-fixed-collection-type-unsorted-items */
/* eslint-disable n8n-nodes-base/node-param-display-name-miscased */
/* eslint-disable n8n-nodes-base/node-param-options-type-unsorted-items */
import type { INodeProperties } from 'n8n-workflow';

import * as listMachines from './listMachines';
import * as setMachineAttribute from './setMachineAttribute';

export {
	listMachines
	, setMachineAttribute
};

export const description: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		default: 'setMachineAttribute',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['machine'],
			},
		},
		options: [
			{
				name: 'Set machine attribute value',
				value: 'setMachineAttribute',
				description: 'Set a machine attribute value',
				action: 'Set a machine attribute value',
			},
			{
				name: 'List Machines',
				value: 'listMachines',
				action: 'List machines',
			},
		],
	},
	...listMachines.description,
	...setMachineAttribute.description,
];
