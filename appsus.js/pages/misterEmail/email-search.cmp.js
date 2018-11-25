'use strict';

export default {
    template: `
        <label>
            <input type="text" placeholder="Search Emails" v-model="searchParam" @input="searchEmails">
        </label>
    `,
    data() {
        return {
            searchParam: '',
        }
    },
    methods: {
        searchEmails() {
            this.$emit('searchEmail', this.searchParam);
        }
    }
}