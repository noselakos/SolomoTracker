import axios from 'axios';
import { toCamelCase } from './CasingHelper';
import * as qs from 'qs';

export default class Client {
    __resource(url: any) {
        return url;
    }

    get(url: any, data: any, successCB: any, catchCB: any) {
        return this.__perform('get', url, data, successCB, catchCB);
    }

    post(url: any, data: any, successCB: any, catchCB: any) {
        return this.__perform('post', url, data, successCB, catchCB);
    }

    put(url: any, data: any, successCB: any, catchCB: any) {
        return this.__perform('put', url, data, successCB, catchCB);
    }

    delete(url: any, data: any, successCB: any, catchCB: any) {
        return this.__perform('delete', url, data, successCB, catchCB);
    }

    __getCSRFToken(name: any) {
        let cookieValue = null;

        if (document.cookie && document.cookie !== '') {
            let cookies = document.cookie.split(';');

            for (let i = 0; i < cookies.length; i++) {
                let cookie = cookies[i].trim();

                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }

        return cookieValue;
    }

    __perform(method: any, url: any, data: any, successCB: any, catchCB: any) {

        const headers = {
            'Content-Type': 'application/json',
            'X-CSRFToken': this.__getCSRFToken('csrftoken'),
        };

        let params = null;

        if (method.toLowerCase() === 'get' || method.toLowerCase() === 'delete') {
            // If a GET or DELETE request
            // These request types use 'params' not 'data'
            params = {...data};
            Object.freeze(params);
            data = null;
        }

        // You can intercept requests or responses before they are handled by then or catch.
        // https://github.com/axios/axios#interceptors

        // Add a response interceptor and camelCase return data (for JS)
        axios.interceptors.response.use((response: any) => {
            response.data = toCamelCase(response.data);
            return response;
        }, (error) => {
            error.response.data = toCamelCase(error.response.data);
            return Promise.reject(error);
        });

        const response = axios({
            method: method,
            url: this.__resource(url),
            headers: headers,
            params: params,  // GET and DELETE requests have params
            // remove array params bracket
            paramsSerializer: (params) => {
                return qs.stringify(params, {indices: false})
            },
            data: data,      // POST and PUT requests have data
        });

        if (successCB || catchCB) {
            return response.then(successCB).catch(catchCB);
        }

        return response;
    }
}