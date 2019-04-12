
import webConfig from './base';
const { domain, contextRoot } = webConfig;

//Create  setLocale	
//Read    getLocale
//Update  updateLocale
//Delete  deleteLocale
export default {
	getContextRoot: contextRoot,
	getLocale: contextRoot + 'data/',
	getLocaleEN: contextRoot + 'data/' + 'en.json',
	domain: `${domain}`,
	apiTest: domain + '/api/test' //Your api url
};