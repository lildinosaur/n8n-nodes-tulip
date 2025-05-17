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
				operation: ['lookupRecord'],
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
				operation: ['lookupRecord'],
			},
		},
	},
	{
		displayName: 'Fields',
		name: 'columns',
		type: 'fixedCollection',
		typeOptions: {
				multipleValues: true,
				sortable: true,
		},
		displayOptions: {
				show: {
						resource: ['table'],
						operation: ['lookupRecord'],
				},
		},
		default: {},
		placeholder: 'Add Field',
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
						],
				},
		],
		description: 'The colection of columns to filter the query by',
	},
];
