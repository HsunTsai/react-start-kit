
//process.env.NODE_ENV pass by webpack
let domain;
if (process.env.NODE_ENV === 'production') {
	//deploy後使用的domain
	domain = 'http://your_domain_name:8081';
}else{
	//localhost使用的domain
	domain = 'http://localhost:8081';
}

//Create  setLocale	
//Read    getLocale
//Update  updateLocale
//Delete  deleteLocale
export default {
	getLocale : 'data/',
	someService:  `${domain}`
};