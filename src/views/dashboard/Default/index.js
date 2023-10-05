import { useEffect, useState } from 'react';

// material-ui
import { Grid, Typography } from '@mui/material';

// project imports
import EarningCard from './EarningCard';
import PopularCard from './PopularCard';
import TotalOrderLineChartCard from './TotalOrderLineChartCard';
import TotalIncomeDarkCard from './TotalIncomeDarkCard';
import TotalIncomeLightCard from './TotalIncomeLightCard';
import TotalGrowthBarChart from './TotalGrowthBarChart';
import { gridSpacing } from 'store/constant';
import Gerence from 'layout/Gerence';
import TotalIncomeCard from 'ui-component/cards/Skeleton/TotalIncomeCard';
import MapPage from 'views/Maps';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(false);
    }, []);

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <Gerence />
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item lg={4} md={12} sm={12} xs={12}>
                        <TotalIncomeLightCard text={'Réclamations'} cpt={'6'} isLoading={isLoading} />
                    </Grid>
                    <Grid item lg={4} md={12} sm={12} xs={12}>
                        <TotalIncomeLightCard text={'Interventions'} cpt={'2'} isLoading={isLoading} />
                    </Grid>

                    <Grid item lg={2} md={12} sm={12} xs={12}>
                        <TotalIncomeLightCard text={'Equipes'} cpt={'3'} isLoading={isLoading} />
                    </Grid>
                    <Grid item lg={2} md={12} sm={12} xs={12}>
                        <TotalIncomeLightCard text={'Personnels'} cpt={'12'} isLoading={isLoading} />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12} md={8}>
                        <TotalGrowthBarChart isLoading={isLoading} />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <PopularCard isLoading={isLoading} />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <MapPage />
            </Grid>
        </Grid>
    );
};

export default Dashboard;
