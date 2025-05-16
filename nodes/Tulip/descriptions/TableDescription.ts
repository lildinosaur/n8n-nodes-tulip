/* eslint-disable n8n-nodes-base/node-param-default-wrong-for-limit */
/* eslint-disable n8n-nodes-base/node-param-min-value-wrong-for-limit */
/* eslint-disable n8n-nodes-base/node-param-fixed-collection-type-unsorted-items */
/* eslint-disable n8n-nodes-base/node-param-display-name-miscased */
/* eslint-disable n8n-nodes-base/node-param-options-type-unsorted-items */
import type { INodeProperties } from 'n8n-workflow';

export const tableOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		default: 'listTables',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['table'],
			},
		},
		options: [
			// Tables operations
			{
				name: 'List Tables',
				value: 'listTables',
				action: 'List tables',
			},
			{
				name: 'Create a Table',
				value: 'createTable',
				action: 'Create a table',
			},
			{
				name: 'Update a Table',
				value: 'updateTable',
				action: 'Update a table',
			},
			{
				name: 'Delete a Table',
				value: 'deleteTable',
				action: 'Delete a table',
			},
			{
				name: 'Lookup a Table',
				value: 'lookupTable',
				description: 'Gets details about a Tulip Table\'s metadata and schema',
				action: 'Lookup a table',
			},
			// Records operations
			{
				name: 'List Records',
				value: 'listRecords',
				action: 'List records',
			},
			{
				name: 'Create a Record',
				value: 'createRecord',
				action: 'Create a record',
			},
			{
				name: 'Delete a Record',
				value: 'deleteRecord',
				action: 'Delete a record',
			},
			{
				name: 'Delete All Records',
				value: 'deleteAllRecords',
				action: 'Delete all record',
			},
			{
				name: 'Count Records',
				value: 'countRecords',
				action: 'Count records',
			},
			{
				name: 'Look up a Record',
				value: 'lookupRecord',
				action: 'Look up a record',
			},
			{
				name: 'Update a Record',
				value: 'updateRecord',
				action: 'Update a record',
			},
			{
				name: 'Increment or Decrement a Field',
				value: 'incrementDecrementRecord',
				// eslint-disable-next-line n8n-nodes-base/node-param-operation-option-action-miscased
				action: 'Increment or decrement a field in a Tulip Table record',
				description: 'Increment or decrement an integer or float field of a Tulip Table Record',
			},
		],
	},
];

