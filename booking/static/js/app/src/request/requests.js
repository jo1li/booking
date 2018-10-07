import request from './setup';
import { getFormData, filterUndefined } from '../utils/formHelpers';

export const updateUserBio = (data, id) => {
    data = filterUndefined(data);
    return request.put(`/v1/artists/${id}/`, getFormData(data));
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

export const getSlots = ({artistId}) => {
    return Promise.resolve({
        data: {
            results: [
                {
                    id: 1,
                    start_datetime: '2018-4-05T05:00:00.000Z',
                    end_datetime: '2018-4-05T09:00:00.000Z',
                    event_id: 1,
                    musician_id: artistId,
                    venue_id: 1,
                    venue_name: 'Crawford Auditorium',
                    venue_city: 'Grove City',
                    venue_state: 'PA',
                    public_description: 'Greatest show on earth',
                    private_notes: 'Mom is coming',
                }, {
                    id: 2,
                    start_datetime: '2018-4-06T05:00:00.000Z',
                    end_datetime: '2018-4-06T09:00:00.000Z',
                    event_id: 2,
                    musician_id: artistId,
                    venue_id: 2,
                    venue_name: "Baby's All Right",
                    venue_city: 'New York',
                    venue_state: 'NY',
                    public_description: "Superman's final return",
                    private_notes: 'Parking is a hassle',
                }, {
                    id: 3,
                    start_datetime: '2018-4-07T05:00:00.000Z',
                    end_datetime: '2018-4-07T09:00:00.000Z',
                    event_id: 3,
                    musician_id: artistId,
                    venue_id: 3,
                    venue_name: 'Union Stage',
                    venue_city: 'Washington',
                    venue_state: 'DC',
                    public_description: 'Sick venue',
                    private_notes: 'Srsly union stage is sick',
                }, {
                    id: 4,
                    start_datetime: '2018-4-08T05:00:00.000Z',
                    end_datetime: '2018-4-08T09:00:00.000Z',
                    event_id: 4,
                    musician_id: artistId,
                    venue_id: 4,
                    venue_name: 'Sonia',
                    venue_city: 'Cambridge',
                    venue_state: 'MA',
                    public_description: 'Bring a poncho',
                    private_notes: 'Nate Silver says it will rain',
                }, {
                    id: 5,
                    start_datetime: '2018-4-09T05:00:00.000Z',
                    end_datetime: '2018-4-09T09:00:00.000Z',
                    event_id: 5,
                    musician_id: artistId,
                    venue_id: 5,
                    venue_name: 'World Cafe Live',
                    venue_city: 'Philadelphia',
                    venue_state: 'PA',
                    public_description: 'Scooby Doo and the Where Are Yous will be there too',
                    private_notes: 'I love that dog',
                }
            ],
        },
    });
}

export const getGenres = (data, id) => request.get(`/v1/genres/`);
