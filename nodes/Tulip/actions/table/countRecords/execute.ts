import type { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';

import { apiRequest } from '../../../transport';

export async function execute(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const tableId = this.getNodeParameter('tableId', index) as string;
	const filters = this.getNodeParameter('filters.filterValues', index, []) as Array<{
		columnName: string;
		filterFunction: string;
		columnValue: string;
	}>;
	const body = {} as IDataObject;
	const qs = {} as IDataObject;
	const requestMethod = 'GET';
	const endpoint = `tables/${tableId}/count`;

	qs.filterAggregator = this.getNodeParameter('filterAggregator', index) as string;
	qs.limit = this.getNodeParameter('limit', index) as number;
	qs.offset = this.getNodeParameter('offset', index) as number;

	if (filters.length > 0) {
		const formattedFilters = filters.map(filter => ({
				field: filter.columnName,
				functionType: filter.filterFunction,
				arg: filter.columnValue,
		}));
		qs.filters = JSON.stringify(formattedFilters);
	}

	const responseData = await apiRequest.call(this, requestMethod, endpoint, body, qs);

	return this.helpers.returnJsonArray(responseData as IDataObject[]);
}
