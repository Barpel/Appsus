'use strict';

export default {
    template: `
        <form class="email-filter-container" @submit.prevent="setFilter">
            <div class="tab">
                <input type="radio" id="all" :value="null" checked v-model="filter.isRead"/>
                <label for="all">All</label>
            </div>
            <div class="tab">
                <input type="radio" id="read" :value="true" v-model="filter.isRead" />
                <label for="read">Read</label>
            </div>
            <div class="tab">
                <input type="radio" id="unread" :value="false" v-model="filter.isRead" />
                <label for="unread">Unread</label>
            </div> 
        </form>
    `,
    data() {
        return {
            filter: {
                isRead: null,
            }
        }
    },
    methods: {
        setFilter() {
            this.$emit('setFilter', this.filter)
        }
    },
    watch: {
        'filter.isRead': function () {
            console.log('filter by:', this.filter);
            this.setFilter();
        },
        
    }
};