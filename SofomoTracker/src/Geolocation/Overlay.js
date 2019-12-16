"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var StyledComponents_1 = require("./StyledComponents");
var Overlay = /** @class */ (function (_super) {
    __extends(Overlay, _super);
    function Overlay(props) {
        return _super.call(this, props) || this;
    }
    Overlay.prototype.render = function () {
        if (!this.props.isActive) {
            return null;
        }
        return (React.createElement("div", { style: { position: 'absolute', width: '100%', height: '100%', display: 'block', zIndex: 999, backgroundColor: 'rgba(235,235,235,0.6)' } },
            React.createElement(StyledComponents_1.StyledCircularProgress, null)));
    };
    return Overlay;
}(React.Component));
exports.default = Overlay;
//# sourceMappingURL=Overlay.js.map