"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var withStyles_1 = require("@material-ui/core/styles/withStyles");
var TableCell_1 = require("@material-ui/core/TableCell");
var Paper_1 = require("@material-ui/core/Paper");
var TextField_1 = require("@material-ui/core/TextField");
var CircularProgress_1 = require("@material-ui/core/CircularProgress");
var Button_1 = require("@material-ui/core/Button");
exports.StyledTableCell = withStyles_1.default({
    root: {
        fontSize: '12px',
        textAlign: 'right',
        fontWeight: 'lighter'
    },
    head: {
        fontWeight: 'normal'
    }
})(TableCell_1.default);
exports.StyledButton = withStyles_1.default({
    root: {
        fontSize: '15px',
        width: '100%',
        textTransform: 'inherit',
        fontWeight: 'lighter',
    },
})(Button_1.default);
exports.StyledTextField = withStyles_1.default({
    root: {
        minWidth: '100%',
        paddingBottom: '20px'
    },
})(TextField_1.default);
exports.StyledPaper = withStyles_1.default({
    root: {
        padding: '10px'
    }
})(Paper_1.default);
exports.StyledCircularProgress = withStyles_1.default({
    root: {
        margin: 'auto',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    }
})(CircularProgress_1.default);
//# sourceMappingURL=StyledComponents.js.map