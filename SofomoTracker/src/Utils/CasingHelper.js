"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
function toCamelCase(object) {
    var camelCaseObject = _.cloneDeep(object);
    if (_.isArray(camelCaseObject)) {
        return _.map(camelCaseObject, toCamelCase);
    }
    else {
        camelCaseObject = _.mapKeys(camelCaseObject, function (value, key) {
            return _.camelCase(key);
        });
        // Recursively apply throughout object
        return _.mapValues(camelCaseObject, function (value) {
            if (_.isPlainObject(value)) {
                return toCamelCase(value);
            }
            else if (_.isArray(value)) {
                return _.map(value, toCamelCase);
            }
            else {
                return value;
            }
        });
    }
}
exports.toCamelCase = toCamelCase;
;
function toSnakeCase(object) {
    var snakeCaseObject = _.cloneDeep(object);
    if (_.isArray(snakeCaseObject)) {
        return _.map(snakeCaseObject, toSnakeCase);
    }
    else {
        snakeCaseObject = _.mapKeys(snakeCaseObject, function (value, key) {
            return _.snakeCase(key);
        });
        // Recursively apply throughout object
        return _.mapValues(snakeCaseObject, function (value) {
            if (_.isPlainObject(value)) {
                return toSnakeCase(value);
            }
            else if (_.isArray(value)) {
                return _.map(value, toSnakeCase);
            }
            else {
                return value;
            }
        });
    }
}
exports.toSnakeCase = toSnakeCase;
;
//# sourceMappingURL=CasingHelper.js.map