<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <table v-if="treeData.name" style="margin-left: auto;
    margin-right: auto;">
        <tr>
            <td :colspan="Array.isArray(treeData.children) ? treeData.children.length * 2 : 1"
                :class="{parentLevel: Array.isArray(treeData.children) && treeData.children.length, extend: Array.isArray(treeData.children) && treeData.children.length && treeData.extend}"
            >
                <div :class="{node: true, hasMate: treeData.mate}"
                     :id="treeData.id" v-tooltip="{
      content: treeData.description,
      show: treeData.id === currentIdCell,
      trigger: 'manual',
      placement: 'top',
    }">

                    <div class="person"
                         :class="Array.isArray(treeData.class) ? treeData.class : []"
                         @click="$emit('click-node', treeData)"
                    >
                        <div class="wrapper">
                            <div class="avat"
                                 :class="{active: treeData.id !== undefined && treeData.id === currentIdCell}">
                                <codemirror
                                        v-bind:ref="'cmEditor-' + treeData.id"
                                        :value="treeData.code"
                                        :options="cmOptions"
                                        style="text-align: left; width: fit-content;"
                                        @ready="onCmReady"
                                        @focus="onCmFocus"
                                        @input="onCmCodeChange"
                                />
                            </div>
                            <div class="child">
                                <div class="name" v-if="treeData.val">{{treeData.name}} = {{treeData.val}}</div>
                                <div class="name" v-else>{{treeData.name}}</div>
                            </div>
                        </div>
                    </div>
                    <template v-if="Array.isArray(treeData.mate) && treeData.mate.length">
                        <div class="person" v-for="(mate, mateIndex) in treeData.mate" :key="treeData.name+mateIndex"
                             :class="Array.isArray(mate.class) ? mate.class : []"
                             @click="$emit('click-node', mate)"
                        >
                            <div class="avat">
                                <img :src="mate.image_url"/>
                            </div>
                            <div class="name">{{mate.name}}</div>
                        </div>
                    </template>
                </div>
                <div class="extend_handle" v-if="Array.isArray(treeData.children) && treeData.children.length"
                     @click="toggleExtend(treeData)"></div>
            </td>
        </tr>
        <tr v-if="Array.isArray(treeData.children) && treeData.children.length && treeData.extend">
            <td v-for="(children, index) in treeData.children" :key="index" colspan="2" class="childLevel">
                <TreeChartCustom :json="children" :current-id-cell="currentIdCell"
                                 @click-node="$emit('click-node', $event)"/>
            </td>
        </tr>
    </table>
</template>

<script>

    import 'codemirror/mode/javascript/javascript.js'
    import '../assets/algoexpert.css'
    import 'codemirror/addon/selection/active-line.js'

    export default {
        name: "TreeChartCustom",
        props: ["json", "currentIdCell"],
        data() {
            return {
                treeData: {},
                cmOptions: {
                    tabSize: 4,
                    styleActiveLine: false,
                    lineNumbers: true,
                    line: true,
                    foldGutter: true,
                    styleSelectedText: true,
                    mode: 'text/javascript',
                    matchBrackets: true,
                    showCursorWhenSelecting: true,
                    theme: "algoexpert",
                    readOnly: true,
                    widgetAdded: null
                    // more CodeMirror options...
                }
            }
        },
        watch: {
            json: {
                handler: function (Props) {
                    let extendKey = function (jsonData) {
                        jsonData.extend = (jsonData.extend === void 0 ? true : !!jsonData.extend);
                        if (Array.isArray(jsonData.children)) {
                            jsonData.children.forEach(c => {
                                extendKey(c)
                            })
                        }
                        return jsonData;
                    }
                    if (Props) {
                        this.treeData = extendKey(Props);
                    }
                },
                immediate: true
            },
            // eslint-disable-next-line no-unused-vars
            treeData: function (oldVal, val) {
                this.updateLineHighlight()
            }
        },
        methods: {
            toggleExtend: function (treeData) {
                treeData.extend = !treeData.extend;
                this.$forceUpdate();
            },
            // eslint-disable-next-line no-unused-vars
            onCmReady(cm) {
                //console.log('the editor is readied!', cm)
            },
            // eslint-disable-next-line no-unused-vars
            onCmFocus(cm) {
                //console.log('the editor is focused!', cm)
            },
            // eslint-disable-next-line no-unused-vars
            onCmCodeChange(newCode) {
                //console.log('this is new code', newCode)
                //this.code = newCode
            },
            updateLineHighlight() {
                if (this.codemirror) {
                    const lineCount = this.codemirror.lineCount()
                    if (this.widgetAdded) {
                        this.widgetAdded.clear()
                    }
                    for (let i = 0; i < lineCount; i++) {
                        this.codemirror.removeLineClass(i, 'wrap', 'customLine')
                    }
                    if (this.treeData.currentLine !== undefined) {
                        this.codemirror.addLineClass(this.treeData.currentLine, 'wrap', 'customLine')
                        var t = this.codemirror.charCoords({line: this.treeData.currentLine, ch: 0}, "local").top;
                        var middleHeight = this.codemirror.getScrollerElement().offsetHeight / 2;
                        this.codemirror.scrollTo(null, t - middleHeight - 5);

                        if (this.treeData.debugMsg) {
                            // create a node
                            var htmlNode = document.createElement("span");
                            var text = document.createTextNode(this.treeData.debugMsg);
                            htmlNode.appendChild(text)
                            htmlNode.className += "presentation";

                            this.widgetAdded = this.codemirror.addLineWidget(this.treeData.currentLine, htmlNode, {
                                above: true,
                                noHScroll: true
                            })
                        }
                    }
                }
            }
        },
        computed: {
            codemirror() {

                const ref = this.$refs['cmEditor-' + this.treeData.id]
                if (ref) {
                    return ref.codemirror
                }

                return null;
            }
        }
    }
