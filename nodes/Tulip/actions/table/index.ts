/* eslint-disable n8n-nodes-base/node-param-default-wrong-for-limit */
/* eslint-disable n8n-nodes-base/node-param-min-value-wrong-for-limit */
/* eslint-disable n8n-nodes-base/node-param-fixed-collection-type-unsorted-items */
/* eslint-disable n8n-nodes-base/node-param-display-name-miscased */
/* eslint-disable n8n-nodes-base/node-param-options-type-unsorted-items */
import type { INodeProperties } from 'n8n-workflow';

import * as listTables from './listTables';
import * as createTable from './createTable';
import * as updateTable from './updateTable';
import * as lookupTable from './lookupTable';
import * as listRecords from './listRecords';
import * as deleteRecords from './deleteRecords';
import * as createRecord from './createRecord';
import * as countRecords from './countRecords';
import * as lookupRecord from './lookupRecord';
import * as incrementDecrementRecord from './incrementDecrementRecord';
import * as deleteRecord from './deleteRecord';
import * as updateRecord from './updateRecord';

export {
	listTables
	, createTable
	, updateTable
	, lookupTable
	, listRecords
	, deleteRecords
	, createRecord
	, countRecords
	, lookupRecord
	, incrementDecrementRecord
	, deleteRecord
	, updateRecord
};

export const description: INodeProperties[] = [
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
				action: 'Increment or decrement a field in a tulip table record',
				description: 'Increment or decrement an integer or float field of a Tulip Table Record',
			},
		],
	},
	...listTables.description,
	...createTable.description,
	...updateTable.description,
	...lookupTable.description,
	...listRecords.description,
	...deleteRecords.description,
	...createRecord.description,
	...countRecords.description,
	...lookupRecord.description,
	...incrementDecrementRecord.description,
	...deleteRecord.description,
	...updateRecord.description,
];
