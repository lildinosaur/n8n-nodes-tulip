import type { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';

import { apiRequest } from '../../../transport';

export async function execute(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
    const tableId = this.getNodeParameter('tableId', index) as string;
    const label = this.getNodeParameter('tableLabel', index) as string;
    const description = this.getNodeParameter('description', index) as string;
    const deleted = this.getNodeParameter('deleted', index) as boolean;
    const columns = this.getNodeParameter('columns.columnValues', index, []) as Array<{
        columnName: string;
        label: string;
        description: string;
        dataType: string;
        hidden: boolean;
        unique: boolean;
    }>;

    // Transform columns to match API format
    const formattedColumns = columns.map(column => ({
        name: column.columnName,
        label: column.label,
        description: column.description,
        dataType: {
            type: column.dataType,
        },
        hidden: column.hidden,
        unique: column.unique,
    }));

    const body = {
        label,
        description,
        deleted,
        columns: formattedColumns,
    } as IDataObject;

    const qs = {} as IDataObject;
    const requestMethod = 'PUT';
    const endpoint = `tables/${tableId}`;

    const responseData = await apiRequest.call(this, requestMethod, endpoint, body, qs);

    return this.helpers.returnJsonArray(responseData as IDataObject[]);
}
