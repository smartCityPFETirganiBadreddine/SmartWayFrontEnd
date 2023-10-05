// assets
import { IconDashboard } from '@tabler/icons';
import { IconMap } from '@tabler/icons-react';
import { IconUsersGroup } from '@tabler/icons-react';
import { IconGauge } from '@tabler/icons-react';
import { IconUser } from '@tabler/icons-react';
import { IconBinaryTree2 } from '@tabler/icons-react';
import { IconBrandAmongUs } from '@tabler/icons-react';
import { IconTrowel } from '@tabler/icons-react';
import { IconWriting } from '@tabler/icons-react';
import { IconFileArrowLeft } from '@tabler/icons-react';
import { IconPackageImport } from '@tabler/icons-react';
// constant
const icons = { IconDashboard };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const administration = {
    id: 'administration',
    type: 'group',

    children: [
        {
            id: 'administration',
            title: 'administration',
            type: 'collapse',
            icon: IconGauge,

            children: [
                {
                    id: 'parametrageFamille',
                    title: 'Paramétrage Famille',
                    type: 'item',
                    url: '/parametrageFamille',
                    icon: IconBinaryTree2,
                    breadcrumbs: false
                },
                {
                    id: 'paramétragePersonnel',
                    title: 'Paramétrage Personnel',
                    type: 'item',
                    url: '/parametragePersonnel',
                    icon: IconUsersGroup,
                    breadcrumbs: false
                },
                {
                    id: 'paramétrageEquipe',
                    title: 'Paramétrage Equipe',
                    type: 'item',
                    url: '/parametrageEquipe',
                    icon: IconBrandAmongUs,
                    breadcrumbs: false
                },
                {
                    id: 'paramétrageMatériel',
                    title: 'Paramétrage Matériel',
                    type: 'item',
                    url: '/parametrageMateriel',
                    icon: IconTrowel,
                    breadcrumbs: false
                },
                {
                    id: 'importContratsAbonnement',
                    title: "Import Contrats D'abonnement",
                    type: 'item',
                    url: '/dashboard',
                    icon: IconFileArrowLeft,
                    breadcrumbs: false,
                    disabled: true
                },
                {
                    id: 'importMatériel',
                    title: 'Import Matériel',
                    type: 'item',
                    url: '/dashboard',
                    icon: IconPackageImport,
                    breadcrumbs: false,
                    disabled: true
                }
            ]
        }
    ]
};

export default administration;
