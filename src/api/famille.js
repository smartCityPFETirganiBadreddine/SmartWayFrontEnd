import { instance } from '../config/api';
// Select All #checked
async function getAll() {
    const response = await instance.get('/familyType');

    return response;
}
export async function getAllByBranch(branch) {
    const response = await instance.get(`/familyType/getAllByBranch/${branch}`);
    return response;
}
// Delete familyType #checked
export async function remove(id) {
    console.log('inside the delete familyType', instance.delete(`/familyType/${id}`));
}
// User by Id
export async function getById(id) {
    const response = await instance.get(`/users/${id}`);
    console.log('inside get User By Id function', await instance.get(`/users/${id}`));
    return response;
}

// Update familyType

export async function update(id, famille) {
    const response = await instance.put(`/familyType/${id}`, famille);
    try {
        return response.data;
    } catch (error) {
        return console.log('error update', error);
    }
}

// Create familyType #checked
export async function create(famille) {
    const response = await instance.post(`/familyType/`, famille);
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
export { getAll as getAllFamille, create as createFamille };
