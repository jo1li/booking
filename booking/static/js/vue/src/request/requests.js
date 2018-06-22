import request from './setup';

const base = 'http://127.0.0.1';

export const updateUserBio = (data, id) => {
    return request.put(`${base}/v1/artists/${id}/`, data)
}