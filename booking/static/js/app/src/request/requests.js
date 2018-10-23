import request from './setup';
import { getFormData, filterUndefined } from '../utils/formHelpers';

export const updateUserBio = (data, id) => {
    data = filterUndefined(data);
    return request.put(`/v1/artists/${id}/`, getFormData(data));
}

export const sendArtistMessage = (artistId, data) => {
    console.log("SendArtistMessageForm request", artistId, data);
    return request.post(`/v1/artists/${artistId}/messages/`, data);
}

// TODO: autogenerate basic CRUD requests

export const getVideos = ({artistId}) => {
    return request.get(`/v1/artists/${artistId}/videos/`);
}

export const updateVideo = ({artistId, videoId, code, order}) => {
    return request.put(`/v1/artists/${artistId}/videos/${videoId}/`, {code, order});
}

export const createVideo = ({artistId, code, order}) => {
    return request.post(`/v1/artists/${artistId}/videos/`, {code, order});
}

export const destroyVideo = ({artistId, videoId}) => {
    return request.delete(`/v1/artists/${artistId}/videos/${videoId}`);
}

export const getAudios = ({artistId}) => {
    return request.get(`/v1/artists/${artistId}/audios/`);
}

export const updateAudio = ({artistId, audioId, code, order}) => {
    return request.put(`/v1/artists/${artistId}/audios/${audioId}/`, {code, order});
}

export const createAudio = ({artistId, code, order}) => {
    return request.post(`/v1/artists/${artistId}/audios/`, {code, order});
}

export const destroyAudio = ({artistId, audioId}) => {
    return request.delete(`/v1/artists/${artistId}/audios/${audioId}`);
}

export const getPhotos = ({artistId}) => {
    return request.get(`/v1/artists/${artistId}/photos/`);
}

export const updatePhoto = ({artistId, photoId, order}) => {
    return request.put(`/v1/artists/${artistId}/photos/${photoId}/`, {order});
}

export const createPhoto = ({artistId, file}) => {
    return request.post(`/v1/artists/${artistId}/photos/`, file);
}

export const destroyPhoto = ({artistId, photoId}) => {
    return request.delete(`/v1/artists/${artistId}/photos/${photoId}`);
}

export const getGenres = (data, id) => request.get(`/v1/genres/`);
