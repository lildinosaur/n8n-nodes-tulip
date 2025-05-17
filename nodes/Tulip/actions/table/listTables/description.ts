import type { INodeProperties } from 'n8n-workflow';

export const description: INodeProperties[] = [
	{
		displayName: 'Include Deleted Tables',
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
];
