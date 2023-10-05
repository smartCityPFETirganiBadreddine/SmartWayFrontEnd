import { Box, makeStyles, styled } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    radioGroup: {
        display: 'flex',
        flexDirection: 'row'
    },
    cancelButton: {
        marginRight: theme.spacing(2),
        color: theme.palette.error.main,
        borderColor: theme.palette.error.main,
        '&:hover': {
            backgroundColor: theme.palette.error.main,
            color: '#fff'
        }
    },
    saveButton: {
        backgroundColor: theme.palette.primary.main,
        color: '#fff',
        '&:hover': {
            backgroundColor: theme.palette.success.dark
        }
    },
    gridContainer: {
        textAlign: 'right',
        marginRight: theme.spacing(2)
    }
}));
//height90% width70%
const StyleModal = styled(Box)(({ width = '70%', height = '90%' }) => ({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: width,
    height: height,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    borderRadius: '15px',
    padding: '2%',
    overflowY: 'scroll',
    backgroundColor: 'white' // Add this line to change the background color of the Box component
}));

const styleModalx = {
    backdropFilter: 'blur(5px)' // Add this line to make the background blurry
};

export { StyleModal, styleModalx, useStyles };
