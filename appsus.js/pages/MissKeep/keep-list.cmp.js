'use strict'
import keepPreview from './keep-preview.cmp.js'


export default {
    props: ['keeps'],
    template: `
    <section class="keeps-list-container">
        <ul>
            <keep-preview @click.native="editKeep(keep)" v-for="keep in keeps" :key="keep.id" :keep="keep"
            @deleteKeep="deleteKeep" @togglePinned="togglePinned">
            </keep-preview>
        </ul>
    </section>
    `,
    methods: {
        editKeep(keep) {
            var link = '/keep/edit/' +keep.id;
            this.$router.push(link)
        },
        deleteKeep(keepId) {
            this.$emit('deleteKeep', keepId)
        },
        togglePinned(keepId) {
            this.$emit('togglePinned', keepId)
        }
    },
    components: {
        keepPreview
    }

}