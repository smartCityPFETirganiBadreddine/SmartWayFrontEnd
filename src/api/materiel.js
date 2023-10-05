import { instance } from '../config/api';
// Select All #checked
export async function getAll() {
    const response = await instance.get('/materiel');

    return response;
}

// Delete materiel #checked
export async function remove(id) {
    console.log('inside the delete familyType', instance.delete(`/materiel/${id}`));
}
// User by Id
export async function getById(id) {
    const response = await instance.get(`/materiel/${id}`);
    console.log('inside get User By Id function', await instance.get(`/materiel/${id}`));
    return response;
}

// Update familyType

export async function update(id, famille) {
    const response = await instance.put(`/materiel/${id}`, famille);
    try {
        return response.data;
    } catch (error) {
        return console.log('error update', error);
    }
}

// Create familyType #checked
export async function create(famille) {
    const response = await instance.post(`/materiel/`, famille);
    try {
        return response.data;
    } catch (error) {
        return console.log('error create', error);
    }
}

//export { getAll, create };
