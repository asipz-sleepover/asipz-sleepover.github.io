import { login } from '../data/user.js';
import { html } from '../lib/lit-html.js';
import { createSubmitHandler } from '../util.js';

export function showLogin(ctx) {
    ctx.render(loginTemplate());

    function loginTemplate() {
        return html`
        <h2>Login</h2>
        <form @submit=${createSubmitHandler(onSubmit)}>
            <label>Email: <input type="text" name="email"></label>
            <label>Password: <input type="text" name="password"></label>
            <button>Login</button>
        </form>`
    }
    
    async function onSubmit({ email, password }) {
    
        if (email == '' || password == '') {
            return alert('All fields are required');
        }
    
        await login(email, password);

        ctx.page.redirect('/rooms');
    }
}