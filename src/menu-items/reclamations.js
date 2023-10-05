// assets
import { IconDashboard } from '@tabler/icons';
import { IconMap } from '@tabler/icons-react';
import { IconUsersGroup } from '@tabler/icons-react';
import { IconGauge } from '@tabler/icons-react';
import { IconUser } from '@tabler/icons-react';
import { IconBinaryTree2 } from '@tabler/icons-react';
import { IconBrandAmongUs } from '@tabler/icons-react';
import { IconBolt } from '@tabler/icons-react';
import { IconDropletFilled2 } from '@tabler/icons-react';
import { IconFilterOff } from '@tabler/icons-react';
import { IconHandOff } from '@tabler/icons-react';
// constant
const icons = { IconDashboard };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const reclamations = {
    id: 'reclamations',
    type: 'group',

    children: [
        {
            id: 'reclamations',
            title: 'reclamations',
            type: 'collapse',
            icon: IconHandOff,

            children: [
                {
                    id: 'electricite',
                    title: 'Electricite',
                    type: 'item',
                    url: '/parametrageReclamation/1',
                    icon: IconBolt,
                    breadcrumbs: false
                },
                {
                    id: 'eauPotable',
                    title: 'EauPotable',
                    type: 'item',
                    url: '/parametrageReclamation/2',
                    icon: IconDropletFilled2,
                    breadcrumbs: false,
                    disabled: false
                },
                {
                    id: 'assainissement',
                    title: 'Assainissement',
                    type: 'item',
                    url: '/parametrageReclamation/3',
                    icon: IconFilterOff,
                    breadcrumbs: false,
                    disabled: false
                }
            ]
        }
    ]
};

export default reclamations;
