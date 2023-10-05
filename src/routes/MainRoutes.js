import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import PrivateRoute from './ProtectedRoute';
import Localisation from 'views/dashboard/Default/localisation';
import ParametrageFamille from 'views/administration/parametrageFamille';
import ParametragePersonnel from 'views/administration/parametragePersonnel';
import ForgotPassword from 'views/forgetPassword';
import ParametrageEquipe from 'views/administration/parametrageEquipe';
import ParametrageMateriel from 'views/administration/parametrageMateriel';
import ParametrageReclamation from 'views/reclamation';
import TableContrats from 'views/reclamation/contrats';
import AddReclamation from 'views/reclamation/addReclamation';
import ContainerAdd from 'views/reclamation/containerAdd';
import Reclamation from 'views/reclamation/addReclamation';
import ContainerReclamation from 'views/reclamation/Reclamations';
import ParametrageInterventionElectricite from 'views/intervention';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// utilities routing
/*const UtilsTypography = Loadable(lazy(() => import('views/utilities/Typography')));
const UtilsColor = Loadable(lazy(() => import('views/utilities/Color')));
const UtilsShadow = Loadable(lazy(() => import('views/utilities/Shadow')));
const UtilsMaterialIcons = Loadable(lazy(() => import('views/utilities/MaterialIcons')));
const UtilsTablerIcons = Loadable(lazy(() => import('views/utilities/TablerIcons')));
*/
// sample page routing
//const SamplePage = Loadable(lazy(() => import('views/Maps')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: <PrivateRoute element={<DashboardDefault />} />
        },
        {
            path: 'dashboard',
            children: [
                {
                    path: 'default',
                    element: <PrivateRoute element={<DashboardDefault />} />
                }
            ]
        },
        {
            path: 'localisation',
            element: <PrivateRoute element={<Localisation />} />
        },

        {
            path: 'parametrageFamille',
            element: <PrivateRoute element={<ParametrageFamille />} />
        },
        {
            path: 'parametragePersonnel',
            element: <PrivateRoute element={<ParametragePersonnel />} />
        },
        {
            path: 'parametrageEquipe',
            element: <PrivateRoute element={<ParametrageEquipe />} />
        },
        {
            path: 'parametrageMateriel',
            element: <PrivateRoute element={<ParametrageMateriel />} />
        },
        {
            path: 'parametrageReclamation/:branchid',
            element: <PrivateRoute element={<ParametrageReclamation />} />
        },
        {
            path: 'reclamation/:branchid',
            element: <PrivateRoute element={<ContainerAdd />} />
        },
        {
            path: 'reclamation/add/:id',
            element: <PrivateRoute element={<ContainerReclamation />} />
        },
        {
            path: 'reclamation/update/:id',
            element: <PrivateRoute element={<ContainerReclamation />} />
        },
        {
            path: 'parametrageIntervention/:branchid',
            element: <PrivateRoute element={<ParametrageInterventionElectricite />} />
        }
        /*
        {
            path: 'icons',
            children: [
                {
                    path: 'tabler-icons',
                    element: <PrivateRoute element={<UtilsTablerIcons />} />
                }
            ]
        },
        {
            path: 'icons',
            children: [
                {
                    path: 'material-icons',
                    element: <PrivateRoute element={<UtilsMaterialIcons />} />
                }
            ]
        },
        {
            path: 'sample-page',
            element: <PrivateRoute element={<SamplePage />} />
        }*/
    ]
};

export default MainRoutes;
