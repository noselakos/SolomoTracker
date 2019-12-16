import withStyles from '@material-ui/core/styles/withStyles';
import { TableCell, Paper, TextField, CircularProgress, Button } from '@material-ui/core';

export const StyledTableCell = withStyles({
    root: {
        fontSize: '12px',
        textAlign: 'right',
        fontWeight: 'lighter'
    },
    head: {
        fontWeight: 'normal'
    }
})(TableCell);

export const StyledButton = withStyles({
    root: {
        fontSize: '15px',
        width: '100%',
        textTransform: 'inherit',
        fontWeight: 'lighter',
    },
})(Button);

export const StyledTextField = withStyles({
    root: {
        minWidth: '100%',
        paddingBottom: '20px'
    },
})(TextField);

export const StyledPaper = withStyles({
    root: {
        padding: '10px'
    }
})(Paper);

export const StyledCircularProgress = withStyles({
    root: {
        margin: 'auto',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    }
})(CircularProgress);