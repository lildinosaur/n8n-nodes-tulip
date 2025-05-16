/* eslint-disable n8n-nodes-base/node-param-display-name-miscased */
/* eslint-disable n8n-nodes-base/node-param-options-type-unsorted-items */
import type { INodeProperties } from 'n8n-workflow';

export const machineOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		default: 'setMachineAttributeValue',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['machine'],
			},
		},
		options: [
			{
				name: 'Set machine attribute value',
				value: 'setMachineAttributeValue',
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
];

export const machineFields: INodeProperties[] = [
	/* -------------------------------------------------------------------------- */
	/*                                machine:set machine attributes value        */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Machine ID',
		description: 'The ID of the machine to write the attribute value to. Specify an ID from the Tulip machine <a href="https://support.tulip.co/docs/how-to-use-the-machine-attributes-api">page</a>.',
		name: 'machineId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['machine'],
				operation: ['setMachineAttributeValue'],
			},
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
				operation: ['setMachineAttributeValue'],
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
				operation: ['setMachineAttributeValue'],
			},
		},
	},
];
