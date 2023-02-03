
import { html } from '../lib/lit-html.js';


export async function showHome(ctx) {
    ctx.render(homeTemplate());


    function homeTemplate() {
        return html`
        <h1>Welcome to SleepOver!</h1>
        <p>Find accommodations in many locations across the country!<a href="/rooms">Browse rooms</a></p>
        <p>Have a room to offer?<a href="/host">Place an ad right now!</a></p>
        `
    }

}