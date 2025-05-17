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
				operation: ['countRecords'],
			},
		},
	},
	{
		displayName: 'Filter',
		name: 'filters',
		type: 'fixedCollection',
		typeOptions: {
				multipleValues: true,
				sortable: true,
		},
		displayOptions: {
				show: {
						resource: ['table'],
						operation: ['countRecords'],
				},
		},
		default: {},
		placeholder: 'Add Filter',
		options: [
				{
						name: 'filterValues',
						displayName: 'Filter',
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
									displayName: 'Function',
									name: 'filterFunction',
									type: 'options',
									default: 'equal',
									options: [
										{
											name: 'Equal',
											value: 'equal',
											action: 'equal',
										},
										{
											name: 'Not Equal',
											value: 'notEqual',
											action: 'all',
										},
									],
									description: 'How the filters in the filters parameter are combined. all means that every filter must match a record in order for the record to be included. any means at least one filter must match a record in order for the record to be included.',
								},
								{
										displayName: 'Value',
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
	{
		displayName: 'Filter aggregator',
		name: 'filterAggregator',
		type: 'options',
		default: 'all',
		displayOptions: {
				show: {
						resource: ['table'],
						operation: ['countRecords'],
				},
		},
		options: [
			{
				name: 'Any',
				value: 'any',
				action: 'any',
			},
			{
				name: 'All',
				value: 'all',
				action: 'all',
			},
		],
		description: 'How the filters in the filters parameter are combined. all means that every filter must match a record in order for the record to be included. any means at least one filter must match a record in order for the record to be included.',
	},
];
