import type {
	IExecuteFunctions,
	IHookFunctions,
	ILoadOptionsFunctions,
	GenericValue,
	IDataObject,
	IHttpRequestMethods,
	IHttpRequestOptions,
} from 'n8n-workflow';

export async function apiRequest(
	this: IHookFunctions | IExecuteFunctions | ILoadOptionsFunctions,
	method: IHttpRequestMethods,
	endpoint: string,
	body: IDataObject | GenericValue | GenericValue[] = {},
	query: IDataObject = {},
) {
	const credentials = await this.getCredentials('tulipApi');
	const baseUrl = (credentials.factoryUrl as string).replace(/\/$/, '');

	const options: IHttpRequestOptions = {
		method,
		body,
		qs: query,
		url: `${baseUrl}/api/v3/${endpoint}`,
		headers: {
			'content-type': 'application/json; charset=utf-8',
		},
		json: true,
		returnFullResponse: true,
	};

	return await this.helpers.requestWithAuthentication.call(this, 'tulipApi', options);
}
