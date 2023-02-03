import * as roomService from '../data/room.js';
import * as resService from '../data/reservation.js';
import { html, nothing } from '../lib/lit-html.js';
import { createSubmitHandler } from '../util.js';
import { repeat } from '../lib/directives/repeat.js';


export async function showDetails(ctx) {

    const hasUser = Boolean(ctx.user);
    const roomId = ctx.params.id;
    const room = ctx.data;
    room.isOwner = room.owner.objectId === ctx.user?.objectId;
    room.reservations = [];

    if (hasUser) {
        const result = await resService.getByRoomId(roomId);
        room.reservations = result.results;
    }

    ctx.render(detailsTemplate(room));



    function detailsTemplate(room) {
        return html`
        <h2>${room.name}</h2>
        <p>Location: ${room.location}</p>
        <p>Beds: ${room.beds}</p>

        ${hasUser && !room.isOwner
        ? reservationForm()
        :nothing}

        ${room.isOwner
         ? html`<a href="/edit/${room.objectId}">Edit</a> 
         <a href="javascript:void(0)" @click=${onDelete}>Delete</a>` 
         : nothing}
         
         ${hasUser
         ? html`
         <ul>
            ${repeat(room.reservations, r => r.objectId, reservationCard)}
         </ul>`
         : nothing}`;
    }

    function reservationCard(res) {
        return html`
        <li>
            From: ${res.startDate.toISOString().slice(0,10)}
            To: ${res.endDate.toISOString().slice(0,10)}
            By: ${res.owner.username}
        </li>`;
    }

    function reservationForm() {
        return html`
        <form @submit=${createSubmitHandler(book)}>
        <label>From <input type="date" name="startDate"></label>
        <label>To <input type="date" name="endDate"></label>
        <button>Request reservation</button>
        </form>`;
    }

    async function onDelete() {
        const choice = confirm('Are you sure?');
        if(choice) {
            await roomService.remove(roomId);
            ctx.page.redirect('/rooms');
        }
    }

    async function book({startDate, endDate}) {
        startDate = new Date(startDate);
        endDate = new Date(endDate);
        if(Number.isNaN(startDate.getDate())) {
            return alert('Invalid start date!');
        }
        if(Number.isNaN(endDate.getDate())) {
            return alert('Invalid end date!');
        }
        if (endDate <= startDate) {
            return alert('End date should be after start date');
        }
        const reservationData = {
            startDate,
            endDate,
            room : roomId,
            host : ctx.data.owner.objectId
        };
        const result = await resService.create(reservationData, ctx.user.objectId);
        ctx.page.redirect('/rooms/' + roomId);
    }
}