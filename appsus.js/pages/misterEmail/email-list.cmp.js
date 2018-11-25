'use strict';

import emailPreview from './email-preview.cmp.js'

export default {
    props: ['emails'],
    template: `
        <section class="emails-container">
            <div v-for="currEmail in emails" :class="(currEmail.isRead)? 'read' : 'unread'">
                <email-preview :email="currEmail" 
                @click.native="selectEmail(currEmail.id)"
                ></email-preview>
                <button class="preview-delete-btn"
                @click="deleteEmail(currEmail.id)"><i class="fas fa-trash-alt"></i>
            </button>
            </div>
        </section>
        `,
    computed: {

    },
    methods: {
        selectEmail(emailId) {
            this.$router.push(`email/details/${emailId}`);
            console.log('email:', emailId);
        },
        deleteEmail(emailId) {
            this.$emit('deleteEmail', emailId);
        }
    },
    components: {
        emailPreview,
    },

}