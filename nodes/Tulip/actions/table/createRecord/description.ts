import type { INodeProperties } from 'n8n-workflow';

export const description: INodeProperties[] = [
	{
		displayName: 'Table ID',
		name: 'tableId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['table'],
				operation: ['createRecord'],
			},
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
										displayName: 'Column Name (ID)',
										name: 'columnName',
										type: 'string',
										default: '',
										description: 'ID of the column in the table',
										required: true,
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
