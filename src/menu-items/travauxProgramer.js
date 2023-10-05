// assets
import { IconDashboard } from '@tabler/icons';
import { IconCalendarStats } from '@tabler/icons-react';
import { IconBolt } from '@tabler/icons-react';
import { IconDropletFilled2 } from '@tabler/icons-react';
import { IconFilterOff } from '@tabler/icons-react';
import { IconHandOff } from '@tabler/icons-react';
// constant
const icons = { IconDashboard };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const travauxProgramer = {
    id: 'travauxProgramer',
    type: 'group',

    children: [
        {
            id: 'travauxProgramer',
            title: 'Travaux Programer',
            type: 'collapse',
            icon: IconCalendarStats,

            children: [
                {
                    id: 'electricite',
                    title: 'Electricite',
                    type: 'item',
                    url: '/dashboard',
                    icon: IconBolt,
                    breadcrumbs: false,
                    disabled: true
                },
                {
                    id: 'eauPotable',
                    title: 'Eau Potable',
                    type: 'item',
                    url: '/dashboard',
                    icon: IconDropletFilled2,
                    breadcrumbs: false,
                    disabled: true
                },
                {
                    id: 'assainissement',
                    title: 'Assainissement',
                    type: 'item',
                    url: '/dashboard',
                    icon: IconFilterOff,
                    breadcrumbs: false,
                    disabled: true
                }
            ]
        }
    ]
};

export default travauxProgramer;
