import * as roomService from '../data/room.js';
import { html } from '../lib/lit-html.js';
import { createSubmitHandler } from '../util.js';

export function showEdit(ctx) {
    const roomId = ctx.params.id;

    ctx.render(editTemplate(ctx.data));

    function editTemplate(room) {
        return html`
        <h2>Edit Room</h2>
        <form @submit=${createSubmitHandler(onSubmit)}>
            <label>Name: <input type="text" name="name" .value=${room.name}></label>
            <label>Location: <input type="text" name="location" .value=${room.location}></label>
            <label>Beds: <input type="number" name="beds" .value=${room.beds}></label>
            <label>Open for booking: <input type="checkbox" name="openForBooking" .checked=${room.openForBooking}></label>
            <button>Save Changes</button>
        </form>`
    }

    async function onSubmit({ name, location, beds, openForBooking }) {
        beds = parseInt(beds);
        openForBooking = Boolean(openForBooking);

        if (name == '' || location == '' || Number.isNaN(beds)) {
            return alert('All fields are required');
        }
        const userId = ctx.user.objectId;
        await roomService.update(roomId, { name, location, beds, openForBooking }, userId);

        ctx.page.redirect('/rooms/' + roomId);
    }
}

