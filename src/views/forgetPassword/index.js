import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Card, CardContent, Container, TextField, Typography } from '@mui/material';
import { forgetPassword } from 'api/auth';
import Logo from '../../assets/images/smart-city.png'; // Import your logo image

const styles = {
    card: {
        marginTop: '30px',
        padding: '30px',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)'
    },
    logoContainer: {
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '20px'
    },
    logo: {
        width: '100px',
        height: '100px'
    },
    title: {
        fontWeight: 'bold',
        marginBottom: '20px',
        textAlign: 'center'
    },
    form: {
        display: 'flex',
        flexDirection: 'column'
    },
    textField: {
        marginBottom: '20px'
    }
};

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            forgetPassword(email); // Call the forgetPassword function with the email, and wait for the response
            navigate('/login'); // Navigate to the login page on success
        } catch (error) {
            console.error(error); // Log any errors for debugging
        }
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    return (
        <Container maxWidth="sm">
            <Card sx={styles.card}>
                <CardContent>
                    <Box sx={styles.logoContainer}>
                        <img src={Logo} alt="Logo" style={styles.logo} />
                    </Box>
                    <Typography variant="h4" sx={styles.title}>
                        SmartCity
                    </Typography>
                    <Typography variant="h4" sx={styles.title}>
                        Forgot Password
                    </Typography>
                    <form onSubmit={handleSubmit} sx={styles.form}>
                        <TextField
                            fullWidth
                            label="Email"
                            name="email"
                            type="email"
                            value={email}
                            onChange={handleEmailChange}
                            required
                            sx={styles.textField}
                        />
                        <Button fullWidth variant="contained" type="submit">
                            Send Reset Password Email
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </Container>
    );
};

export default ForgotPassword;
