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
				operation: ['updateRecord'],
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
				operation: ['updateRecord'],
			},
		},
		typeOptions: {
			loadOptionsMethod: 'getRecordsIDs',
			loadOptionsDependsOn: ['tableId'],
		},
	},
	{
		displayName: 'Colmumns',
		name: 'columns',
		type: 'fixedCollection',
		typeOptions: {
				multipleValues: true,
				sortable: true,
		},
		displayOptions: {
				show: {
						resource: ['table'],
						operation: ['updateRecord'],
				},
		},
		default: {},
		placeholder: 'Add Column',
		options: [
				{
						name: 'columnValues',
						displayName: 'Column',
						values: [
								{
									displayName: 'Column Name or ID',
									name: 'columnName',
									type: 'options',
									description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
									default: '',
									required: true,
									typeOptions: {
										loadOptionsMethod: 'getColumns',
										loadOptionsDependsOn: ['tableId'],
									},
								},
								{
									displayName: 'Value',
									name: 'columnValue',
									type: 'string',
									default: '',
									required: true,
								},
						],
				},
		],
	},
];
