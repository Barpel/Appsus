'use strict'

export default {
    props: ['keep'],
    template: `
    <li ref="keepPreviewBox" class="flex column keep-preview-container" :class="isPinned">
        <div class="flex space-between">
            <h4>{{keep.title}}</h4>
            <div class="keep-preview-btn-container flex">
                <div @click.stop="deleteKeep" class="keep-preview-btn"><i class="far fa-times-circle"></i></div>    
                <div @click.stop="togglePinned" class="keep-preview-btn"><i class="fas fa-thumbtack"></i></div>    
            </div>
        </div>
        <div>
            <img class="keep-preview-img" v-show="keep.hasImg" :src="keep.imgSrc"/>
        </div>
        <pre class="keep-preview-text keep-preview-content-wrapper" v-if="!keep.isList">{{keep.text}}</pre>
        <ul>
            <li class="keep-preview-task keep-preview-content-wrapper" v-if="keep.isList" v-for="task in textAsTasks"> {{task}} </li>
        </ul>
    </li>
    `,
    data() {
        return {
            textAsTasks: this.keep.text.split('\n')
        }
    },
    computed: {
        isPinned() {
            return {
                'keep-pinned': this.keep.isPinned,
                'keep-regular': !this.keep.isPinned
            }
        },
    },
    methods: {
        deleteKeep() {
            this.$emit('deleteKeep', this.keep.id)
            
        },
        togglePinned() {
            this.$emit('togglePinned', this.keep.id)
        }
    },
    mounted() {
        this.$refs.keepPreviewBox.style.backgroundColor = this.keep.bgColor
    }
}