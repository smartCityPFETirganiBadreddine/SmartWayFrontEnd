import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, Button, Card, CardContent, Container, TextField, Typography } from '@mui/material';
import { resetPassword } from 'api/auth'; // import resetPassword instead of forgetPassword
import Logo from '../../assets/images/smart-city.png'; // Import your logo image

const ResetPassword = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [password, setPassword] = useState('');
    const token = new URLSearchParams(location.search).get('token');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const data = resetPassword(password, token); // Pass the token and password separately to the resetPassword function
            alert('Password reset successfully');
            navigate('/login');
        } catch (error) {
            alert(error);
        }
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 8 }}>
                <Card>
                    <CardContent>
                        <Box sx={{ mb: 2 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                <img src={Logo} alt="Logo" style={{ width: '100px', height: '100px' }} />
                            </Box>
                            <Typography variant="h5" align="center" mb={2}>
                                SmartCity
                            </Typography>
                            <Typography variant="h4" align="center" mb={2}>
                                Reset Password
                            </Typography>
                            <Typography variant="body1" align="center" mb={4}>
                                Enter your new password below to reset your password.
                            </Typography>
                        </Box>
                        <form onSubmit={handleSubmit}>
                            <TextField
                                fullWidth
                                label="New Password"
                                margin="normal"
                                name="password"
                                type="password"
                                value={password}
                                onChange={handlePasswordChange}
                                required
                            />
                            <Button fullWidth variant="contained" type="submit" sx={{ mt: 2 }}>
                                Reset Password
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </Box>
        </Container>
    );
};

export default ResetPassword;
