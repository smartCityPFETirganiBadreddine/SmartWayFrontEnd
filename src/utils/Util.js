export const verifyCurrentUserInLocal = () => {
    const userStr = localStorage.getItem('accessToken');
    if (userStr) return true;
    return false;
};
export const unite = [
    { id: 1, name: 'Métre' },
    { id: 2, name: 'Kg' },
    { id: 3, name: 'Litre' },
    { id: 4, name: 'Unité' },
    { id: 5, name: 'Autre' }
];
export function getBranchById(id) {
    switch (id) {
        case '1':
            return 'Electricite';
        case '2':
            return 'Eau Potable';
        case '3':
            return 'Assainissement';
    }
}
export const statusReclamation2 = [
    { id: 1, name: 'en cours' },
    { id: 2, name: 'cloture' },
    { id: 3, name: 'annuler' }
];
