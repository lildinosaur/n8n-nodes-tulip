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
				operation: ['deleteRecords'],
			},
		},
	},
	{
		displayName: 'Allow Records In Use',
		name: 'allowRecordsInUse',
		type: 'boolean',
		default: false,
		displayOptions: {
				show: {
						resource: ['table'],
						operation: ['deleteRecords'],
				},
		},
		// eslint-disable-next-line n8n-nodes-base/node-param-description-boolean-without-whether
		description: 'If this option is set to true, the operation will not check for records in the table being used by a running Tulip app. If there are records in use, the apps using them may not work properly.',
	},
];
