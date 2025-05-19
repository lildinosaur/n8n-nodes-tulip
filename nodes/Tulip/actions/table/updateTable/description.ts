/* eslint-disable n8n-nodes-base/node-param-min-value-wrong-for-limit */
/* eslint-disable n8n-nodes-base/node-param-default-wrong-for-limit */
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
				operation: ['updateTable'],
			},
		},
		typeOptions: {
			loadOptionsMethod: 'getTables',
		},
	},
	{
		displayName: 'Deleted',
		name: 'deleted',
		description: 'Whether the Table should be hidden from the Tulip Tables UI. If not specified, the Table\'s deleted status is unchanged.',
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
						operation: ['updateTable'],
				},
		},
		default: {
			columnValues: [
					{
							columnName: 'id',
							label: 'ID',
							description: 'Primary identifier for the table',
							dataType: 'text',
							hidden: false,
							unique: true,
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
		description: 'The spec for updating a Tulip Table. The spec must include all existing columns of the Table, including the ID column. The data type of existing columns cannot be changed. If you wish to change a column\'s type, hide the existing column and make a new column with the desired type',
	},
];
