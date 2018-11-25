'use strict'

export default {
    template: `
    <label>
    <input @input="goSearch" v-model="searchKey" type="text" placeholder="Search Keeps... ">
    </label>
    `,
    data() {
        return {
            searchKey: '',
        }
    },
    methods: {
        goSearch() {
            this.$emit('goSearch', this.searchKey)
        }
    }
}