import request from './setup';
import { getFormData } from '../utils/formHelpers';

export const updateUserBio = (data, id) => {
    return request.put(`/v1/artists/${id}/`, getFormData(data))
}

export const getGenres = (data, id) => request.get(`/v1/genres/`)