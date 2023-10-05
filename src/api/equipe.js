import { instance } from '../config/api';
//get All equipe
async function getAll() {
    const response = await instance.get('/team');

    return response;
}
//
export async function getByBrancheId(id) {
    const response = await instance.get(`/team/branch/${id}`);

    return response;
}
export async function getAllSupervisor() {
    const response = await instance.get('/users/roles/ROLE_OKSA_CHEF');

    return response;
}
export async function getAllChefDepartements() {
    const response = await instance.get('/users/roles/ROLE_OKSA_CHEF_EQP');

    return response;
}

export async function getAllMembers() {
    const response = await instance.get('/users/roles/ROLE_OKSA_EQP_MEMBER');
    response.data = response.data.filter((user) => user.team === null);

    return response;
}
export async function getAllMembersUp(teamId) {
    const response = await instance.get('/users/roles/ROLE_OKSA_EQP_MEMBER');

    const filteredData = response.data.filter((user) => (user.team !== null && user.team.id === teamId) || user.team === null);

    return { data: filteredData }; // Return a new object with the filtered data
}

// Delete Personnel
export async function remove(id) {
    console.log('inside the delete team', instance.delete(`/team/${id}`));
}
// User by Id branch/1
export async function getByBranchId(id) {
    const response = await instance.get(`/team/branch/${id}`);

    return response;
}

export async function getById(id) {
    const response = await instance.get(`/team/${id}`);

    return response;
}

// Update personnel

export async function update(id, team) {
    const response = await instance.put(`/team/${id}`, team);
    try {
        return response.data;
    } catch (error) {
        return console.log('error update', error);
    }
}
//load

// Create team
export async function create(team) {
    const response = await instance.post(`/team`, team);
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
export { getAll as getAllequipes };
