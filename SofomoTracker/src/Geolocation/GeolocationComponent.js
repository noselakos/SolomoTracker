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
var ReactDOM = require("react-dom");
var Table_1 = require("@material-ui/core/Table");
var TableBody_1 = require("@material-ui/core/TableBody");
var TableHead_1 = require("@material-ui/core/TableHead");
var TableRow_1 = require("@material-ui/core/TableRow");
var IconButton_1 = require("@material-ui/core/IconButton");
var Delete_1 = require("@material-ui/icons/Delete");
var core_1 = require("@material-ui/core");
var react_toastify_1 = require("react-toastify");
require("react-toastify/dist/ReactToastify.css");
var HttpClient_1 = require("../Utils/HttpClient");
var StyledComponents_1 = require("./StyledComponents");
var Overlay_1 = require("./Overlay");
var GeolocationComponent = /** @class */ (function (_super) {
    __extends(GeolocationComponent, _super);
    function GeolocationComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.httpClient = new HttpClient_1.default();
        _this.state = {
            geolocationData: [],
            geolocationSearchInput: '',
            isProcessing: false
        };
        _this.handleSearchGeolocationInputChange = _this.handleSearchGeolocationInputChange.bind(_this);
        _this.handleGetGeolocationClick = _this.handleGetGeolocationClick.bind(_this);
        _this.handleDeleteGeolocationClick = _this.handleDeleteGeolocationClick.bind(_this);
        return _this;
    }
    GeolocationComponent.prototype.getGeolocationData = function () {
        var _this = this;
        this.setState({ isProcessing: true });
        var url = "api/geolocation/GetGeolocationData";
        this.httpClient.get(url, {}, function (response) {
            _this.setState({
                geolocationData: response.data,
                isProcessing: false
            });
        }, function (error) {
            react_toastify_1.toast.error(error.response.data.message);
            _this.setState({ isProcessing: false });
        });
    };
    GeolocationComponent.prototype.handleSearchGeolocationInputChange = function (e) {
        this.setState({ geolocationSearchInput: e.target.value });
    };
    GeolocationComponent.prototype.handleGetGeolocationClick = function () {
        var _this = this;
        if (this.state.geolocationSearchInput === null || this.state.geolocationSearchInput === '') {
            return;
        }
        this.setState({
            isProcessing: true,
            geolocationSearchInput: ''
        });
        var url = "api/geolocation/InsertGeolocationFromApi";
        this.httpClient.post(url, { ipUrlQuery: this.state.geolocationSearchInput }, function (response) {
            _this.setState({
                geolocationData: [response.data].concat(_this.state.geolocationData),
                isProcessing: false
            });
        }, function (error) {
            react_toastify_1.toast.error(error.response.data.message);
            _this.setState({ isProcessing: false });
        });
    };
    GeolocationComponent.prototype.handleDeleteGeolocationClick = function (geolocationId) {
        var _this = this;
        this.setState({ isProcessing: true });
        var url = "api/geolocation/DeleteGeolocation";
        this.httpClient.post(url, { geolocationId: geolocationId }, function (response) {
            _this.setState({
                geolocationData: _this.state.geolocationData.filter(function (item) { return item.geolocationId !== geolocationId; }),
                isProcessing: false
            });
        }, function (error) {
            react_toastify_1.toast.error(error.response.data.message);
            _this.setState({ isProcessing: false });
        });
    };
    GeolocationComponent.prototype.componentDidMount = function () {
        this.getGeolocationData();
    };
    GeolocationComponent.prototype.render = function () {
        var _this = this;
        var headCells = [
            { id: 'IP', numeric: false, disablePadding: true, label: 'IP' },
            { id: 'Type', numeric: false, disablePadding: false, label: 'Type' },
            { id: 'ContinentCode', numeric: false, disablePadding: false, label: 'Continent Code' },
            { id: 'ContinentName', numeric: false, disablePadding: false, label: 'Continent Name' },
            { id: 'CountryCode', numeric: false, disablePadding: false, label: 'Country Code' },
            { id: 'CountryName', numeric: false, disablePadding: false, label: 'Country Name' },
            { id: 'RegionCode', numeric: false, disablePadding: false, label: 'Region Code' },
            { id: 'RegionName', numeric: false, disablePadding: false, label: 'Region Name' },
            { id: 'City', numeric: false, disablePadding: false, label: 'City' },
            { id: 'Zip', numeric: false, disablePadding: false, label: 'Zip' },
            { id: 'Latitude', numeric: true, disablePadding: false, label: 'Latitude' },
            { id: 'Longitude', numeric: true, disablePadding: false, label: 'Longitude' },
        ];
        var paperContainerStyle = {
            paddingBottom: 30
        };
        var logoImageStyle = {
            display: 'block',
            marginLeft: 'auto',
            marginRight: 'auto',
            width: '50%',
            marginBottom: '25px'
        };
        return (React.createElement("div", { style: { position: 'relative' } },
            React.createElement(Overlay_1.default, { isActive: this.state.isProcessing }),
            React.createElement("div", { style: paperContainerStyle },
                React.createElement(StyledComponents_1.StyledPaper, null,
                    React.createElement(core_1.Grid, { container: true },
                        React.createElement(core_1.Grid, { item: true, sm: 12, spacing: 3 },
                            React.createElement(core_1.Icon, null,
                                React.createElement("img", { src: "/Content/logo.svg", style: logoImageStyle }))),
                        React.createElement(core_1.Grid, { item: true, sm: 4, spacing: 3 }),
                        React.createElement(core_1.Grid, { item: true, sm: 4, spacing: 3 },
                            React.createElement(StyledComponents_1.StyledTextField, { label: "Enter IP or URL", variant: "standard", fullWidth: true, inputProps: {
                                    style: { fontSize: 15 }
                                }, InputLabelProps: {
                                    style: { fontSize: 15 }
                                }, value: this.state.geolocationSearchInput, onChange: this.handleSearchGeolocationInputChange })),
                        React.createElement(core_1.Grid, { item: true, sm: 4, spacing: 3 }),
                        React.createElement(core_1.Grid, { item: true, sm: 4, spacing: 3 }),
                        React.createElement(core_1.Grid, { item: true, sm: 4, spacing: 3 },
                            React.createElement(StyledComponents_1.StyledButton, { size: "large", variant: "contained", color: "primary", onClick: this.handleGetGeolocationClick }, "Get Geolocation!")),
                        React.createElement(core_1.Grid, { item: true, sm: 4, spacing: 10 })))),
            React.createElement("div", { style: paperContainerStyle },
                React.createElement(StyledComponents_1.StyledPaper, null,
                    React.createElement(Table_1.default, null,
                        React.createElement(TableHead_1.default, null,
                            React.createElement(TableRow_1.default, null,
                                React.createElement(StyledComponents_1.StyledTableCell, null),
                                headCells.map(function (headCell) { return (React.createElement(StyledComponents_1.StyledTableCell, { key: headCell.id, align: headCell.numeric ? 'right' : 'left', padding: headCell.disablePadding ? 'none' : 'default' }, headCell.label)); }))),
                        React.createElement(TableBody_1.default, null, this.state.geolocationData
                            .map(function (row) {
                            var labelId = "enhanced-table-checkbox-" + row.geolocationId;
                            return (React.createElement(TableRow_1.default, { hover: true, tabIndex: -1, key: row.name },
                                React.createElement(StyledComponents_1.StyledTableCell, null,
                                    React.createElement(IconButton_1.default, { "aria-label": "delete", onClick: function () { _this.handleDeleteGeolocationClick(row.geolocationId); } },
                                        React.createElement(Delete_1.default, null))),
                                React.createElement(StyledComponents_1.StyledTableCell, { component: "th", id: labelId, scope: "row", padding: "none" }, row.ip),
                                React.createElement(StyledComponents_1.StyledTableCell, null, row.type),
                                React.createElement(StyledComponents_1.StyledTableCell, null, row.continentCode),
                                React.createElement(StyledComponents_1.StyledTableCell, null, row.continentName),
                                React.createElement(StyledComponents_1.StyledTableCell, null, row.countryCode),
                                React.createElement(StyledComponents_1.StyledTableCell, null, row.countryName),
                                React.createElement(StyledComponents_1.StyledTableCell, null, row.regionCode),
                                React.createElement(StyledComponents_1.StyledTableCell, null, row.regionName),
                                React.createElement(StyledComponents_1.StyledTableCell, null, row.city),
                                React.createElement(StyledComponents_1.StyledTableCell, null, row.zip),
                                React.createElement(StyledComponents_1.StyledTableCell, null, row.latitude.toFixed(5)),
                                React.createElement(StyledComponents_1.StyledTableCell, null, row.longitude.toFixed(5))));
                        }))))),
            React.createElement(react_toastify_1.ToastContainer, null)));
    };
    return GeolocationComponent;
}(React.Component));
ReactDOM.render(React.createElement(GeolocationComponent, null), document.getElementById('react-body'));
//# sourceMappingURL=GeolocationComponent.js.map