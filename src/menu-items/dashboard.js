// assets
import { IconDashboard } from '@tabler/icons';
import { IconMap } from '@tabler/icons-react';
import { IconLayoutDashboard } from '@tabler/icons-react';

// constant
const icons = { IconDashboard };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
    id: 'dashboard',
    type: 'group',

    children: [
        {
            id: 'Acceuill',
            title: 'Acceuill',
            type: 'collapse',
            icon: IconLayoutDashboard,

            children: [
                {
                    id: 'Localisation',
                    title: 'Localisation',
                    type: 'item',
                    url: '/localisation',
                    icon: IconMap,
                    breadcrumbs: false
                }
            ]
        }
    ]
};

export default dashboard;
