// assets
import { IconDashboard } from '@tabler/icons';
import { IconBrandUnsplash } from '@tabler/icons-react';
import { IconMilitaryRank } from '@tabler/icons-react';
import { IconBasketFilled } from '@tabler/icons-react';
// constant
const icons = { IconDashboard };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const stock = {
    id: 'getsion-Stocks',
    type: 'group',
    children: [
        {
            id: 'gestionStocks',
            title: 'Gestion Stock',
            type: 'collapse',
            icon: IconBasketFilled,
            url: '/dashboard',
            children: [
                {
                    id: 'gestionStock',
                    title: 'Gestion Stock',
                    type: 'item',
                    url: '/dashboard',
                    icon: IconMilitaryRank,
                    breadcrumbs: false,
                    disabled: true
                }
            ]
        }
    ]
};

export default stock;
