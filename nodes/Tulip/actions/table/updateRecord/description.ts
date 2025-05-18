/* eslint-disable n8n-nodes-base/node-param-fixed-collection-type-unsorted-items */
/* eslint-disable n8n-nodes-base/node-param-options-type-unsorted-items */
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
				operation: ['updateRecord'],
			},
		},
	},
	{
		displayName: 'Record ID',
		name: 'recordId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['table'],
				operation: ['updateRecord'],
			},
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
									displayName: 'Column ID',
									name: 'columnName',
									type: 'string',
									default: '',
									description: '<a href="https://support.tulip.co/docs/an-overview-of-tables">Name</a> of the table',
									required: true,
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
