import type { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';

import { apiRequest } from '../../../transport';

export async function execute(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const tableId = this.getNodeParameter('tableId', index) as string;
	const filters = this.getNodeParameter('filters.filterValues', index, []) as Array<{
		columnName: string;
		filterFunction: string;
		columnValue: string;
	}>;
	const sortOptions = this.getNodeParameter('sortOptions.sortValues', index, []) as Array<{
		columnName: string;
		sortOrder: string;
	}>;
	const body = {} as IDataObject;
	const qs = {} as IDataObject;
	const requestMethod = 'GET';
	const resolveWithFullResponse = true;
	const endpoint = `tables/${tableId}/records`;

	qs.limit = this.getNodeParameter('limit', index) as number;
	qs.offset = this.getNodeParameter('offset', index) as number;
	qs.includeTotalCount = this.getNodeParameter('includeTotalCount', index) as boolean;
	qs.filterAggregator = this.getNodeParameter('filterAggregator', index) as string;

	if (filters.length > 0) {
		const formattedFilters = filters.map(filter => ({
				field: filter.columnName,
				functionType: filter.filterFunction,
				arg: filter.columnValue,
		}));
		qs.filters = JSON.stringify(formattedFilters);
	}

	if (sortOptions.length > 0) {
		const formattedSortOptions = sortOptions.map(filter => ({
				sortBy: filter.columnName,
				sortDir: filter.sortOrder,
		}));
		qs.sortOptions = JSON.stringify(formattedSortOptions);
	}

	//Get the full response because we need to get the 'X-Total-Count' header value if we passed includeTotalCount=true in the query string
	const responseData = await apiRequest.call(this, requestMethod, endpoint, body, qs, resolveWithFullResponse);

	// Get the total count from headers
	const totalCount = responseData.headers['x-total-count'];

	// Add totalCount to each record if headers contain the count
	const records = (responseData.body as IDataObject[]).map(record => ({
			...record,
			total_count: totalCount ? parseInt(totalCount as string, 10) : undefined,
	}));

	return this.helpers.returnJsonArray(records as IDataObject[]);
}
