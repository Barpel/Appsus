'use strict';
import eventBus, {USR_MSG_DISPLAY} from './services/event-bus.service.js';


export default {
    template: `
    <section class="user-msg" :class="msg.type">
        <h5>
            <button @click="closeMsg"><i class="far fa-times-circle"></i></button>
            {{msg.txt}}

            <router-link v-if="msg.link" :to="msg.link" >Check it out</router-link>
        </h5>
    </section>
    `,
    data() {
        return {
            msg: {
                txt: '',
                type: '',
            },
        }
    },
    created() {
        eventBus.$on(USR_MSG_DISPLAY, msg => {
            this.msg = msg;
            setTimeout(() => {
                this.msg = {txt: '', type: ''};
            }, 3000);
        })
    },
    methods: {
        closeMsg() {
            this.msg.type = '';
        }
    }
};