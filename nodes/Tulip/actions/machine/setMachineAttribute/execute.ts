import type { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';

import { apiRequest } from '../../../transport';

export async function execute(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const machineId = this.getNodeParameter('machineId', index) as string;
	const attributeId = this.getNodeParameter('attributeId', index) as string;
	const value = this.getNodeParameter('value', index) as string;
	const qs = {} as IDataObject;
	const requestMethod = 'POST';
	const endpoint = 'attributes/report';
	const body = {
		attributes: [
				{
						machineId,
						attributeId,
						value,
				}
		]
	} as IDataObject;

	const responseData = await apiRequest.call(this, requestMethod, endpoint, body, qs);

	return this.helpers.returnJsonArray(responseData as IDataObject[]);
}
