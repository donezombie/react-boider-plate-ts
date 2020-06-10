import axios from 'axios';

class Services {
  axios: any;
  interceptors: null;

	constructor() {
		this.axios = axios;
		this.interceptors = null;
		this.axios.defaults.withCredentials = true;
  }

  get(...arg: any[]) {
		return this.axios.get(...arg);
	}

	post(...arg: any[]) {
		return this.axios.post(...arg);
	}

	delete(...arg: any[]) {
		return this.axios.delete(...arg);
	}
}

export default new Services();
