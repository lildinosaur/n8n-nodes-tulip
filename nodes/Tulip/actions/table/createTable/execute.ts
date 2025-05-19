import type { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';

import { apiRequest } from '../../../transport';

export async function execute(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const body = {} as IDataObject;
	const qs = {} as IDataObject;
	const requestMethod = 'POST';
	const endpoint = 'tables';

	const responseData = await apiRequest.call(this, requestMethod, endpoint, body, qs);

	return this.helpers.returnJsonArray(responseData as IDataObject[]);
}
