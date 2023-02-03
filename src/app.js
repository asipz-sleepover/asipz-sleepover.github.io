import page from './lib/page.mjs';

import { addRender } from './middlewares/render.js';
import { addSession } from './middlewares/session.js';
import { addUserNav } from './middlewares/userNav.js';
import { preloadRoom } from './middlewares/preloader.js';
import { hasUser, isOwner } from './middlewares/guards.js';

import { showCreate } from './views/createView.js';
import { showCatalog } from './views/catalogView.js';
import { showLogin } from './views/loginView.js';
import { showRegister } from './views/registerView.js';
import { navTemplate } from './views/nav.js';
import { showHome } from './views/homeView.js';
import { showDetails } from './views/detailsView.js';
import { showEdit } from './views/editView.js';

import { getUserData } from './util.js';
import { logoutAction } from './views/logout.js';


const main = document.querySelector('main');
const nav = document.querySelector('header');

page(addRender(main, nav));
page(addSession(getUserData));
page(addUserNav(navTemplate));

page('/', showHome);
page('/rooms', showCatalog);
page('/login', showLogin);
page('/register', showRegister);
page('/rooms/:id', preloadRoom('id', 'room'), showDetails);
page('/edit/:id', preloadRoom('id', 'room'), isOwner(), showEdit);
page('/host', hasUser(), showCreate);
page('/logout', logoutAction);

page.start();