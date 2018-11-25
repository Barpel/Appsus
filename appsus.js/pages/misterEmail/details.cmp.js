'use strict';

import emailService from './email.service.js'
import detailsToolbar from './details-toolbar.cmp.js'
import emailReply from './email-reply.cmp.js'
import eventBus, { USR_MSG_DISPLAY } from '../../services/event-bus.service.js'

export default {
    template: `
        <section class="email-details-container">
            <div class="email-details-header">
                <router-link to="/email">
                <h1><i class="fab fa-mailchimp"></i>&nbsp;Email Chimp</h1>
            </router-link>
        </div>
            <details-toolbar 
            @deleteEmail="deleteEmail"
            @markAsUnread="markAsUnread"
            @emailReply="emailReply"></details-toolbar>
            <h1 class="details-sender">{{email.sender}}</h1>

            <div class="details-subject">
                <h2 class="details-subject-txt">{{email.subject}}</h2>
                <h2 class="details-subject-sentAt" v-if="email.sentAt">{{email.sentAt.timeToShow}}</h2>
            </div>

            <div class="details-body-container">
                <p class="details-body-txt">{{email.body}}</p>
            </div>

            <div class="email-actions-container">
                <button class="email-reply-btn" @click="emailReply">Reply</button>
                <button class="email-delete-btn"
                @click="deleteEmail"><i class="fas fa-trash-alt"></i></button>
            </div>
            <email-reply v-if="isReplying" :emailForReply="email"
            @saveEmail="saveEmail" @cancelReply="cancelReply"></email-reply>
        </section>
    `,
    data() {
        return {
            email: {},
            isReplying: false,
        }
    },
    methods: {
        loadEmailData() {
            let emailId = this.$route.params.emailId;
            emailService.getEmailById(emailId)
                .then(email => {
                    this.email = email;
                    this.email.isRead = true;
                    emailService.saveEmail(this.email);
                    console.log(this.email);
                });
        },
        deleteEmail() {
            emailService.deleteEmail(this.email.id)
                .then(() => {
                    console.log('email deleted');
                    this.$router.push('/email');
                    // use bus service later
                })
        },
        markAsUnread() {
            this.email.isRead = false
            emailService.saveEmail(this.email)
                .then(() => {
                    // user msmg?
                })
        },
        emailReply() {
            this.isReplying = true;
        },

        cancelReply() {
            this.isReplying = false;
        },
        saveEmail(emailData) {
            this.email = emailData;
            emailService.saveEmail(this.email)
                .then(() => {
                    console.log('saved');
                    // this.$router.push(`/email/${this.email.id}`)
                    this.isReplying = false;
                    eventBus.$emit(USR_MSG_DISPLAY, { type: 'success', txt: 'Email Sent! (to yourself...)', link: `/email/${this.email.id}` });
                })
        }
    },
    created() {
        this.loadEmailData();
    },
    components: {
        detailsToolbar,
        emailReply,
    },
}