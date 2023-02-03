import { login, register } from '../data/user.js';
import { html } from '../lib/lit-html.js';
import { createSubmitHandler } from '../util.js';

export function showRegister(ctx) {
    ctx.render(registerTemplate());

    function registerTemplate() {
        return html`
        <h2>Register</h2>
        <form @submit=${createSubmitHandler(onSubmit)}>
            <label>Email: <input type="text" name="email"></label>
            <label>Username: <input type="text" name="username"></label>
            <label>Password: <input type="text" name="password"></label>
            <label>Repeat Password: <input type="text" name="repass"></label>
            <button>Register</button>
        </form>`
    }
    
    async function onSubmit({ email, password, username, repass }) {
    
        if (email == '' || password == '' || repass == '' || username == '') {
            return alert('All fields are required');
        }

        if (password != repass) {
            return alert('Passwords don\'t match');
        }
    
        await register(email,username, password);

        ctx.page.redirect('/rooms');
    }
}