export default {
    props: [],
    template: `
    <nav class="keep-edit-nav">
        <router-link class="keep-edit-btn" to="/keep"><i class="far fa-arrow-alt-circle-left"></i></i></router-link>
        <label class="keeps-custom-colorPicker"><i class="fas fa-palette"></i>
            <input @change="changeColor" type="color" v-model="bgColor">
        </label>
        <button class="keep-edit-btn" @click="toggleList"><i class="fas fa-list"></i></button>
        <label class="keeps-custom-upload"><i class="fas fa-image"></i>
            <input type="file" ref="imgAdd" @change="onImgAdd">
        </label>
        <button class="keep-edit-btn" @click="saveKeep"><i class="fas fa-save"></i></button>
    </nav>
        `,
    data() {
        return {
            bgColor: '#ffffff'
       }
    },
    methods: {
        changeColor() {
            this.$emit('changeColor', this.bgColor)
        },
        toggleList(){
            this.$emit('toggleList')
        },
        onImgAdd(ev) {
            console.log(ev);
            this.$emit('onImgAdd', ev)
            
        },
        saveKeep() {
            this.$emit('saveKeep')
        }
    }
}