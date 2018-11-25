'use strict'

import router from './routes.js'
import userMsg from './user-msg.cmp.js'


new Vue({
    el: '#app',
    router,
    components: {
      userMsg
    }
  })