import axios from 'axios';

class Services {
  axios: any;
  interceptors: null;

  constructor() {
    this.axios = axios;
    this.interceptors = null;
    this.axios.defaults.withCredentials = true;
  }

  attachTokenToHeader(token: string) {
    this.interceptors = this.axios.interceptors.request.use(
      function (config: any) {
        // Do something before request is sent
        config.headers.sessionId = token;
        return config;
      },
      function (error: any) {
        return Promise.reject(error);
      },
    );
  }

  removeInterceptors() {
    this.axios.interceptors.request.eject(this.interceptors);
  }

  get(...arg: any) {
    return this.axios.get(...arg);
  }

  post(...arg: any) {
    return this.axios.post(...arg);
  }

  delete(...arg: any) {
    return this.axios.delete(...arg);
  }

  put(...arg: any) {
    return this.axios.put(...arg);
  }
}

export default new Services();
