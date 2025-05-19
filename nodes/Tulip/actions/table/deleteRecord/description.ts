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
				operation: ['deleteRecord'],
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
				operation: ['deleteRecord'],
			},
		},
		typeOptions: {
			loadOptionsMethod: 'getRecordsIDs',
			loadOptionsDependsOn: ['tableId'],
		},
	},
];
