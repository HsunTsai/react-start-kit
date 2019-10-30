import webConfig from './base';

const { domain, contextRoot } = webConfig;

export default {
	getContextRoot: contextRoot,
	getLocale: `${contextRoot}data/`,
	getLocaleEN: `${contextRoot}data/en.json`,
	domain: `${domain}`,
	apiTest: `${domain}/api/test`, // Your api url
};
