'use strict';

export default {
    props: ['emailForReply'],
    template: `
            <section class="reply">

                <div class="reply-background"></div>
                <form class="reply-container" @submit.prevent="saveEmail">
                        <button class="cancel-reply-btn" type="button" @click="cancelReply">Cancel</button>
                    <input type="text" class="reply-email-frpm" placeholder="To" v-model="email.reciever" ref="toInput">
                <input type="text" class="reply-email-to" placeholder="From" v-model="email.sender">
                <input type="text" class="reply-email-subject" placeholder="Subject" v-model="email.subject">
                
                <div class="reply-email-body">
                    <textarea  cols="43" rows="10" placeholder="Message body" v-model="email.body"></textarea>
                    <button class="send-reply-btn" type="submit">Send</button>
                </div>
            </form>
        </section>
        `,
    data() {
        return {
            email: Object.assign({},this.emailForReply)
        }
    },
    computed: {
        editSubject() {
            return this.email.subject = `Re: ${this.email.subject}`;
        }
    },
    created() {
        this.email.subject = this.editSubject;
    },
    mounted() {
        this.$refs.toInput.focus();
    },
    methods: {
        saveEmail() {
            this.$emit('saveEmail', this.email);
        },
        cancelReply() {
            this.$emit('cancelReply', this.email);
        }
    }

}