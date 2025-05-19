/* eslint-disable n8n-nodes-base/node-param-fixed-collection-type-unsorted-items */
/* eslint-disable n8n-nodes-base/node-param-options-type-unsorted-items */
import type { INodeProperties } from 'n8n-workflow';

export const description: INodeProperties[] = [
	{
		displayName: 'Machine Name or ID',
		description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
		name: 'machineId',
		type: 'options',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['machine'],
				operation: ['setMachineAttribute'],
			},
		},
		typeOptions: {
			loadOptionsMethod: 'getMachines',
		},
	},
	{
		displayName: 'Attribute ID',
		description: 'The ID of the attribute to write the value to. Specify an ID from the Tulip machine <a href="https://support.tulip.co/docs/how-to-use-the-machine-attributes-api">page</a>.',
		name: 'attributeId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['machine'],
				operation: ['setMachineAttribute'],
			},
		},
	},
	{
		displayName: 'Value',
		name: 'value',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['machine'],
				operation: ['setMachineAttribute'],
			},
		},
	},
];
