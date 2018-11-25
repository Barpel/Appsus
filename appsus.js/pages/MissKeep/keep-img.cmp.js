'use strict'

export default {
    props:['imgSrc'],
    template: `
    <div class="keep-edit-img">
        <img :src="imgSrc">
    </div>
    `
}