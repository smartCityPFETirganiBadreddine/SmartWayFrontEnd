// material-ui
import { Typography } from '@mui/material';
import Maps from 'ui-component/Map';

// project imports
import MainCard from 'ui-component/cards/MainCard';

// ==============================|| SAMPLE PAGE ||============================== //

const MapPage = () => (
    <MainCard title="Localisations :">
        <Typography variant="body2">
            <Maps />
        </Typography>
    </MainCard>
);

export default MapPage;
