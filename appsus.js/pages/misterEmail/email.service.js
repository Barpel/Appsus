'use strict';

import storageService from '../../services/storage.service.js';
import utilService from '../../services/util.service.js';

const KEY = 'emails';

export default {
    query,
    getEmailById,
    deleteEmail,
    saveEmail,
    searchEmails,
    sortEmails,
}


function query(filter = null) {
    return storageService.load(KEY)
        .then(emails => {
            if (!emails || !emails.length) {
                emails = createInitialEmails();
                storageService.store(KEY, emails);
            }
            // console.log('Emails:', emails);
            if (filter === null || filter.isRead === null) return emails;
            else return emails.filter(email => email.isRead === filter.isRead);
        })
}

function searchEmails(emails, searchParam) {
    var lowerCaseSearchParam = searchParam.toLowerCase();
    return emails.filter(email => {
        return email.sender.toLowerCase().includes(lowerCaseSearchParam) ||
            email.subject.toLowerCase().includes(lowerCaseSearchParam) ||
            email.body.toLowerCase().includes(lowerCaseSearchParam);
    })

}

function getEmailById(emailId) {
    return storageService.load(KEY)
        .then(emails => {
            return emails.find(email => email.id === emailId);
        })
}

function deleteEmail(emailId) {
    return storageService.load(KEY)
        .then(emails => {
            var emailIdx = emails.findIndex(email => email.id === emailId);
            emails.splice(emailIdx, 1);
            return storageService.store(KEY, emails);
        })
}

function saveEmail(email) {
    return storageService.load(KEY)
        .then(emails => {
            if (email.id) {
                var emailIdx = emails.findIndex(currEmail => currEmail.id === email.id);
                emails.splice(emailIdx, 1, email);
            } else {
                let newEmail = createEmail(email);
                emails.push(newEmail);
            }
            return storageService.store(KEY, emails);
        })
}

function createEmail(email) {
    return {
        sender: email.sender,
        reciever: email.reciever,
        id: utilService.makeId(),
        subject: email.subject,
        body: email.body,
        isRead: false,
        sentAt: {
            timeToShow: moment().format('MMMM Do YYYY, h:mm:ss a'),
            timestamp: Date.now()
        }
    }
}

function sortEmails(sortParam) {
    return storageService.load(KEY)
        .then(emails => {
            if (sortParam === 'date') {
                emails.sort((a, b) => {
                    if (a.sentAt.timestamp > b.sentAt.timestamp) return -1;
                    if (a.sentAt.timestamp < b.sentAt.timestamp) return 1;
                    return 0;
                })
            } else if (sortParam === 'title') {
                emails.sort((a, b) => {
                    if (a.subject < b.subject) return -1;
                    if (a.subject > b.subject) return 1;
                    return 0
                })
            }
            storageService.store(KEY, emails)
            return emails; 
        })
}


function createInitialEmails() {
    return [
        {
            sender: 'Jonas from EmailChimp',
            reciever: 'You',
            id: utilService.makeId(),
            subject: 'Welcome to EmailChimp!',
            body: 'We welcome you to EmailChimp, the new email service by Jonas and Bar. You\'re welcomed to enjoy it and contact your contacts right away!',
            isRead: false,
            sentAt: {
                timeToShow: moment('20170619', 'YYYYMMDD').fromNow(),
                timestamp: 1497853352,
            }
        },
        {
            sender: 'Bar from EmailChimp',
            id: utilService.makeId(),
            subject: 'How to get started with your new Email',
            body: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Qui nesciunt commodi odit amet tempora? Suscipit aut omnis possimus placeat, ipsa iusto maiores illum animi necessitatibus cupiditate ducimus enim, error impedit.',
            isRead: true,
            sentAt: {
                timeToShow: moment('20170620', 'YYYYMMDD').fromNow(),
                timestamp: 1497939752,
            }
        },
    ];
}

