import request from './setup';
import { getFormData, filterUndefined } from '../utils/formHelpers';

export const updateUserBio = (data, id) => {
    data = filterUndefined(data);
    return request.put(`/v1/artists/${id}/`, getFormData(data));
}

export const getVideos = ({musicianId}) => {
    return request.get(`/v1/artists/${musicianId}/videos/`);
}

export const updateVideo = ({musicianId, videoId, code}) => {
    return request.put(`/v1/artists/${musicianId}/videos/${videoId}/`, {code});
}

export const createVideo = ({musicianId, code}) => {
    return request.post(`/v1/artists/${musicianId}/videos/`, {code});
}

export const getGenres = (data, id) => request.get(`/v1/genres/`);
