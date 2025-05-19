/* eslint-disable n8n-nodes-base/node-param-description-boolean-without-whether */
/* eslint-disable n8n-nodes-base/node-param-min-value-wrong-for-limit */
/* eslint-disable n8n-nodes-base/node-param-default-wrong-for-limit */
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
				operation: ['listRecords'],
			},
		},
	},
	{
		displayName: 'Include Total Count',
		name: 'includeTotalCount',
		type: 'boolean',
		default: false,
		required: true,
		displayOptions: {
			show: {
				resource: ['table'],
				operation: ['listRecords'],
			},
		},
		description: 'If this flag is set, the total number of records in the Table which match the filters is returned in the X-Total-Count header in the response. Determining this count requires an extra (potentially expensive) database query, so clients should omit this flag if the total count is not needed.',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		default: 10,
    typeOptions: {
			minValue: 0,
    },
		required: true,
		displayOptions: {
			show: {
				resource: ['table'],
				operation: ['listRecords'],
			},
		},
		description: 'Max number of results to return',
	},
	{
		displayName: 'Offset',
		name: 'offset',
		type: 'number',
		default: 0,
    typeOptions: {
			minValue: 0,
    },
		required: true,
		displayOptions: {
			show: {
				resource: ['table'],
				operation: ['listRecords'],
			},
		},
		description: 'Offset of results to return',
	},
	{
		displayName: 'Sort Options',
		name: 'sortOptions',
		type: 'fixedCollection',
		typeOptions: {
				multipleValues: true,
				sortable: true,
		},
		displayOptions: {
				show: {
						resource: ['table'],
						operation: ['listRecords'],
				},
		},
		default: {},
		placeholder: 'Add Options',
		options: [
				{
						name: 'sortValues',
						displayName: 'Sort',
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
									displayName: 'Sort Direction',
									name: 'sortOrder',
									type: 'options',
									default: 'asc',
									options: [
										{
											name: 'Ascending',
											value: 'asc',
											action: 'asc',
										},
										{
											name: 'Descending',
											value: 'desc',
											action: 'desc',
										},
									],
								},
						],
				},
		],
		description: 'The columns and values to create in the record',
	},
	{
		displayName: 'Filters',
		name: 'filters',
		type: 'fixedCollection',
		typeOptions: {
				multipleValues: true,
				sortable: true,
		},
		displayOptions: {
				show: {
						resource: ['table'],
						operation: ['listRecords'],
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
													description: 'Value equals the filter value',
											},
											{
													name: 'Not Equal',
													value: 'notEqual',
													description: 'Value does not equal the filter value',
											},
											{
													name: 'Blank',
													value: 'blank',
													description: 'Value is empty or null',
											},
											{
													name: 'Not Blank',
													value: 'notBlank',
													description: 'Value is not empty and not null',
											},
											{
													name: 'Greater Than or Equal',
													value: 'greaterThanOrEqual',
													description: 'Value is greater than or equal to the filter value',
											},
											{
													name: 'Less Than or Equal',
													value: 'lessThanOrEqual',
													description: 'Value is less than or equal to the filter value',
											},
											{
													name: 'Greater Than',
													value: 'greaterThan',
													description: 'Value is greater than the filter value',
											},
											{
													name: 'Less Than',
													value: 'lessThan',
													description: 'Value is less than the filter value',
											},
											{
													name: 'Contains',
													value: 'contains',
													description: 'Value contains the filter value',
											},
											{
													name: 'Does Not Contain',
													value: 'notContains',
													description: 'Value does not contain the filter value',
											},
											{
													name: 'Starts With',
													value: 'startsWith',
													description: 'Value starts with the filter value',
											},
											{
													name: 'Does Not Start With',
													value: 'notStartsWith',
													description: 'Value does not start with the filter value',
											},
											{
													name: 'Ends With',
													value: 'endsWith',
													description: 'Value ends with the filter value',
											},
											{
													name: 'Does Not End With',
													value: 'notEndsWith',
													description: 'Value does not end with the filter value',
											},
											{
													name: 'Is In List',
													value: 'isIn',
													description: 'Value is in the list of filter values',
											},
											{
													name: 'Is Not In List',
													value: 'notIsIn',
													description: 'Value is not in the list of filter values',
											},
									],
									description: 'The comparison operator to use for filtering',
								},
								{
										displayName: 'Value',
										name: 'columnValue',
										type: 'string',
										default: '',
										description: 'Value to set for this column',
										required: true,
										displayOptions: {
											hide: {
												filterFunction: ['notBlank','blank'],
											},
									},
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
						operation: ['listRecords'],
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
