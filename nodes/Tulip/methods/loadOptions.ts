import type { ILoadOptionsFunctions, INodePropertyOptions } from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';

import { apiRequest } from '../transport';

export async function getTables(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
	const endpoint = 'tables';
	const responseData = await apiRequest.call(this, 'GET', endpoint, {});
	const returnData: INodePropertyOptions[] = [];

	if (responseData === undefined) {
		throw new NodeOperationError(this.getNode(), 'No data got returned');
	}

	for (const data of responseData) {

		returnData.push({
			name: data.label as string,
			value: data.id as string,
		});
	}

	returnData.sort((a, b) => {
		if (a.name < b.name) {
			return -1;
		}
		if (a.name > b.name) {
			return 1;
		}
		return 0;
	});

	return returnData;
}

export async function getColumns(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
	const tableId = this.getCurrentNodeParameter('tableId');
	const endpoint = `tables/${tableId}`;
	const responseData = await apiRequest.call(this, 'GET', endpoint, {});
	const returnData: INodePropertyOptions[] = [];

	if (responseData === undefined) {
		throw new NodeOperationError(this.getNode(), 'No data got returned');
	}

	if (responseData.columns && Array.isArray(responseData.columns)) {
		for (const column of responseData.columns) {
				returnData.push({
						name: column.label as string,
						value: column.name as string,
				});
		}
	}

	returnData.sort((a, b) => {
		if (a.name < b.name) {
			return -1;
		}
		if (a.name > b.name) {
			return 1;
		}
		return 0;
	});

	return returnData;
}

export async function getRecordsIDs(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
	const tableId = this.getCurrentNodeParameter('tableId');
	const endpoint = `tables/${tableId}/records`;
	const responseData = await apiRequest.call(this, 'GET', endpoint, {});
	const returnData: INodePropertyOptions[] = [];

	if (responseData === undefined) {
		throw new NodeOperationError(this.getNode(), 'No data got returned');
	}

	for (const data of responseData) {

		returnData.push({
			name: data.id as string,
			value: data.id as string,
		});
	}

	returnData.sort((a, b) => {
		if (a.name < b.name) {
			return -1;
		}
		if (a.name > b.name) {
			return 1;
		}
		return 0;
	});

	return returnData;
}

export async function getMachines(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
	const endpoint = 'machines';
	const responseData = await apiRequest.call(this, 'GET', endpoint, {});
	const returnData: INodePropertyOptions[] = [];

	if (responseData === undefined) {
			throw new NodeOperationError(this.getNode(), 'No data got returned');
	}

	for (const group of responseData) {
			if (group.machines && Array.isArray(group.machines)) {
					for (const machine of group.machines) {
							returnData.push({
									name: machine.name as string,
									value: machine.id as string,
							});
					}
			}
	}

	returnData.sort((a, b) => {
			if (a.name < b.name) {
					return -1;
			}
			if (a.name > b.name) {
					return 1;
			}
			return 0;
	});

	return returnData;
}
