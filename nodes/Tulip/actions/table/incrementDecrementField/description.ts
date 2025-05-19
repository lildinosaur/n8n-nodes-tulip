/* eslint-disable n8n-nodes-base/node-param-fixed-collection-type-unsorted-items */
/* eslint-disable n8n-nodes-base/node-param-options-type-unsorted-items */
import type { INodeProperties } from 'n8n-workflow';

export const description: INodeProperties[] = [
	{
		displayName: 'Table Name or ID',
		name: 'tableId',
		type: 'options',
		description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['table'],
				operation: ['incrementDecrementField'],
			},
		},
		typeOptions: {
			loadOptionsMethod: 'getTables',
		},
	},
	{
		displayName: 'Record Name or ID',
		name: 'recordId',
		type: 'options',
		description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['table'],
				operation: ['incrementDecrementField'],
			},
		},
		typeOptions: {
			loadOptionsMethod: 'getRecordsIDs',
			loadOptionsDependsOn: ['tableId'],
		},
	},
	{
		displayName: 'Column Name or ID',
		name: 'fieldId',
		type: 'options',
		description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['table'],
				operation: ['incrementDecrementField'],
			},
		},
		typeOptions: {
			loadOptionsMethod: 'getColumns',
			loadOptionsDependsOn: ['tableId'],
		},
	},
	{
		displayName: 'Value',
		name: 'value',
		type: 'number',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['table'],
				operation: ['incrementDecrementField'],
			},
		},
	},
];
