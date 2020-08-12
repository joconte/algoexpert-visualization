<template>
    <div class="boxLikeAlgoExpert" v-bind:style="{
    'max-width': maxWidth,
    'max-height': maxHeight,
    'min-width': minWidth,
    'min-height': minHeight,
    'height': height,
    'width': width,
    'margin-left': center ? 'auto' : '',
    'margin-right': center ? 'auto' : '',
    'overflow': scrollable ? 'scroll' : ''
    }">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "BoxLikeAlgoExpert",
        props: {
            minHeight: String,
            minWidth: String,
            maxHeight: String,
            maxWidth: String,
            height: String,
            width: String,
            center: Boolean,
            scrollable: Boolean
        },
        mounted: function () {
            if (this.center && !this.width) {
                console.warn('You need to set the width to center the box !')
            }
        }
    }
</script>

<style scoped lang="scss">

    .boxLikeAlgoExpert {
        border-radius: 4px;
        background-color: #001628;
        //margin-top: 10px;
        margin-bottom: 10px;
        font-weight: 600;
        font-size: 14px;
    }
</style>
