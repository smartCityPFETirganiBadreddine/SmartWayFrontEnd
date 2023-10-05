export function createData(personnel, handleEditClick, handleDeleteClick) {
    const { id, userName, cin, email, password, matricule, firstName, lastName, phone, enabled, branch, roles } = personnel;

    return {
        id: id,
        cin: cin,
        matricule: matricule,
        email: email,
        password: password,
        login: userName,
        name: lastName,
        prenom: firstName,
        phone,
        roles: renameRoles(roles[0]?.name),
        actif: enabled ? 'Oui' : 'Non',
        branch: branch?.name || '',
        action: (
            <div>
                <button
                    type="button"
                    className="btn btn-primary"
                    style={{ backgroundColor: '#0A5EE6', marginRight: '10px', borderRadius: '5px' }}
                >
                    <EditIcon sx={{ color: '#FFFFFF' }} onClick={() => handleEditClick(personnel)} />
                </button>
                <button type="button" className="btn btn-primary" style={{ backgroundColor: '#D86767', borderRadius: '5px' }}>
                    <DeleteForeverIcon sx={{ color: '#FFFFFF' }} onClick={() => handleDeleteClick(id)} />
                </button>
            </div>
        )
    };
}
