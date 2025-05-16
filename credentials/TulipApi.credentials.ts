import type {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class TulipApi implements ICredentialType {
	name = 'tulipApi';
	displayName = 'Tulip API';
	documentationUrl = 'https://support.tulip.co/docs/setting-up-a-tulip-api';

	properties: INodeProperties[] = [
		{
			displayName: 'Factory URL',
			name: 'factoryUrl',
			type: 'string',
			default: '',
			placeholder: 'https://your-factory-instance.tulip.co',
			required: true,
		},
		{
			displayName: 'API key',
			name: 'apikey',
			// eslint-disable-next-line n8n-nodes-base/cred-class-field-type-options-password-missing
			type: 'string',
			default: '',
			placeholder: 'apikey.2_',
			required: true,
		},
		{
			displayName: 'API secret',
			name: 'apisecret',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			required: true,
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			auth: {
				username: '={{ $credentials.apikey }}',
				password: '={{ $credentials.apisecret }}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{ $credentials.factoryUrl }}',
			url: '/api/v3/machines',
			method: 'GET',
		},
	};
}
