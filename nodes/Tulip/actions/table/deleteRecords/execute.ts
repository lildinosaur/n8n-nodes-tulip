import type { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';

import { apiRequest } from '../../../transport';

export async function execute(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const tableId = this.getNodeParameter('tableId', index) as string;
	const includeDeletedTables = this.getNodeParameter('includeDeletedTables', index, false) as boolean;
	const body = {} as IDataObject;
	const qs = {} as IDataObject;
	const requestMethod = 'DELETE';
	const endpoint = `tables/${tableId}/records/`;

	qs.includeDeleted = includeDeletedTables;

	const responseData = await apiRequest.call(this, requestMethod, endpoint, body, qs);

	return this.helpers.returnJsonArray(responseData as IDataObject[]);
}
