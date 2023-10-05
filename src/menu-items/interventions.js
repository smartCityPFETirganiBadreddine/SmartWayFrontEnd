// assets
import { IconDashboard } from '@tabler/icons';
import { IconUsersGroup } from '@tabler/icons-react';
import { IconBolt } from '@tabler/icons-react';
import { IconDropletFilled2 } from '@tabler/icons-react';
import { IconFilterOff } from '@tabler/icons-react';
import { IconMilitaryRank } from '@tabler/icons-react';
// constant
const icons = { IconDashboard };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const interventions = {
    id: 'interventions',
    type: 'group',

    children: [
        {
            id: 'interventions',
            title: 'Interventions',
            type: 'collapse',
            icon: IconMilitaryRank,

            children: [
                {
                    id: 'electricite',
                    title: 'Electricite',
                    type: 'item',
                    url: '/parametrageIntervention/1',
                    icon: IconBolt,
                    breadcrumbs: false,
                    disabled: false
                },
                {
                    id: 'eauPotable',
                    title: 'Eau Potable',
                    type: 'item',
                    url: '/parametrageIntervention/2',
                    icon: IconDropletFilled2,
                    breadcrumbs: false,
                    disabled: false
                },
                {
                    id: 'assainissement',
                    title: 'Assainissement',
                    type: 'item',
                    url: '/parametrageIntervention/3',
                    icon: IconFilterOff,
                    breadcrumbs: false,
                    disabled: false
                },
                {
                    id: 'interventionParEquipe',
                    title: 'Intervention Par Equipe',
                    type: 'item',
                    url: '/dashboard',
                    icon: IconUsersGroup,
                    breadcrumbs: false,
                    disabled: true
                }
            ]
        }
    ]
};

export default interventions;
