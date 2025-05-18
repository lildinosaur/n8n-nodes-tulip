import type { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';

import { apiRequest } from '../../../transport';

export async function execute(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const tableId = this.getNodeParameter('tableId', index) as string;
	const recordId = this.getNodeParameter('recordId', index) as string;
	const fieldName = this.getNodeParameter('fieldId', index) as string;
	const value = this.getNodeParameter('value', index) as number;
	const body = {
		fieldName: fieldName,
		value: value,
	} as IDataObject;
	const qs = {} as IDataObject;
	const requestMethod = 'PATCH';
	const endpoint = `tables/${tableId}/records/${recordId}/increment`;

	const responseData = await apiRequest.call(this, requestMethod, endpoint, body, qs);

	return this.helpers.returnJsonArray(responseData as IDataObject[]);
}
