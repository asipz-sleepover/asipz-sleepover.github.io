import * as roomService from '../data/room.js';
import { repeat } from '../lib/directives/repeat.js';
import { html } from '../lib/lit-html.js';
import { classMap } from '../lib/directives/class-map.js'


export async function showCatalog(ctx) {
    ctx.render(catalogTemplate(html`<p>Loading &hellip;</p>`));

    const { results: rooms } = await roomService.getAll(ctx.user?.objectId);

    if (ctx.user) {
        rooms.forEach(r => r.isOwner = r.owner.objectId == ctx.user.objectId);
    }

    ctx.render(catalogTemplate(listTemplate(rooms)));



    function catalogTemplate(list) {
        return html`
        <h2>Available Rooms</h2>
        ${list}`
    }

    function listTemplate(rooms) {
        return html`
        <section>
            ${repeat(rooms, i => i.objectId, createRoomCard)}
        </section>`;
    }

    function createRoomCard(room) {
        return html`
        <article class=${classMap({ 'room-card': true, 'own-room' : room.isOwner})}>
       <h3>${ room.name }</h3>
            <p>Location: ${room.location}</p>
            <p>Beds: ${room.beds}</p>
            <p><a class="action" href="/rooms/${room.objectId}">View Details</a></p>
            <p>Hosted by ${room.owner.username}</p>
        </article > `;
    }

}