/* eslint-disable n8n-nodes-base/node-param-fixed-collection-type-unsorted-items */
/* eslint-disable n8n-nodes-base/node-param-options-type-unsorted-items */
import type { INodeProperties } from 'n8n-workflow';

export const description: INodeProperties[] = [
	{
		displayName: 'Label',
		name: 'tableLabel',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['table'],
				operation: ['createTable'],
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
				operation: ['createTable'],
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
						operation: ['createTable'],
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
									name: 'dataType',
									type: 'options',
									default: 'string',
									description: '<a href="https://support.tulip.co/docs/data-types-in-tulip">Data Type</a> of the column in the table',
									required: true,
									options: [
										{
											name: 'Text',
											value: 'string',
										},
										{
											name: 'Number',
											value: 'float',
										},
										{
											name: 'Integer',
											value: 'integer',
										},
										{
											name: 'Datetime',
											value: 'timestamp',
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
											name: 'Image',
											value: 'imageUrl',
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
											name: 'File (File/Video)',
											value: 'fileUrl',
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
	},
];
