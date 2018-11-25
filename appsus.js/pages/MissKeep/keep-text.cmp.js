'use strict'

export default {
    props: ['content'],
    template: `
        <div  class="keep-edit-text-container">
            <textarea @input="input" v-model="text" cols="30" rows="10" placeholder="Type in anything..." >{{content}}</textarea>
        </div>
    `,
    data() {
        return {
            text: this.content
        }
    },
    methods: {
        input() {
            this.$emit('contentChange', this.text)
        }
    },
}