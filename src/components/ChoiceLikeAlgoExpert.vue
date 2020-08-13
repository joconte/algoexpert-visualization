<template>
    <div class="choiceLikeAlgoExpert">
        <div style="position: absolute; margin-left: 20px; height: 50px; color: black;
    font-weight: 600;
    font-size: 15px;
    margin-top: 15px;">
            <slot></slot>
        </div>
        <div style="float: right; height: 50px; background-color: #34ed43; box-shadow: 8px 0px 0px 0px #20ad2b; width: 30px; border-radius: 0px 10px 10px 0px"></div>
    </div>
</template>

<script>
    export default {
        name: "ChoiceLikeAlgoExpert"
    }
</script>

<style scoped>

    .choiceLikeAlgoExpert {
        width: 325px;
        height: 50px;
        border-radius: 10px;
        background-color: white;
        box-shadow: rgba(0, 0, 0, 0.2) 0px 1px 2px 0px;
        margin-top: 6px;
        cursor: pointer;
        font-family: Lato,Helvetica,Arial,sans-serif;
    }

    .choiceLikeAlgoExpert:hover {
        box-shadow: rgba(0, 0, 0, 1) 0px 1px 2px 0px;
    }
</style>
