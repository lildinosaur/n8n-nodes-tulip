import type { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';

import * as table from './table';
import * as machine from './machine';
import type { Tulip } from './node.type';

export async function router(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
	const items = this.getInputData();
	const operationResult: INodeExecutionData[] = [];
	let responseData: IDataObject | IDataObject[] = [];

	for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
		const resource = this.getNodeParameter<Tulip>('resource', itemIndex);
		let operation = this.getNodeParameter('operation', itemIndex);

		const tulip = {
			resource,
			operation,
		} as Tulip;

		try {
			if (tulip.resource === 'table') {
				responseData = await table[tulip.operation].execute.call(this, itemIndex);
			} else if (tulip.resource === 'machine') {
				responseData = await machine[tulip.operation].execute.call(this, itemIndex);
			}

			const executionData = this.helpers.constructExecutionMetaData(
				this.helpers.returnJsonArray(responseData),
				{ itemData: { item: itemIndex } },
			);
			operationResult.push(...executionData);
		} catch (err) {
			if (this.continueOnFail()) {
				operationResult.push({ json: this.getInputData(itemIndex)[0].json, error: err });
			} else {
				if (err.context) err.context.itemIndex = itemIndex;
				throw err;
			}
		}
	}

	return [operationResult];
}
