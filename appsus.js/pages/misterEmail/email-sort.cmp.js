'use strict';

export default {
    template: `
    <div class="sort-emails-container">
        <span class="sort-emails-trigger" @mouseover="showSortOpts"
        @mouseout="hideSortOpts">
            Sort <i class="fas fa-sort"></i>
        </span>
        <div class="sort-opts" :class="toggleSortList" @mouseover="showSortOpts" @mouseout="hideSortOpts">
            <span class="sort-by-sent" @click="sort('date')"><i class="fas fa-user-clock"></i> Date</span>
            <span class="sort-by-title" @click="sort('title')"><i class="fas fa-signature"></i> Title</span>
        </div>
    </div>
    `,
    data() {
        return {
            showOpts: false,
        }
    },
    computed: {
        toggleSortList() {
            return {
                open: this.showOpts,
                closed: !this.showOpts,
            }
        }
    },
    methods: {
        showSortOpts() {
            this.showOpts = true;
        },
        hideSortOpts() {
            this.showOpts = false;
        },
        sort(sortParam) {
            this.$emit('sort', sortParam);
        }
    },
}