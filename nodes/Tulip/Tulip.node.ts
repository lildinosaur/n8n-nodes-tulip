import type {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	IRequestOptions,
	IDataObject,
} from 'n8n-workflow';
import { Buffer } from 'buffer';
import { NodeConnectionType, deepCopy, NodeOperationError } from 'n8n-workflow';

import {
	tableDescription,
	tableOperation,
	machineDescription,
	machineOperation,
} from './descriptions';

import { tulipApiRequest } from './GenericFunctions';

export class Tulip implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Tulip',
		name: 'tulip',
		icon: 'file:tulip.svg',
		group: ['transform'],
		version: 1,
		description: 'Consume Tulip API',
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		defaults: {
			name: 'Tulip',
		},
		usableAsTool: true,
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
		credentials: [
			{
					name: 'tulipApi',
					required: true,
					testedBy: 'tulipApiTest',
			},
	],
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				default: 'table',
				noDataExpression: true,
				options: [
					{
						name: 'Table',
						value: 'table',
					},
					{
						name: 'Machine',
						value: 'machine',
					},
				],
			},
			...tableOperation,
			...tableDescription,
			...machineOperation,
			...machineDescription,
		],
	}

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		let items = this.getInputData();

		items = deepCopy(items);
		const returnData: INodeExecutionData[] = [];
		let responseData;

		const qs: IDataObject = {};

		const resource = this.getNodeParameter('resource', 0);
		const operation = this.getNodeParameter('operation', 0);

		const credentials = await this.getCredentials('tulipApi');
		const url = (credentials.factoryUrl as string).replace(/\/$/, '');
		const apikey = credentials.apikey as string;
		const apisecret = credentials.apisecret as string;

		// Create basic auth token
		const auth = Buffer.from(`${apikey}:${apisecret}`).toString('base64');

		let requestOptions: IRequestOptions = {
			uri: '',
		};

		for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
			try {
				if (resource === 'table') {
					//----------------------------------------------------------------------
					//                            Table Operations
					//----------------------------------------------------------------------
					if (operation === 'listTables') {
						const includeDeletedTables = this.getNodeParameter('includeDeletedTables', itemIndex, false) as boolean;

						qs.includeDeleted = includeDeletedTables;

						responseData = await tulipApiRequest.call(this, 'GET', `${url}/api/v3/tables`,{},qs);

						if (responseData !== undefined) {
							if (!Array.isArray(responseData)) {
								throw new NodeOperationError(
									this.getNode(),
									'Expected array response from API',
								);
							}

							const tables = responseData.map(table => ({
								json: table,
							}));

							const executionData = this.helpers.constructExecutionMetaData(
								tables,
								{ itemData: { item: itemIndex } },
							);
							returnData.push(...executionData);
						}else{
							throw new NodeOperationError(
								this.getNode(),
								'Reponse from API is undefined',
							);
						}
					}

					if (operation === 'lookupTable') {
						const tableId = this.getNodeParameter('tableId', itemIndex) as string;

						requestOptions = {
							headers: {
								Authorization: `Basic ${auth}`,
								'Content-Type': 'application/json',
							},
							method: 'GET',
							uri: `${url}/api/v3/tables/${tableId}`,
							json: true,
						};

						responseData = await this.helpers.request(requestOptions);

						const executionData = this.helpers.constructExecutionMetaData(
							this.helpers.returnJsonArray(responseData),
							{ itemData: { item: itemIndex } },
						);
						returnData.push(...executionData);
					}

					if (operation === 'updateTable') {
						const tableId = this.getNodeParameter('tableId', itemIndex) as string;
						const updateData = this.getNodeParameter('updateFields', itemIndex) as object;

						requestOptions = {
								headers: {
										Authorization: `Basic ${auth}`,
										'Content-Type': 'application/json',
								},
								method: 'PUT',
								uri: `${url}/api/v3/tables/${tableId}`,
								body: updateData,
								json: true,
						};

						responseData = await this.helpers.request(requestOptions);
						const executionData = this.helpers.constructExecutionMetaData(
								this.helpers.returnJsonArray(responseData),
								{ itemData: { item: itemIndex } },
						);
						returnData.push(...executionData);
					}

					if (operation === 'deleteTable') {
						const tableId = this.getNodeParameter('tableId', itemIndex) as string;

						requestOptions = {
								headers: {
										Authorization: `Basic ${auth}`,
										'Content-Type': 'application/json',
								},
								method: 'DELETE',
								uri: `${url}/api/v3/tables/${tableId}`,
								json: true,
						};

						responseData = await this.helpers.request(requestOptions);
						const executionData = this.helpers.constructExecutionMetaData(
								this.helpers.returnJsonArray(responseData),
								{ itemData: { item: itemIndex } },
						);
						returnData.push(...executionData);
					}

					//----------------------------------------------------------------------
					//                            All Records Operations
					//----------------------------------------------------------------------
					if (operation === 'listRecords') {
						const tableId = this.getNodeParameter('tableId', itemIndex) as string;

						requestOptions = {
							headers: {
								Authorization: `Basic ${auth}`,
								'Content-Type': 'application/json',
							},
							method: 'GET',
							uri: `${url}/api/v3/tables/${tableId}/records`,
							json: true,
						};

						responseData = await this.helpers.request(requestOptions);

						const executionData = this.helpers.constructExecutionMetaData(
							this.helpers.returnJsonArray(responseData),
							{ itemData: { item: itemIndex } },
						);
						returnData.push(...executionData);
					}

					if (operation === 'createRecord') {
						const tableId = this.getNodeParameter('tableId', itemIndex) as string;
						const columns = this.getNodeParameter('columns.columnValues', itemIndex, []) as Array<{
								columnName: string;
								columnValue: string;
						}>;

						// Transform columns array into object
						const recordData = columns.reduce((obj, item) => {
								obj[item.columnName] = item.columnValue;
								return obj;
						}, {} as Record<string, string>);

						requestOptions = {
								headers: {
										Authorization: `Basic ${auth}`,
										'Content-Type': 'application/json',
								},
								method: 'POST',
								uri: `${url}/api/v3/tables/${tableId}/records`,
								body: recordData,
								json: true,
						};

						responseData = await this.helpers.request(requestOptions);

						const executionData = this.helpers.constructExecutionMetaData(
								this.helpers.returnJsonArray(responseData),
								{ itemData: { item: itemIndex } },
						);
						returnData.push(...executionData);
					}

					if (operation === 'deleteAllRecords') {
						const tableId = this.getNodeParameter('tableId', itemIndex) as string;

						requestOptions = {
								headers: {
										Authorization: `Basic ${auth}`,
										'Content-Type': 'application/json',
								},
								method: 'DELETE',
								uri: `${url}/api/v3/tables/${tableId}/records/`,
								json: true,
						};

						responseData = await this.helpers.request(requestOptions);
						const executionData = this.helpers.constructExecutionMetaData(
								this.helpers.returnJsonArray(responseData),
								{ itemData: { item: itemIndex } },
						);
						returnData.push(...executionData);
					}

					if (operation === 'countRecords') {
						const tableId = this.getNodeParameter('tableId', itemIndex) as string;

						requestOptions = {
								headers: {
										Authorization: `Basic ${auth}`,
										'Content-Type': 'application/json',
								},
								method: 'GET',
								uri: `${url}/api/v3/tables/${tableId}/records/count`,
								json: true,
						};

						responseData = await this.helpers.request(requestOptions);
						const executionData = this.helpers.constructExecutionMetaData(
								this.helpers.returnJsonArray(responseData),
								{ itemData: { item: itemIndex } },
						);
						returnData.push(...executionData);
					}

					//----------------------------------------------------------------------
					//                            Specific Record Operations
					//----------------------------------------------------------------------
					if (operation === 'lookupRecord') {
						const tableId = this.getNodeParameter('tableId', itemIndex) as string;
						const recordId = this.getNodeParameter('recordId', itemIndex) as string;

						requestOptions = {
								headers: {
										Authorization: `Basic ${auth}`,
										'Content-Type': 'application/json',
								},
								method: 'GET',
								uri: `${url}/api/v3/tables/${tableId}/records/${recordId}`,
								json: true,
						};

						responseData = await this.helpers.request(requestOptions);
						const executionData = this.helpers.constructExecutionMetaData(
								this.helpers.returnJsonArray(responseData),
								{ itemData: { item: itemIndex } },
						);
						returnData.push(...executionData);
					}

					if (operation === 'updateRecord') {
						const tableId = this.getNodeParameter('tableId', itemIndex) as string;
						const recordId = this.getNodeParameter('recordId', itemIndex) as string;
						const updateData = this.getNodeParameter('updateFields', itemIndex) as object;

						requestOptions = {
								headers: {
										Authorization: `Basic ${auth}`,
										'Content-Type': 'application/json',
								},
								method: 'PUT',
								uri: `${url}/api/v3/tables/${tableId}/records/${recordId}`,
								body: updateData,
								json: true,
						};

						responseData = await this.helpers.request(requestOptions);
						const executionData = this.helpers.constructExecutionMetaData(
								this.helpers.returnJsonArray(responseData),
								{ itemData: { item: itemIndex } },
						);
						returnData.push(...executionData);
					}

					if (operation === 'deleteRecord') {
						const tableId = this.getNodeParameter('tableId', itemIndex) as string;
						const recordId = this.getNodeParameter('recordId', itemIndex) as string;

						requestOptions = {
								headers: {
										Authorization: `Basic ${auth}`,
										'Content-Type': 'application/json',
								},
								method: 'DELETE',
								uri: `${url}/api/v3/tables/${tableId}/records/${recordId}`,
								json: true,
						};

						responseData = await this.helpers.request(requestOptions);
						const executionData = this.helpers.constructExecutionMetaData(
								this.helpers.returnJsonArray(responseData),
								{ itemData: { item: itemIndex } },
						);
						returnData.push(...executionData);
					}

					if (operation === 'incrementDecrementRecord') {
						const tableId = this.getNodeParameter('tableId', itemIndex) as string;
						const recordId = this.getNodeParameter('recordId', itemIndex) as string;

						requestOptions = {
								headers: {
										Authorization: `Basic ${auth}`,
										'Content-Type': 'application/json',
								},
								method: 'DELETE',
								uri: `${url}/api/v3/tables/${tableId}/records/${recordId}`,
								json: true,
						};

						responseData = await this.helpers.request(requestOptions);
						const executionData = this.helpers.constructExecutionMetaData(
								this.helpers.returnJsonArray(responseData),
								{ itemData: { item: itemIndex } },
						);
						returnData.push(...executionData);
					}
				}

				if (resource === 'machine') {
					//----------------------------------------------------------------------
					//                            Machines Operations
					//----------------------------------------------------------------------
					if (operation === 'setMachineAttributeValue') {
						const machineId = this.getNodeParameter('machineId', itemIndex) as string;
						const attributeId = this.getNodeParameter('attributeId', itemIndex) as string;
						const value = this.getNodeParameter('value', itemIndex) as string;

						requestOptions = {
							headers: {
								Authorization: `Basic ${auth}`,
								'Content-Type': 'application/json',
							},
							method: 'POST',
							uri: `${url}/api/v3/attributes/report`,
							body: {
								attributes: [
										{
												machineId,
												attributeId,
												value,
										}
								]
							},
							json: true,
						};

						responseData = await this.helpers.request(requestOptions);

						const executionData = this.helpers.constructExecutionMetaData(
							this.helpers.returnJsonArray(responseData),
							{ itemData: { item: itemIndex } },
						);
						returnData.push(...executionData);
					}

					if (operation === 'listMachines') {
						requestOptions = {
							headers: {
								Authorization: `Basic ${auth}`,
								'Content-Type': 'application/json',
							},
							method: 'GET',
							uri: `${url}/api/v3/machines`,
							json: true,
						};

						responseData = await this.helpers.request(requestOptions);

						const executionData = this.helpers.constructExecutionMetaData(
							this.helpers.returnJsonArray(responseData),
							{ itemData: { item: itemIndex } },
						);
						returnData.push(...executionData);
					}

					if (operation === 'setMachineAttributeValue') {
						const machineId = this.getNodeParameter('machineId', itemIndex) as string;
						const attributeId = this.getNodeParameter('attributeId', itemIndex) as string;
						const value = this.getNodeParameter('value', itemIndex) as string;

						requestOptions = {
								headers: {
										Authorization: `Basic ${auth}`,
										'Content-Type': 'application/json',
								},
								method: 'POST',
								uri: `${url}/api/v3/attributes/report`,
								body: {
										attributes: [
												{
														machineId,
														attributeId,
														value,
												}
										]
								},
								json: true,
						};

						responseData = await this.helpers.request(requestOptions);

						const executionData = this.helpers.constructExecutionMetaData(
								this.helpers.returnJsonArray(responseData),
								{ itemData: { item: itemIndex } },
						);
						returnData.push(...executionData);
					}
				}
			} catch (error) {
				if (this.continueOnFail()) {
					const executionData = this.helpers.constructExecutionMetaData(
						this.helpers.returnJsonArray({ error: error.message }),
						{ itemData: { item: itemIndex } },
					);
					returnData.push(...executionData);

					continue;
				}
				throw error;
			}
		}

		return [returnData];
	}
}
