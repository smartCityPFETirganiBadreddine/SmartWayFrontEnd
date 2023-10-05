// material-ui
import { Link, Typography, Stack } from '@mui/material';

// ==============================|| FOOTER - AUTHENTICATION 2 & 3 ||============================== //

const AuthFooter = () => (
    <Stack direction="row" justifyContent="space-between">
        <Typography variant="subtitle2" component={Link} href="https://itroadgroup.com/" target="_blank" underline="hover">
            itroadgroup.com
        </Typography>
        <Typography variant="subtitle2" component={Link} href="https://tirgani.me" target="_blank" underline="hover">
            &copy; tirgani.me
        </Typography>
    </Stack>
);

export default AuthFooter;
