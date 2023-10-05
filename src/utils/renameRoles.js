export function renameRoles(role) {
    switch (role) {
        case 'ROLE_ADMIN':
            return 'Administrateur';
        case 'ROLE_OKSA_CHEF_DIRECTION':
            return 'Direction';
        case 'ROLE_OKSA_CHEF_DEP':
            return 'Chef de département';
        case 'ROLE_OKSA_OR_INT':
            return 'Ordonnanceur intermédiaire';
        case 'ROLE_OKSA_OPERATOR':
            return 'Opérateur';
        case 'ROLE_OKSA_CHEF':
            return 'Supérviseur';
        case 'ROLE_OKSA_CHEF_EQP':
            return 'Chef d’équipe';
        case 'ROLE_OKSA_EQP_MEMBER':
            return 'Membre d’équipe';
        case 'ROLE_OKSA_OR':
            return 'Ordonnanceur';
        case 'ROLE_CLIENT':
            return 'Client';
        case 'ROLE_USER':
            return 'Utilisateur';
        // Add new roles here
        case 'ROLE_NEW_ROLE':
            return 'Nouveau rôle';
        default:
            return role;
    }
}
export const roles = [
    { value: 'ROLE_ADMIN', label: 'Administrateur' },
    { value: 'ROLE_OKSA_CHEF_DIRECTION', label: 'Direction' },
    { value: 'ROLE_OKSA_CHEF_DEP', label: 'Chef de département' },
    { value: 'ROLE_OKSA_OR_INT', label: 'Ordonnanceur intermédiaire' },
    { value: 'ROLE_OKSA_OPERATOR', label: 'Opérateur' },
    { value: 'ROLE_OKSA_CHEF', label: 'Supérviseur' },
    { value: 'ROLE_OKSA_CHEF_EQP', label: 'Chef d’équipe' },
    { value: 'ROLE_OKSA_EQP_MEMBER', label: 'Membre d’équipe' },
    { value: 'ROLE_OKSA_OR', label: 'Ordonnanceur' },
    { value: 'ROLE_CLIENT', label: 'client' },
    { value: 'ROLE_USER', label: 'user' }
];