export const tableFields: INodeProperties[] = [
	/* -------------------------------------------------------------------------- */
	/*                                table:table ID value                        */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Table ID',
		description: 'The ID of the table. Specify an ID from the Tulip table <a href="https://support.tulip.co/docs/how-to-use-the-table-api">page</a>.',
		name: 'tableId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['table'],
			},
			hide: {
					operation: ['createTable', 'listTables'],
			},
		},
	},
	/* -------------------------------------------------------------------------- */
	/*                                operation:Create/Update table		            */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Label',
		name: 'tableLabel',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['table'],
				operation: ['createTable','updateTable'],
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
				operation: ['createTable','updateTable'],
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
						operation: ['createTable','updateTable'],
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
	/* -------------------------------------------------------------------------- */
	/*                                operation:Update table				              */
	/* -------------------------------------------------------------------------- */
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
	/* -------------------------------------------------------------------------- */
	/*                                operation:Delete all records	              */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Allow records in use',
		name: 'allowRecordsInUse',
		type: 'boolean',
		default: false,
		required: true,
		displayOptions: {
			show: {
				resource: ['table'],
				operation: ['deleteAllRecords'],
			},
		},
	},
	/* -------------------------------------------------------------------------- */
	/*                                operation:Look up record                    */
	/* -------------------------------------------------------------------------- */
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
	/* -------------------------------------------------------------------------- */
	/*                                operation:List table				  	            */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Include deleted tables',
		name: 'includeDeletedTables',
		type: 'boolean',
		default: false,
		displayOptions: {
				show: {
						resource: ['table'],
						operation: ['listTables'],
				},
		},
		description: 'Whether to include deleted tables in the response',
	},
	/* -------------------------------------------------------------------------- */
	/*                                operation:Create record 				            */
	/* -------------------------------------------------------------------------- */
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
	/* -------------------------------------------------------------------------- */
	/*                                operation:List records				              */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Include total count',
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
	},
	{
		displayName: 'Sort By',
		name: 'sortBy',
		type: 'options',
		default: 'sequenceNumber',
		displayOptions: {
				show: {
						resource: ['table'],
						operation: ['listRecords'],
				},
		},
		options: [
			{
				name: 'Sequence Number',
				value: 'sequenceNumber',
				action: 'sequenceNumber',
			},
			{
				name: 'Updated At',
				value: 'updatedAt',
				action: 'updatedAt',
			},
			{
				name: 'Created At',
				value: 'createdAt',
				action: 'createdAt',
			},
			{
				name: 'Custom Field',
				value: 'custom',
				description: 'Sort by a custom table field',
			},
		],
	},
	{
    displayName: 'Custom Sort Field',
    name: 'customSortField',
    type: 'string',
    default: '',
    displayOptions: {
        show: {
            resource: ['table'],
            operation: ['listRecords'],
            sortBy: ['custom'],
        },
    },
    placeholder: 'Enter field name',
    description: 'Name of the table field to sort by',
	},
	{
		displayName: 'Sort Direction',
		name: 'sortOrder',
		type: 'options',
		default: 'ascending',
		displayOptions: {
				show: {
						resource: ['table'],
						operation: ['listRecords'],
				},
		},
		options: [
			{
				name: 'Ascending',
				value: 'ascending',
				action: 'ascending',
			},
			{
				name: 'Descending',
				value: 'descending',
				action: 'descending',
			},
		],
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
											action: 'equal',
										},
										{
											name: 'Not equal',
											value: 'notEqual',
											action: 'all',
										},
										{
											name: 'Equal',
											value: 'equal',
											action: 'equal',
										},
										{
											name: 'Not equal',
											value: 'notEqual',
											action: 'all',
										},
										{
											name: 'Equal',
											value: 'equal',
											action: 'equal',
										},
										{
											name: 'Not equal',
											value: 'notEqual',
											action: 'all',
										},
										{
											name: 'Equal',
											value: 'equal',
											action: 'equal',
										},
										{
											name: 'Not equal',
											value: 'notEqual',
											action: 'all',
										},
										/*{
											name: 'Equal',
											value: 'equal',
											action: 'equal',
										},
										{
											name: 'Not equal',
											value: 'notEqual',
											action: 'all',
										},
										{
											name: 'Equal',
											value: 'equal',
											action: 'equal',
										},
										{
											name: 'Not equal',
											value: 'notEqual',
											action: 'all',
										},
										{
											name: 'Equal',
											value: 'equal',
											action: 'equal',
										},
										{
											name: 'Not equal',
											value: 'notEqual',
											action: 'all',
										},
										{
											name: 'Equal',
											value: 'equal',
											action: 'equal',
										},
										{
											name: 'Not equal',
											value: 'notEqual',
											action: 'all',
										},*/
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
	/* -------------------------------------------------------------------------- */
	/*                                operation:Count records filter              */
	/* -------------------------------------------------------------------------- */
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
											name: 'Not equal',
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
						operation: ['countRecords','listRecords'],
				},
		},
		options: [
			{
				name: 'any',
				value: 'any',
				action: 'any',
			},
			{
				name: 'all',
				value: 'all',
				action: 'all',
			},
		],
		description: 'How the filters in the filters parameter are combined. all means that every filter must match a record in order for the record to be included. any means at least one filter must match a record in order for the record to be included.',
	},
	/* -------------------------------------------------------------------------- */
	/*                                operation:List records (next)               */
	/* -------------------------------------------------------------------------- */
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
