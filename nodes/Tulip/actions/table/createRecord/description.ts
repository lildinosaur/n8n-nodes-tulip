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
				operation: ['createRecord'],
			},
		},
		typeOptions: {
			loadOptionsMethod: 'getTables',
		},
	},
	{
		displayName: 'Columns',
		name: 'columns',
		type: 'fixedCollection',
		typeOptions: {
				multipleValues: true,
				sortable: true,
		},
		displayOptions: {
				show: {
						resource: ['table'],
						operation: ['createRecord'],
				},
		},
		default: {
			columnValues: [
				{
						columnName: 'id',
						columnValue: '',
				},
			],
		},
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
										displayName: 'Column Value',
										name: 'columnValue',
										type: 'string',
										default: '',
										description: 'Value to set for this column',
										required: true,
								},
						],
				},
		],
		description: 'The columns and values to create in the record',
	},
];
