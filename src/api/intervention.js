import { instance } from '../config/api';
//get All equipe
async function getAll(branchid) {
    //alert('branchid', branchid);
    const response = await instance.get(`/intervention/branch/${branchid}`);

    return response;
}
export async function getAllByReclamationId(reclamationId) {
    const response = await instance.get('/intervention/getByReclamation/${reclamationId}');
    return response;
}
export async function getContratByNumPolice(id) {
    const response = await instance.get(`/intervention/getContratByNumPolice/${id}`);

    return response;
}

// Delete Personnel
export async function remove(id) {
    console.log('inside the delete team', await instance.delete(`/intervention/${id}`));
}
// User by Id
export async function getByIdIntervention(id) {
    const response = await instance.get(`/intervention/${id}`);

    return response;
}
export async function getInterventionsByReclamationId(id) {
    const response = await instance.get(`/intervention/byReclamation/${id} `);

    console.log('response', response);
    return response;
}

// Update personnel

export async function update(id, team) {
    const response = await instance.put(`/intervention/${id}`, team);
    try {
        return response.data;
    } catch (error) {
        return console.log('error update', error);
    }
}
//load

// Create team
export async function createIntervention(intervention) {
    const response = await instance.post(`/intervention`, intervention);
    alert('response bieeeen ');
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
export { getAll as getAllIntervention };
