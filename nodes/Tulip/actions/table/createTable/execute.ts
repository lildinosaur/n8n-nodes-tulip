import type { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';

import { apiRequest } from '../../../transport';

export async function execute(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const body = {} as IDataObject;
	const qs = {} as IDataObject;
	const requestMethod = 'POST';
	const endpoint = 'tables';

	// Get the main table properties
	body.label = this.getNodeParameter('tableLabel', index) as string;
	body.description = this.getNodeParameter('description', index) as string;

	// Get the columns configuration
	const columnsData = this.getNodeParameter('columns.columnValues', index, []) as Array<{
			columnName: string;
			label: string;
			description: string;
			dataType: string;
			hidden: boolean;
			unique: boolean;
	}>;

	// Format columns data
	body.columns = columnsData.map(column => ({
			name: column.columnName,
			label: column.label,
			description: column.description,
			dataType: {
					type: column.dataType,
			},
			hidden: column.hidden,
			unique: column.unique,
	}));

	const responseData = await apiRequest.call(this, requestMethod, endpoint, body, qs);

	return this.helpers.returnJsonArray(responseData as IDataObject[]);
}
