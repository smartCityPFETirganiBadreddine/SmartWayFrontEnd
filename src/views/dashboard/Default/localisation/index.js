import { useEffect, useState } from 'react';

// material-ui
import { Grid } from '@mui/material';

import { gridSpacing } from 'store/constant';
import MapPage from 'views/Maps';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Localisation = () => {
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(false);
    }, []);

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <MapPage />
            </Grid>
        </Grid>
    );
};

export default Localisation;
