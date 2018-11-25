'use strict';

export default {
    props:['readEmailsCount'],
    template: `
        <div class="email-status-container">
            <progress class="email-status-progress" :value="readEmailsCount" max="100"></progress>
            <span class="email-status-txt">Read: {{readEmailsCount}}%</span>
        </div>
        `,
}