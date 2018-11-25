import keepService from '../../services/keep.service.js'
import keepImg from './keep-img.cmp.js'
import keepText from './keep-text.cmp.js'
import keepTasks from './keep-tasks.cmp.js'
import keepToolbar from './keep-edit-toolbar.cmp.js'

export default {
    template: `
        <div ref="keepEditBox" class="flex column align-center keep-edit-container">
        <keep-toolbar v-if="doubleToolbar" @changeColor="changeColor" @toggleList="toggleList"
            @onImgAdd="onImgAdd" @saveKeep="saveKeep">
            </keep-toolbar>    
        <label class="keep-edit-title">
                <input v-model="keep.title" type="text" placeholder="Title">
            </label>
            <keep-img v-show = "keep.hasImg" :imgSrc = "keep.imgSrc"></keep-img>
            <!-- <component v-if= keep :is="keep.compType" :content="keep.text"</component> -->
            <keep-text v-if="!keep.isList" @contentChange=contentChange :content="keep.text"></keep-text>
            <keep-tasks v-if="keep.isList" @contentChange=contentChange :content="keep.text"></keep-tasks>
            <keep-toolbar @changeColor="changeColor" @toggleList="toggleList"
            @onImgAdd="onImgAdd" @saveKeep="saveKeep">
            </keep-toolbar>
            <!-- {{icon}} -->
            <!-- {{keep.isList}} -->
            <!-- {{textOrListIcon}} -->
        </div>
    `,
    data() {
        return {
            keep: {
                title: '',
                text: '',
                bgColor: '#ff0000',
                id: null,
                isPinned: false,
                hasImg: false,
                imgSrc: null,
                isList: false,
                compType: 'keep-text'
            },
            // icon: null,
            doubleToolbar:false,
        }
    },
    // computed: {
    //     textOrListIcon() {
    //         if(!this.keep.isList) this.icon = 'fas fa-align-center'
    //         if(this.keep.isList) this.icon = 'fas fa-list'
    //     }
    // },
    methods: {
        changeColor(color) {
            console.log('color:', color);
            this.keep.bgColor = color;
            var box = this.$refs.keepEditBox;
            box.style.backgroundColor = this.keep.bgColor
        },
        contentChange(content) {
            this.keep.text = content
            this.checkBodyHeight()
        },
        toggleList() {
            this.keep.isList = !this.keep.isList
            if (this.keep.isList) this.keep.compType = 'keep-tasks'
            // else this.keep.compType = 'keepText'
            this.checkBodyHeight()
        },
        saveKeep() {
            if (!this.keep.title && !this.keep.text) {
                this.$router.push('/keep')
                return
            }

            var keep = this.keep
            keepService.saveKeep(keep)
            this.$router.push('/keep')
        },
        getKeepById(keepId) {
            keepService.getKeepById(keepId)
                .then(keep => {
                    this.keep = keep
                })
        },
        onImgAdd(ev) {
            this.keep.hasImg = true;
            var keep = this.keep
            var file = ev.target.files[0]
            var reader = new FileReader();

            reader.addEventListener("load", function () {
                keep.imgSrc = reader.result;
            }, false);

            if (file) {
                reader.readAsDataURL(file);
            }
            this.checkBodyHeight()
        },
        checkBodyHeight() {
            console.log('active');
            
            var bodyHeight = document.body.offsetHeight
            var screenHeight = window.innerHeight
            if(bodyHeight > screenHeight + screenHeight/5) this.doubleToolbar = true;
            else this.doubleToolbar = false;
            console.log(this.doubleToolbar);
        }

    },
    created() {
        var keepId = this.$route.params.keepId;
        if (keepId) this.getKeepById(keepId)
        setTimeout(this.checkBodyHeight,0)
    },
    components: {
        keepImg,
        keepText,
        keepTasks,
        keepToolbar
    }
}
