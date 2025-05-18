import type { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';

import { apiRequest } from '../../../transport';

export async function execute(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const tableId = this.getNodeParameter('tableId', index) as string;
	const recordId = this.getNodeParameter('recordId', index) as string;
	const fields = this.getNodeParameter('fields', index, []) as string[];
	const body = {} as IDataObject;
	const qs = {} as IDataObject;
	const requestMethod = 'GET';
	const endpoint = `tables/${tableId}/records/${recordId}`;

	// Add fields to query string if any are specified
	if (fields.length > 0) {
		qs.fields = JSON.stringify(fields);
	}

	const responseData = await apiRequest.call(this, requestMethod, endpoint, body, qs);

	return this.helpers.returnJsonArray(responseData as IDataObject[]);
}
