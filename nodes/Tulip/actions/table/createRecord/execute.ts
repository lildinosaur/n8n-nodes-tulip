import type { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';

import { apiRequest } from '../../../transport';

export async function execute(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const tableId = this.getNodeParameter('tableId', index) as string;
	const columns = this.getNodeParameter('columns.columnValues', index, []) as Array<{
			columnName: string;
			columnValue: string;
	}>;
	const qs = {} as IDataObject;
	const requestMethod = 'POST';
	const endpoint = `tables/${tableId}/records`;

	// Transform columns array into object
	const recordData = columns.reduce((obj, item) => {
			obj[item.columnName] = item.columnValue;
			return obj;
	}, {} as Record<string, string>);

	const body = recordData;

	const responseData = await apiRequest.call(this, requestMethod, endpoint, body, qs);

	return this.helpers.returnJsonArray(responseData as IDataObject[]);
}
