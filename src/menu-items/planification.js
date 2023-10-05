// assets
import { IconDashboard } from '@tabler/icons';
import { IconCalendarStats } from '@tabler/icons-react';
import { IconBolt } from '@tabler/icons-react';
import { IconDropletFilled2 } from '@tabler/icons-react';
import { IconFileTime } from '@tabler/icons-react';
import { IconMapPin } from '@tabler/icons-react';
// constant
const icons = { IconDashboard };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const planification = {
    id: 'planification',
    type: 'group',

    children: [
        {
            id: 'planification',
            title: 'Planification',
            type: 'collapse',
            icon: IconFileTime,

            children: [
                // {
                //     id: 'planification',
                //     title: 'Planification',
                //     type: 'item',
                //     url: '/dashboard',
                //     icon: IconFileTime,
                //     breadcrumbs: false,
                //     disabled: true
                // },
                {
                    id: 'geoLocalisation',
                    title: 'GeoLocalisation',
                    type: 'item',
                    url: '/dashboard',
                    icon: IconMapPin,
                    breadcrumbs: false,
                    disabled: true
                }
            ]
        }
    ]
};

export default planification;
