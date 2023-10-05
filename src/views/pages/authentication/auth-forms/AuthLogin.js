import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { color, styled } from '@mui/system';
import {
    Modal,
    Box,
    Button,
    Checkbox,
    Divider,
    FormControl,
    FormControlLabel,
    FormHelperText,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Stack,
    Typography,
    useMediaQuery
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import * as Yup from 'yup';
import { Formik } from 'formik';
import useScriptRef from 'hooks/useScriptRef';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { login } from 'api/auth';
import { verifyCurrentUserInLocal } from 'utils/Util';
import ModalAlert from 'layout/Modal/indax';
import { useNavigate } from 'react-router';

const FirebaseLogin = ({ ...others }) => {
    const [open, setOpen] = useState(false);
    const [error, setError] = useState('');
    const [alertColor, setAlertColor] = useState('');
    const dispatch = useDispatch();
    const [validationErrors, setValidationErrors] = useState({
        userName: '',
        password: ''
    });

    useEffect(() => {
        verifyCurrentUserInLocal() && localStorage.clear();
    }, []);

    const theme = useTheme();
    const scriptedRef = useScriptRef();

    const customization = useSelector((state) => state.customization);
    const [checked, setChecked] = useState(true);

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const [data, setData] = useState({
        userName: '',
        password: ''
    });

    const handleChange = (e) => {
        setData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value
        }));
    };

    const submitForm = async (event) => {
        event.preventDefault();
        setOpen(false);
        const loginPayload = {
            userName: data.userName,
            password: data.password
        };

        const { accessToken, refreshToken, errorMessage } = await login(loginPayload);

        if (errorMessage) {
            setError(errorMessage);
            setOpen(true);
            setAlertColor('red');

            // Close the toast after 2000 milliseconds (2 seconds)
            setTimeout(() => {
                setOpen(false);
            }, 1000);
        } else {
            setAlertColor('green');
            window.location.href = '/';
        }
    };

    const validationSchema = Yup.object().shape({
        // userName: Yup.string().required('Username is required'),
        // password: Yup.string().required('Password is required')
    });

    const navigate = useNavigate();

    const handleForgotPasswordClick = () => {
        navigate('/forgotPassword');
    };

    return (
        <>
            <ModalAlert message={error} openn={open} color={alertColor} />
            <Grid container direction="column" justifyContent="center" spacing={2}>
                <Grid item xs={12}>
                    <Box
                        sx={{
                            alignItems: 'center',
                            display: 'flex'
                        }}
                    >
                        <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
                        <Button
                            variant="outlined"
                            sx={{
                                cursor: 'unset',
                                m: 2,
                                py: 0.5,
                                px: 7,
                                borderColor: `${theme.palette.grey[100]} !important`,
                                color: `${theme.palette.grey[900]}!important`,
                                fontWeight: 500,
                                borderRadius: `${customization.borderRadius}px`
                            }}
                            disableRipple
                            disabled
                        >
                            Smart City
                        </Button>
                        <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
                    </Box>
                </Grid>
                <Grid item xs={12} container alignItems="center" justifyContent="center">
                    <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle1">Sign in with UserName </Typography>
                    </Box>
                </Grid>
            </Grid>

            <Formik
                initialValues={{
                    userName: '',
                    password: '',
                    submit: null
                }}
                validationSchema={validationSchema}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                    try {
                        if (scriptedRef.current) {
                            setStatus({ success: true });
                            setSubmitting(false);
                        }
                    } catch (err) {
                        console.error(err);
                        if (scriptedRef.current) {
                            setStatus({ success: false });
                            setErrors({ submit: err.message });
                            setSubmitting(false);
                        }
                    }
                }}
            >
                {({ errors, handleBlur, handleSubmit, isSubmitting, touched }) => (
                    <form noValidate onSubmit={handleSubmit} {...others}>
                        <FormControl
                            fullWidth
                            error={Boolean(touched.userName && (errors.userName || validationErrors.userName))}
                            sx={{ ...theme.typography.customInput }}
                        >
                            <InputLabel htmlFor="outlined-adornment-userName-login">Username</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-userName-login"
                                type="text"
                                onChange={handleChange}
                                value={data.userName}
                                required
                                name="userName"
                                onBlur={handleBlur}
                                label="Username"
                                inputProps={{}}
                                style={{ borderColor: touched.userName && (errors.userName || validationErrors.userName) ? 'red' : '' }}
                            />
                            {touched.userName && (errors.userName || validationErrors.userName) && (
                                <FormHelperText error id="standard-weight-helper-text-userName-login">
                                    {errors.userName || validationErrors.userName}
                                </FormHelperText>
                            )}
                        </FormControl>

                        <FormControl
                            fullWidth
                            error={Boolean(touched.password && (errors.password || validationErrors.password))}
                            sx={{ ...theme.typography.customInput }}
                        >
                            <InputLabel htmlFor="outlined-adornment-password-login">Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password-login"
                                type={showPassword ? 'text' : 'password'}
                                value={data.password}
                                name="password"
                                required
                                onBlur={handleBlur}
                                onChange={handleChange}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                            size="large"
                                        >
                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Password"
                                inputProps={{}}
                                style={{ borderColor: touched.password && (errors.password || validationErrors.password) ? 'red' : '' }}
                            />
                            {touched.password && (errors.password || validationErrors.password) && (
                                <FormHelperText error id="standard-weight-helper-text-password-login">
                                    {errors.password || validationErrors.password}
                                </FormHelperText>
                            )}
                        </FormControl>
                        <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={checked}
                                        onChange={(event) => setChecked(event.target.checked)}
                                        name="checked"
                                        color="primary"
                                    />
                                }
                                label="Remember me"
                            />
                        </Stack>
                        {errors.submit && (
                            <Box sx={{ mt: 3 }}>
                                <FormHelperText error>{errors.submit}</FormHelperText>
                            </Box>
                        )}

                        <Box sx={{ mt: 2 }}>
                            <Button
                                disableElevation
                                fullWidth
                                size="large"
                                type="button"
                                variant="contained"
                                color="secondary"
                                onClick={submitForm}
                            >
                                Sign in
                            </Button>
                        </Box>
                    </form>
                )}
            </Formik>
            <Typography
                onClick={handleForgotPasswordClick}
                variant="subtitle1"
                color="secondary"
                sx={{ textDecoration: 'none', cursor: 'pointer' }}
            >
                Forgot Password?
            </Typography>
        </>
    );
};

FirebaseLogin.propTypes = {
    // add propTypes here
};

export default FirebaseLogin;
