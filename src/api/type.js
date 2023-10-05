import { instance } from '../config/api';
// Select All
async function getAll() {
    const response = await instance.get('/type');

    return response;
}
export async function getAllByFamille(id) {
    const response = await instance.get(`/type/famille/${id}`);

    return response;
}

// Delete type
export async function remove(id) {
    console.log('inside the delete user', instance.delete(`/type/${id}`));
}

// Update familyType

export async function update(id, type) {
    const response = await instance.put(`/type/${id}`, type);
    try {
        return response.data;
    } catch (error) {
        return console.log('error update', error);
    }
}

// Create familyType
export async function create(type) {
    const response = await instance.post(`/type/`, type);
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
export { getAll as getAllType, create as createType };
