'use strict';
import keepService from '../../services/keep.service.js'
import keepList from './keep-list.cmp.js'
import keepSearch from './keep-search.cmp.js'

export default {
    template: `
    <section class="keep-app">
        <div class="keeps-actions-toolbar">    
            <button @click="addNew"><i class="fas fa-plus"></i></button>
            <keep-search @goSearch="goSearch"></keep-search>
            <router-link to="/keep">
            <h1><i class="fas fa-chess-board keep"></i> Miss Keep</h1>
                </router-link>
            
            
        </div>
        <keep-list  @deleteKeep="deleteKeep" @togglePinned="togglePinned" :keeps="keeps"></keep-list>
    </section>
    `,
    data() {
        return {
            keeps: [],
        }
    },
    methods: {
        addNew() {
            this.$router.push('/keep/edit')
        },
        goSearch(searchKey) {
            this.filterKeeps(searchKey)
        },
        deleteKeep(keepId) {
            keepService.deleteKeep(keepId)
                .then(res => this.filterKeeps())
        },
        togglePinned(keepId) {
            keepService.togglePinned(keepId)
                .then(res => this.filterKeeps())
        },
        filterKeeps(searchKey) {
            return keepService.filterKeeps(searchKey).then(keeps => {
                this.keeps = keeps
                this.$router.push('/keep')
            })
        }
    },
    created() {
        this.filterKeeps()
    },
    components: {
        keepList,
        keepSearch
    }

}