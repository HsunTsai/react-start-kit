import webConfig from './base';

const { domain, contextRoot } = webConfig;

export default {
	getContextRoot: contextRoot,
	getLocale: `${contextRoot}locales`,
	domain: `${domain}`,
	apiTest: `${domain}/api/test`, // Your api url
};
