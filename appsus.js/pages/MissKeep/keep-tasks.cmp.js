'use strict'

export default {
    props: ['content'],
    template: `
        <div  class="keep-edit-tasks-container flex column align-center">
            <input @keyup.enter="changeContent" v-model="newTask" type="text" placeholder="Add a New Task...">
            <ul class="keep-task-ul">
                <li v-if="bugFixed" v-for="(task,idx) in tasks">
                    <div class="flex space-between">
                        <span class="keep-edit-tasks">{{task}}</span>
                            <div class="flex space-between align-center">
                                <span @click="deleteTask(idx)" class="keep-edit-btn keep-edit-task-dlt">&times;</span>    
                                <!-- <span @click="checkTask(idx)" class="keep-edit-btn keep-edit-task-check"><i class="fas fa-check"></i></span>     -->
                            </div>
                    </div>    
                </li>
            </ul>
            <span v-show="bugFix"> {{change}} </span>
        </div>
    `,
    data() {
        return {
            tasks: 'An Error has accured',
            bugFixed: false,
            newTask: ''
        }
    },
    computed: {
        change() {
            this.bugFixed = true;
            var test = this.content.split('\n')
            if(test[0]) {
                this.tasks = test
            } else this.tasks = []
        },
        bugFix() {
            return false;
        }
    },
    methods: {
        changeContent() {
            if(!this.tasks[0]) this.tasks[0] = this.newTask
            else this.tasks.push(this.newTask)
            this.newTask = ''
            this.$emit('contentChange', this.tasks.join('\n'))
        },
        // checkTask(taskIdx){
        //     this.tasks[taskIdx]
        //     this.$emit('contentChange', this.tasks.join('\n'))
        // },
        deleteTask(taskIdx) {
            this.tasks.splice(taskIdx, 1)
            this.$emit('contentChange', this.tasks.join('\n'))
        }
    }
}