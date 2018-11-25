'use strict';

import emailService from './email.service.js'
import emailFilter from './email-filter.cmp.js'
import emailList from './email-list.cmp.js'
import emailStatus from './email-status.cmp.js'
import emailSearch from './email-search.cmp.js'
import emailSort from './email-sort.cmp.js'
import eventBus, {USR_MSG_DISPLAY} from '../../services/event-bus.service.js'

export default {
    template: `
        <section class="email-app-container">
            <div class="email-actions-toolbar">
                <router-link to="/email">
                    <h1><i class="fab fa-mailchimp"></i>&nbsp;Email Chimp</h1>
                </router-link>
                <email-search @searchEmail="searchEmail"></email-search>
            </div>
            <div class="filter-sort-container">
                <email-filter @setFilter="setFilter"></email-filter>
                <email-sort @sort="sort"></email-sort>
                <button class="compose-email-btn" @click="composeEmail"><i class="fas fa-plus"></i></button>
            </div>
            <email-list :emails="emails" @deleteEmail="deleteMail"></email-list>
            <email-status :readEmailsCount="emailsRead"></email-status>
        </section>
    `,
    data() {
        return {
            emails: [],
            emailsRead: 0,
            filter: null,
        }
    },
    computed: {

    },
    created() {
        emailService.query()
            .then(emails => {
                this.emails = emails
                this.emailsRead = this.checkEmailStatus();
                eventBus.$emit(USR_MSG_DISPLAY, {type: 'welcome', txt: 'Welcome to your inbox!'})
            });
    },
    methods: {
        setFilter(filter) {
            this.filter = filter;
            emailService.query(filter)
                .then(emails => this.emails = emails);
        },
        checkEmailStatus() {
            let readCount = this.emails.filter(email => {
                return email.isRead
            }).length;
            return Math.floor(readCount / this.emails.length * 100);
        },
        composeEmail() {
            this.$router.push('/email/compose');
        },
        deleteMail(emailId) {
            emailService.deleteEmail(emailId)
                .then(() => {
                    emailService.query()
                        .then(emails => {
                            this.emails = emails;
                            this.$router.push('/email');
                        })
                })
        },
        searchEmail(searchParam) {
            emailService.query(this.filter)
                .then(emails => {
                    this.emails = emailService.searchEmails(emails, searchParam);
                })
        },
        sort(sortParam) {
            emailService.sortEmails(sortParam)
                .then(emails => {
                    this.emails = emails;
                    this.$router.push('/email');
                })
        }
    },
    components: {
        emailList,
        emailFilter,
        emailStatus,
        emailSearch,
        emailSort,
    }
}