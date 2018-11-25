'use strict';

import home from './pages/home.js'
import about from './pages/about.js'


import email from './pages/misterEmail/app.js'
import emailDetails from './pages/misterEmail/details.cmp.js'
import emailCompose from './pages/misterEmail/compose.cmp.js'



import keep from './pages/MissKeep/app.cmp.js'
import keepEdit from './pages/MissKeep/edit.cmp.js'



const routes = [
    {path: '/', component: home},
    {path: '/about', component: about},
    {path: '/email', component: email},
    {path: '/email/details/:emailId', component: emailDetails},
    {path: '/email/compose', component: emailCompose},


    {path: '/keep', component: keep},
    {path: '/keep/edit/:keepId?', component: keepEdit},
  ];

Vue.use(VueRouter);
var myRouter = new VueRouter({routes})

export default myRouter;