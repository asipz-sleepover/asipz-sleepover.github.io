import * as roomService from '../data/room.js';
import { html } from '../lib/lit-html.js';
import { createSubmitHandler } from '../util.js';

export function showCreate(ctx) {
    ctx.render(createTemplate());

    function createTemplate() {
        return html`
        <h2>Host Room</h2>
        <form @submit=${createSubmitHandler(onSubmit)}>
            <label>Name: <input type="text" name="name"></label>
            <label>Location: <input type="text" name="location"></label>
            <label>Beds: <input type="number" name="beds"></label>
            <button>Create Room</button>
        </form>`
    }
    
    async function onSubmit({ name, location, beds }) {
        beds = parseInt(beds);
    
        if (name == '' || location == '' || Number.isNaN(beds)) {
            return alert('All fields are required');
        }
        const userId = ctx.user?.objectId;
        const result = await roomService.create({name, location, beds}, userId);

        ctx.page.redirect('/rooms/' + result.objectId);
    }
}