</script>

<style scoped lang="scss">

    table {
        border-collapse: separate !important;
        border-spacing: 0 !important;
    }

    td {
        position: relative;
        vertical-align: top;
        padding: 0 0 50px 0;
        text-align: center;
    }

    .extend_handle {
        position: absolute;
        left: 50%;
        bottom: 30px;
        width: 10px;
        height: 10px;
        padding: 10px;
        transform: translate3d(-15px, 0, 0);
        cursor: pointer;
    }

    .extend_handle:before {
        content: "";
        display: block;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        border: 2px solid;
        border-color: #ccc #ccc transparent transparent;
        transform: rotateZ(135deg);
        transform-origin: 50% 50% 0;
        transition: transform ease 300ms;
    }

    .extend_handle:hover:before {
        border-color: #333 #333 transparent transparent;
    }

    .extend .extend_handle:before {
        transform: rotateZ(-45deg);
    }

    .extend::after {
        content: "";
        position: absolute;
        left: 50%;
        bottom: 15px;
        height: 15px;
        border-left: 2px solid #ccc;
        transform: translate3d(-1px, 0, 0)
    }

    .childLevel::before {
        content: "";
        position: absolute;
        left: 50%;
        bottom: 100%;
        height: 15px;
        border-left: 2px solid #ccc;
        transform: translate3d(-1px, 0, 0)
    }

    .childLevel::after {
        content: "";
        position: absolute;
        left: 0;
        right: 0;
        top: -15px;
        border-top: 2px solid #ccc;
    }

    .childLevel:first-child:before, .childLevel:last-child:before {
        display: none;
    }

    .childLevel:first-child:after {
        left: 50%;
        height: 15px;
        border: 2px solid;
        border-color: #ccc transparent transparent #ccc;
        border-radius: 6px 0 0 0;
        transform: translate3d(1px, 0, 0)
    }

    .childLevel:last-child:after {
        right: 50%;
        height: 15px;
        border: 2px solid;
        border-color: #ccc #ccc transparent transparent;
        border-radius: 0 6px 0 0;
        transform: translate3d(-1px, 0, 0)
    }

    .childLevel:first-child.childLevel:last-child::after {
        left: auto;
        border-radius: 0;
        border-color: transparent #ccc transparent transparent;
        transform: translate3d(1px, 0, 0)
    }

    .node {
        position: relative;
        display: inline-block;
        margin: 0 1em;
        box-sizing: border-box;
        text-align: center;
    }

    .node .person .avat {
        display: flex;
        width: max-content;
        height: max-content;
        margin: auto;
        overflow: hidden;
        box-sizing: border-box;
        text-align: initial;
        padding-left: 5px;
        padding-right: 5px;
    }

    .node .person .avat img {
        width: 100%;
        height: 100%;
    }

    .node .person .avat label {
        margin: auto;
    }

    .active {
        border-color: white !important;
        border-width: 2px;
        border-style: dotted;
    }

    .node .person .name {
        line-height: 2em;
    }

    .node .person .description {
        height: 2em;
        line-height: 2em;
        width: 8em;
    }

    .node.hasMate::after {
        content: "";
        position: absolute;
        left: 2em;
        right: 2em;
        top: 2em;
        border-top: 2px solid #ccc;
        z-index: 1;
    }

    .landscape {
        transform: translate(-100%, 0) rotate(-90deg);
        transform-origin: 100% 0;
    }

    .landscape .node {
        text-align: left;
        height: 8em;
        width: 8em;
    }

    .landscape .person {
        position: relative;
        transform: rotate(90deg);
        padding-left: 4.5em;
        height: 4em;
        top: 4em;
        left: -1em;
    }

    .landscape .person .avat {
        position: absolute;
        left: 0;
    }

    .landscape .person .name {
        height: 4em;
        line-height: 4em;
    }

    .landscape .hasMate {
        position: relative;
    }

    .landscape .hasMate .person {
        position: absolute;
    }

    .landscape .hasMate .person:first-child {
        left: auto;
        right: -4em;
    }

    .landscape .hasMate .person:last-child {
        left: -4em;
        margin-left: 0;
    }

    .javascript hljs {
        border-width: 2px;
        border-color: white;
        border-style: solid;
    }

    .child {
        display: flex;
    }

    .child div {
        flex-grow: 1;
        width: 0;
    }

    .wrapper {
        display: inline-block;
    }
</style>

<style>
    .customLine {
        background-color: rgba(235, 64, 52, 0.5);
    }

    .CodeMirror {
        height: auto !important;
    }
</style>
