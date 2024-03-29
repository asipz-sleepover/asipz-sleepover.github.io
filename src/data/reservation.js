import { addOwner, createPointer, encodeDate, encodeObject, filterRelation } from '../util.js';
import { del, get, post, put } from './api.js';

const endpoints = {
    'reservationByRoomId': (roomId) => '/classes/Reservation?where=' + encodeObject(filterRelation('room', 'Room', roomId)) + '&include=owner',
    'reservations': '/classes/Reservation'
}

export async function getByRoomId(roomId) {
    const data = await get(endpoints.reservationByRoomId(roomId));
    data.results.forEach(r => {
        r.startDate = new Date(r.startDate.iso);
        r.endDate = new Date(r.endDate.iso);
    });
    return data;
}

export async function create(roomData, userId) {
    roomData = addOwner(roomData, userId);
    roomData.startDate = encodeDate(roomData.startDate);
    roomData.endDate = encodeDate(roomData.endDate);
    roomData.room = createPointer('Room', roomData.room);
    roomData.host = createPointer('_User', roomData.host);
    return post(endpoints.reservations, roomData);
}