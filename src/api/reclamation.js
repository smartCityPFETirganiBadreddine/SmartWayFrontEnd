import { instance } from '../config/api';
//get All equipe
async function getAll(branchid) {
    //alert('branchid', branchid);
    const response = await instance.get(`/reclamation/branch/${branchid}`);

    return response;
}
export async function getAllContrats() {
    const response = await instance.get('/reclamation/contrats');

    return response;
}
export async function getContratByNumPolice(id) {
    const response = await instance.get(`/reclamation/getContratByNumPolice/${id}`);

    return response;
}

// Delete Personnel
export async function remove(id) {
    console.log('inside the delete team', await instance.delete(`/reclamation/${id}`));
}
// User by Id
export async function getById(id) {
    const response = await instance.get(`/reclamation/${id}`);

    return response;
}

// Update personnel

export async function update(id, team) {
    const response = await instance.put(`/reclamation/${id}`, team);
    try {
        return response.data;
    } catch (error) {
        return console.log('error update', error);
    }
}
//load

// Create team
export async function create(reclamation) {
    const response = await instance.post(`/reclamation`, reclamation);
    try {
        return response.data;
    } catch (error) {
        return console.log('error create', error);
    }
}
// Assign project
export async function assignProject(userId, projectId) {
    const response = await instance.post(`projects/assign-project`, {
        userId,
        projectId
    });
    try {
        return response;
    } catch (error) {
        return console.log('error assign', error);
    }
}
// Unassign project
export async function unassignProject(userId, projectId) {
    const response = await instance.post(`projects/removeUser`, {
        userId,
        projectId
    });
    try {
        return response;
    } catch (error) {
        return console.log('error unassign', error);
    }
}
export { getAll as getAllReclmation };
