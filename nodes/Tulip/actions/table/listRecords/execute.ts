import type { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';

import { apiRequest } from '../../../transport';

export async function execute(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const tableId = this.getNodeParameter('tableId', index) as string;
	const body = {} as IDataObject;
	const qs = {} as IDataObject;
	const requestMethod = 'GET';
	const endpoint = `tables/${tableId}/records`;

	qs.limit = this.getNodeParameter('limit', index) as number;
	qs.offset = this.getNodeParameter('offset', index) as number;
	qs.includeTotalCount = this.getNodeParameter('includeTotalCount', index) as boolean;
	qs.filterAggregator = this.getNodeParameter('filterAggregator', index) as string;

	// url query strings value example :
	// ?limit=10
	// &offset=0
	// &includeTotalCount=true
	// &filters=%5B%7B%22field%22%3A%22string%22%2C%22functionType%22%3A%22equal%22%2C%22arg%22%3A%22string%22%7D%5D
	// &filterAggregator=all
	// &sortOptions=%5B%7B%22sortBy%22%3A%22Color%22%2C%22sortDir%22%3A%22asc%22%7D%5D' \

	const responseData = await apiRequest.call(this, requestMethod, endpoint, body, qs);

	return this.helpers.returnJsonArray(responseData as IDataObject[]);
}
