import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { styled, Box } from '@mui/system';
import Modal from '@mui/base/Modal';

export default function KeepMountedModal({ message, openn, color }) {
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
        setOpen(openn);
    }, [openn]);

    const handleClose = () => setOpen(false);

    return (
        <StyledModal
            aria-labelledby="keep-mounted-modal-title"
            aria-describedby="keep-mounted-modal-description"
            open={open}
            onClose={handleClose}
            slots={{ backdrop: StyledBackdrop }}
            keepMounted
        >
            <Box sx={style} style={{ color }}>
                <h4 id="keep-mounted-modal-title">{message}</h4>
            </Box>
        </StyledModal>
    );
}

const Backdrop = React.forwardRef((props, ref) => {
    const { open, className, ...other } = props;
    return <div className={clsx({ 'MuiBackdrop-open': open }, className)} ref={ref} {...other} />;
});

Backdrop.propTypes = {
    className: PropTypes.string.isRequired,
    open: PropTypes.bool
};

const StyledModal = styled(Modal)(`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  &.MuiModal-hidden {
    visibility: hidden;
  }
`);

const StyledBackdrop = styled(Backdrop)`
    z-index: -1;
    position: fixed;
    right: 0;
    bottom: 0;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    -webkit-tap-highlight-color: transparent;
`;

const style = (theme) => ({
    width: 400,
    bgcolor: theme.palette.mode === 'dark' ? '#0A1929' : 'white',

    border: '2px solid currentColor',
    borderRadius: '16px',
    padding: '16px 32px 24px 32px'
});

KeepMountedModal.propTypes = {
    message: PropTypes.string.isRequired,
    openn: PropTypes.bool.isRequired
};
