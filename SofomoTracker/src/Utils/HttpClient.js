"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
var CasingHelper_1 = require("./CasingHelper");
var qs = require("qs");
var Client = /** @class */ (function () {
    function Client() {
    }
    Client.prototype.__resource = function (url) {
        return url;
    };
    Client.prototype.get = function (url, data, successCB, catchCB) {
        return this.__perform('get', url, data, successCB, catchCB);
    };
    Client.prototype.post = function (url, data, successCB, catchCB) {
        return this.__perform('post', url, data, successCB, catchCB);
    };
    Client.prototype.put = function (url, data, successCB, catchCB) {
        return this.__perform('put', url, data, successCB, catchCB);
    };
    Client.prototype.delete = function (url, data, successCB, catchCB) {
        return this.__perform('delete', url, data, successCB, catchCB);
    };
    Client.prototype.__getCSRFToken = function (name) {
        var cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = cookies[i].trim();
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    };
    Client.prototype.__perform = function (method, url, data, successCB, catchCB) {
        var headers = {
            'Content-Type': 'application/json',
            'X-CSRFToken': this.__getCSRFToken('csrftoken'),
        };
        var params = null;
        if (method.toLowerCase() === 'get' || method.toLowerCase() === 'delete') {
            // If a GET or DELETE request
            // These request types use 'params' not 'data'
            params = __assign({}, data);
            Object.freeze(params);
            data = null;
        }
        // You can intercept requests or responses before they are handled by then or catch.
        // https://github.com/axios/axios#interceptors
        // Add a response interceptor and camelCase return data (for JS)
        axios_1.default.interceptors.response.use(function (response) {
            response.data = CasingHelper_1.toCamelCase(response.data);
            return response;
        }, function (error) {
            error.response.data = CasingHelper_1.toCamelCase(error.response.data);
            return Promise.reject(error);
        });
        var response = axios_1.default({
            method: method,
            url: this.__resource(url),
            headers: headers,
            params: params,
            // remove array params bracket
            paramsSerializer: function (params) {
                return qs.stringify(params, { indices: false });
            },
            data: data,
        });
        if (successCB || catchCB) {
            return response.then(successCB).catch(catchCB);
        }
        return response;
    };
    return Client;
}());
exports.default = Client;
//# sourceMappingURL=HttpClient.js.map