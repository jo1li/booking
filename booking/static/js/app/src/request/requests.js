import request from './setup';
import { getFormData, filterUndefined } from '../utils/formHelpers';

export const updateUserBio = (data, id) => {
    data = filterUndefined(data);
    return request.put(`/v1/artists/${id}/`, getFormData(data))
}

export const getGenres = (data, id) => request.get(`/v1/genres/`)