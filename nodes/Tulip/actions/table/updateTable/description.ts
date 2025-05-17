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
				operation: ['updateTable'],
			},
		},
	},
	{
		displayName: 'Deleted',
		name: 'deleted',
		type: 'boolean',
		default: false,
		required: true,
		displayOptions: {
			show: {
				resource: ['table'],
				operation: ['updateTable'],
			},
		},
	},
	{
		displayName: 'Label',
		name: 'tableLabel',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['table'],
				operation: ['updateTable'],
			},
		},
	},
	{
		displayName: 'Description',
		name: 'description',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['table'],
				operation: ['updateTable'],
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
						operation: ['updateTable'],
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
									displayName: 'Column Name',
									name: 'columnName',
									type: 'string',
									default: '',
									description: '<a href="https://support.tulip.co/docs/an-overview-of-tables">Name</a> of the table',
									required: true,
								},
								{
									displayName: 'Label',
									name: 'label',
									type: 'string',
									default: '',
									description: '<a href="https://support.tulip.co/docs/an-overview-of-tables">Label</a> of the table',
									required: true,
								},
								{
									displayName: 'Description',
									name: 'description',
									type: 'string',
									default: '',
									description: '<a href="https://support.tulip.co/docs/an-overview-of-tables">Description</a> of the table',
									required: true,
								},
								{
									displayName: 'Data Type',
									name: 'dateType',
									type: 'options',
									default: 'text',
									description: '<a href="https://support.tulip.co/docs/data-types-in-tulip">Data Type</a> of the column in the table',
									required: true,
									options: [
										{
											name: 'Text',
											value: 'text',
										},
										{
											name: 'Number',
											value: 'number',
										},
										{
											name: 'Datetime',
											value: 'datetime',
										},
										{
											name: 'Boolean',
											value: 'boolean',
										},
										{
											name: 'Interval',
											value: 'interval',
										},
										{
											name: 'File',
											value: 'file',
										},
										{
											name: 'Image',
											value: 'image',
										},
										{
											name: 'Video',
											value: 'video',
										},
										{
											name: 'Audio',
											value: 'audio',
										},
										{
											name: 'Color',
											value: 'color',
										},
										{
											name: 'User',
											value: 'user',
										},
										{
											name: 'Machine',
											value: 'machine',
										},
										{
											name: 'Station',
											value: 'station',
										},
										{
											name: 'Linked Record',
											value: 'linkedRecord',
										},
									],
								},
								{
									displayName: 'Hidden',
									name: 'hidden',
									type: 'boolean',
									default: false,
									required: true,
								},
								{
									displayName: 'Unique',
									name: 'unique',
									type: 'boolean',
									default: false,
									required: true,
								},
						],
				},
		],
		description: 'The colection of columns to filter the query by',
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
];
