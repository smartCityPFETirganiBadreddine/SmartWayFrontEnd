import { instance } from '../config/api';
//get All Personnels
async function getAll() {
    const response = await instance.get('/users');

    return response;
}

// Delete Personnel
export async function remove(id) {
    console.log('inside the delete user', instance.delete(`/users/${id}`));
}
// User by Id
export async function getById(id) {
    const response = await instance.get(`/users/${id}`);
    console.log('inside get User By Id function', await instance.get(`/users/${id}`));
    return response;
}

// Update personnel

export async function update(id, user) {
    const response = await instance.put(`/users/${id}`, user);
    try {
        return response.data;
    } catch (error) {
        return console.log('error update', error);
    }
}
//load

// Create Personnel
export async function create(user) {
    const response = await instance.post(`/auth/signup/`, user);
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
export { getAll as getAllPersonnel };
