'use strict';

import emailService from './email.service.js';
import eventBus, {USR_MSG_DISPLAY} from '../../services/event-bus.service.js';

export default {
    template: `
    <section class="compose-email">
        <div class="compose-email-toolbar">
            <router-link to="/email"><i class="fas fa-arrow-circle-left"></i> Back</router-link>
            <router-link to="/email">
                <h1><i class="fab fa-mailchimp"></i>&nbsp;Email Chimp</h1>
            </router-link>
        </div>

        <form class="compose-email-container" @submit.prevent="sendEmail">
            <input type="text" class="compose-email-to" placeholder="To" v-model="email.reciever">
            <input type="text" class="compose-email-from" placeholder="From" v-model="email.sender">
            <input type="text" class="compose-email-subject" placeholder="Subject" v-model="email.subject">
            
            <div class="compose-email-body">
                <textarea  cols="43" rows="10" placeholder="Message body" v-model="email.body"></textarea>
            </div>
            <button class="send-email-btn" type="submit">Send</button>
        </form>
    </section>
    `,
    data() {
        return {
            email: {
                reciever: '',
                sender: '',
                subject: '',
                body: '',
            }
        }
    },
    methods: {
        sendEmail() {
            if(!this.email.reciever || !this.email.sender || !this.email.subject || !this.email.body) {
                // debugger;
                eventBus.$emit(USR_MSG_DISPLAY, { type: 'error', txt: 'Please fill in all the details'})
                return;
            }
            emailService.saveEmail(this.email)
                .then(() => {
                    // todo: display confirmation
                    this.$router.push('/email');
                })
        }
    },
}