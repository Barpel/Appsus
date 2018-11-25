'use strict'
import storageService from './storage.service.js'
import utilService from './util.service.js'
export default {
    saveKeep,
    getKeepById,
    deleteKeep,
    filterKeeps,
    togglePinned
}

function filterKeeps(filterKey) {
    return getKeeps()
        .then(keeps => {
            var sortedKeeps = sortByPinned(keeps)
            if (!filterKey) {
                return sortedKeeps
            }
            else return sortedKeeps.filter(keep => {
                return (keep.title.toLowerCase().includes(filterKey.toLowerCase()) || keep.text.toLowerCase().includes(filterKey.toLowerCase()))
            })
        })
}
function sortByPinned(keeps) {
    var pinnedKeeps = keeps.filter(keep => {
        return keep.isPinned
    })
    var unPinnedKeeps = keeps.filter(keep => {
        return !keep.isPinned
    })
    return (pinnedKeeps.concat(unPinnedKeeps))
}

function getKeeps() {
    return storageService.load('keeps')
        .then(keeps => {
            if (!keeps || !keeps[0]) {
                keeps = createInitialKeeps()
                storageService.store('keeps', keeps)
                return keeps;
            }
            else return keeps;
        })
}


function getKeepById(keepId) {
    return getKeeps().then(keeps => {
        return keeps.find(keep => {
            return keep.id === keepId
        })
    })
}

function saveKeep(keep) {
    return getKeeps()
        .then(keeps => {
            if (keep.id) {
                var currKeepIdx = keeps.findIndex(currKeep => {
                    return currKeep.id === keep.id
                })
                keeps.splice(currKeepIdx, 1, keep)
            } else {
                keep.id = utilService.makeId()
                keeps.push(keep);
            }
            return storageService.store('keeps', keeps)
        })
}

function togglePinned(keepId) {
    return getKeeps()
        .then(keeps => {
            var keep = keeps.find(keep => {
                return keep.id === keepId
            })
            keep.isPinned = !keep.isPinned
            storageService.store('keeps', keeps)
        })
}

function deleteKeep(keepId) {
    return getKeeps()
        .then(keeps => {
            var currKeepIdx = keeps.findIndex(currKeep => {
                return currKeep.id === keepId
            })
            keeps.splice(currKeepIdx, 1)
            return storageService.store('keeps', keeps)
        })
}

function createInitialKeeps() {
    return [{
        title: 'Get started with Keeps',
        text: 'This is keeps, you can save here anything you\'d like. click on add a new keep to create keeps, or on existing keep to edit it. click on the little \'X\' to delete',
        id: '0000',
        bgColor: '#ffffff',
        isPinned: false,
        hasImg: false,
        imgSrc: null,
        isList: false,
        compType: 'keep-text'
    }, {
        title: 'Example Keep',
        text: 'This is an example Keep, you can add pics, notes or lists',
        id: '0001',
        bgColor: '#ffffff',
        isPinned: false,
        hasImg: false,
        imgSrc: null,
        isList: false,
        compType: 'keep-text'
    }]
}