'use strict';

export default {
    template: `
        <div class="details-toolbar">
            <button class="toolbar-back-btn" @click="backToList">
            <i class="fas fa-arrow-circle-left"></i>
            </button>
            <button class="toolbar-delete-btn" @click="deleteEmail"><i class="fas fa-trash-alt"></i></button>
            <button class="toolbar-mark-as-unread-btn" @click="markAsUnread">
                Mark as unread
            </button>
            <button class="toolbar-reply-btn" @click=emailReply>
                Reply
            </button>
        </div>
        `,

    methods: {
        backToList() {
            this.$router.push('/email');
        },
        deleteEmail() {
            this.$emit('deleteEmail');
        },
        markAsUnread() {
            this.$emit('markAsUnread');
            this.backToList();
        },
        emailReply() {
            this.$emit('emailReply');
        }

    }
}