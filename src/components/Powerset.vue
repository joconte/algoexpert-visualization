<template>
    <div class="container">
        <BoxLikeAlgoExpert style="margin-top: 10px" height="70px" width="99vw" v-bind:center="true">
            <div class="chooseFiboNumber">
                <md-field md-clearable>
                    <label>Powerset :</label>
                    <md-input v-model="powersetInput" type="text" v-on:change="numberChanged = true"/>
                </md-field>
            </div>
            <div class="homeBox">
                <md-button class="md-icon-button" v-on:click="goBackHome()">
                    <md-icon>home</md-icon>
                </md-button>
            </div>
            <div class="commandeBox">
                <div class="commande">
                    <md-button class="md-icon-button" v-on:click="back()">
                        <md-icon>arrow_back_ios</md-icon>
                    </md-button>
                    <md-button v-if="canPlay" class="md-icon-button" v-on:click="play()">
                        <md-icon>play_arrow</md-icon>
                    </md-button>
                    <md-button v-if="canPause" class="md-icon-button" v-on:click="pause()">
                        <md-icon>pause</md-icon>
                    </md-button>
                    <md-button class="md-icon-button" v-on:click="next()">
                        <md-icon>arrow_forward_ios</md-icon>
                    </md-button>
                </div>
            </div>
        </BoxLikeAlgoExpert>
        <div class="memoAndVizWide">
            <BoxLikeAlgoExpert v-bind:height="'90vh'" v-bind:center="true"
                               v-bind:scrollable="true" id="treeBox">
                <div v-if="!displayHome">
                    <TreeChartCustom :json="treeData" :current-id-cell="currentIdCell" id="tree"/>
                </div>
                <div v-else class="homeFibo">
                    <codemirror
                            :value="content"
                            :options="cmOptions"
                            style="text-align: left; width: fit-content;"
                    />
                </div>
            </BoxLikeAlgoExpert>
        </div>
    </div>
</template>

<script>

    import BoxLikeAlgoExpert from "./BoxLikeAlgoExpert";
    import {router} from "../router";
    import '../assets/algoexpert.css'
    import TreeChartCustom from "./TreeChartCustom";

    export default {

        name: 'Powerset',
        components: {
            BoxLikeAlgoExpert,
            TreeChartCustom
        },
        data: function () {
            return {
                treeData: {},
                powersetInput: '123',
                path: [],
                memo: {},
                currentIdPath: 0,
                currentIdCell: 0,
                currentMemo: {},
                memoAsCode: '',
                canPause: false,
                canPlay: true,
                canResume: false,
                canGoBackward: false,
                canGoForward: true,
                displayHome: true,
                firstTime: true,
                paused: false,
                complete: false,
                windowWidth: window.innerWidth,
                windowHeight: window.innerHeight,
                numberChanged: false,
                content: 'function generatePowerset(string) {\n' +
                    '    const powerset = [];\n' +
                    '    generatePowersetHelper([], 0);\n' +
                    '\n' +
                    '    function generatePowersetHelper(path, index) {\n' +
                    '        powerset.push(path);\n' +
                    '        for (let i = index; i < string.length; i++) {\n' +
                    '            generatePowersetHelper([...path, string[i]], i + 1);\n' +
                    '        }\n' +
                    '        return;\n' +
                    '    }\n' +
                    '\n' +
                    '    return powerset;\n' +
                    '}',
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
                    readOnly: true
                    // more CodeMirror options...
                }
            };
        },
        mounted() {
            this.$nextTick(() => {
                window.addEventListener('resize', this.onResize);
            })
        },

        beforeDestroy() {
            window.removeEventListener('resize', this.onResize);
        },
        methods: {
            onResize() {
                this.windowWidth = window.innerWidth
                this.windowHeight = window.innerHeight
            },
            async initTree() {
                this.displayHome = false
                var tree = {}
                this.path = [];
                this.memo = {1: 1, 2: 1};
                await this.subsets(this.powersetInput, tree);
                this.currentIdPath = 0;
                this.treeData = this.path[this.currentIdPath]['tree'];
                //console.log('this.treeData')
                //console.log(this.treeData)
                //this.currentMemo = {1: 1, 2: 1};
                //this.updateMemoAsCode()
                this.currentIdCell = this.path[this.currentIdPath]['id'];

                await new Promise(resolve => {
                    setTimeout(resolve, 100)
                })

                var element = document.getElementById(this.currentIdCell);
                //var element = document.getElementsByClassName('active')[0];
                //console.log(element)

                //var VueScrollTo = require('vue-scrollto');

                var options = {
                    container: '#treeBox',
                    easing: 'ease-in',
                    offset: this.calculateOffset(),
                    force: true,
                    cancelable: true,
                    // eslint-disable-next-line no-unused-vars
                    onStart: function (element) {
                        // scrolling started
                        //console.log('scrolling start')
                    },
                    // eslint-disable-next-line no-unused-vars
                    onDone: function (element) {
                        // scrolling is done
                        //console.log('scrolling done')
                    },
                    onCancel: function () {
                        // scrolling has been interrupted
                        //console.log('scrolling canceled')
                    },
                    x: true,
                    y: true
                }

                this.$scrollTo(element, 300, options)
            },
            async back() {
                if (this.currentIdPath > 0) {
                    this.currentIdPath -= 1
                    this.treeData = this.path[this.currentIdPath]['tree']
                    //this.currentMemo = this.path[this.currentIdPath]['memo']
                    //this.updateMemoAsCode();
                    //console.log(this.treeData)
                    this.currentIdCell = this.path[this.currentIdPath]['id'];

                    await new Promise(resolve => {
                        setTimeout(resolve, 100)
                    })

                    var element = document.getElementById(this.currentIdCell);
                    //var element = document.getElementsByClassName('active')[0];
                    //console.log(element)

                    //var VueScrollTo = require('vue-scrollto');

                    var options = {
                        container: '#treeBox',
                        easing: 'ease-in',
                        offset: this.calculateOffset(),
                        force: true,
                        cancelable: true,
                        // eslint-disable-next-line no-unused-vars
                        onStart: function (element) {
                            // scrolling started
                            //console.log('scrolling start')
                        },
                        // eslint-disable-next-line no-unused-vars
                        onDone: function (element) {
                            // scrolling is done
                            //console.log('scrolling done')
                        },
                        onCancel: function () {
                            // scrolling has been interrupted
                            //console.log('scrolling canceled')
                        },
                        x: true,
                        y: true
                    }

                    this.$scrollTo(element, 300, options)
                }
            },
            async next() {

                if (!this.canGoForward) {
                    return;
                }

                if (this.firstTime || this.complete || this.numberChanged) {
                    this.firstTime = false
                    this.complete = false
                    this.numberChanged = false
                    await this.initTree();
                    return;
                }

                if (this.currentIdPath < this.path.length - 1) {
                    this.currentIdPath += 1
                    this.treeData = this.path[this.currentIdPath]['tree']
                    //this.currentMemo = this.path[this.currentIdPath]['memo']
                    //this.updateMemoAsCode();
                    //console.log(this.treeData)
                    this.currentIdCell = this.path[this.currentIdPath]['id'];

                    await new Promise(resolve => {
                        setTimeout(resolve, 100)
                    })

                    var element = document.getElementById(this.currentIdCell);
                    //var element = document.getElementsByClassName('active')[0];
                    //console.log(element)

                    //var VueScrollTo = require('vue-scrollto');

                    var options = {
                        container: '#treeBox',
                        easing: 'ease-in',
                        offset: this.calculateOffset(),
                        force: true,
                        cancelable: true,
                        // eslint-disable-next-line no-unused-vars
                        onStart: function (element) {
                            // scrolling started
                            //console.log('scrolling start')
                        },
                        // eslint-disable-next-line no-unused-vars
                        onDone: function (element) {
                            // scrolling is done
                            //console.log('scrolling done')
                        },
                        onCancel: function () {
                            // scrolling has been interrupted
                            //console.log('scrolling canceled')
                        },
                        x: true,
                        y: true
                    }

                    this.$scrollTo(element, 300, options)
                } else {
                    this.complete = true
                    this.displayHome = true
                }
            },
            calculateOffset() {
                var offset = 0
                if (this.windowWidth > 825) {
                    offset = this.treeData.left ? 200 * (this.windowWidth / 1200) : -200 * (this.windowWidth / 1200)
                }

                return offset
            },
            async play() {

                if (this.firstTime || this.complete || this.numberChanged || this.currentIdPath === this.path.length - 1) {
                    this.firstTime = false
                    this.canPause = true
                    this.complete = false
                    this.numberChanged = false
                    await this.initTree();
                }

                this.paused = false
                this.canPlay = false
                this.canPause = true
                await new Promise(resolve => {
                    setTimeout(resolve, 1000)
                })

                while (this.currentIdPath < this.path.length - 1 && !this.paused) {
                    this.next()
                    await new Promise(resolve => {
                        setTimeout(resolve, 1000)
                    })
                }
                if (!this.paused) {
                    this.canPause = false
                    this.canPlay = true
                }
            },
            pause() {
                this.canPause = false
                this.canPlay = true
                this.paused = true
            },
            updateMemoAsCode() {
                var memoAsCode = ''
                memoAsCode += 'memo = { \n'
                //console.log(this.currentMemo)
                for (var i = 0; i < Object.keys(this.currentMemo).length; i++) {
                    var key = Object.keys(this.currentMemo)[i]
                    //console.log('key: ' + key)
                    //console.log('this.currentMemo[key]: ' + this.currentMemo[key])
                    memoAsCode += `    ${key} : ${this.currentMemo[key]}, \n`
                }
                memoAsCode += '}'

                this.memoAsCode = memoAsCode
            },
            goBackHome() {
                router.push("/")
            },
            subsets(string, treeHere) {
                console.log('treeHere')
                console.log(treeHere)
                const powerset = [];
                var pathAlgo = []
                var content = this.content

                treeHere.currentLine = 0
                treeHere.val = '?';
                treeHere.id = 0
                treeHere.code = this.content
                treeHere.name = `Powerset(${string})`
                treeHere.debugMsg = `DEBUG: 'string': '${string}'`
                pathAlgo.push({
                    'id': treeHere.id,
                    'tree': JSON.parse(JSON.stringify(treeHere)),
                })

                treeHere.currentLine = 1
                treeHere.debugMsg = `DEBUG: 'string': '${string}'`
                pathAlgo.push({
                    'id': treeHere.id,
                    'tree': JSON.parse(JSON.stringify(treeHere)),
                })

                treeHere.currentLine = 2
                treeHere.debugMsg = `DEBUG: 'string': '${string}'`
                pathAlgo.push({
                    'id': treeHere.id,
                    'tree': JSON.parse(JSON.stringify(treeHere)),
                })

                treeHere.children = [
                    {
                        name: `generatePowerset([], 0)`,
                        code: content,
                    }]

                generatePowerset([], 0, treeHere, treeHere.children[0], {'val': 1});

                function generatePowerset(path, index, head, tree, order) {

                    console.log('tree')
                    console.log(tree)
                    tree.id = order.val
                    order.val += 1
                    tree.currentLine = 4
                    tree.name = `generatePowerset(${JSON.stringify(path)}, ${index})`
                    tree.debugMsg = `DEBUG: 'string': '${string}', 'index': ${index}, 'path': ${JSON.stringify(path)}, 'powerset': ${JSON.stringify(powerset)}`
                    pathAlgo.push({
                        'id': tree.id,
                        'tree': JSON.parse(JSON.stringify(head)),
                    })
                    tree.currentLine = 5
                    tree.debugMsg = `DEBUG: 'string': '${string}', 'index': ${index}, 'path': ${JSON.stringify(path)}, 'powerset': ${JSON.stringify(powerset)}`
                    pathAlgo.push({
                        'id': tree.id,
                        'tree': JSON.parse(JSON.stringify(head)),
                    })

                    powerset.push(path);

                    tree.currentLine = 6
                    tree.debugMsg = `DEBUG: 'string': '${string}', 'index': ${index}, 'path': ${JSON.stringify(path)}, 'powerset': ${JSON.stringify(powerset)}`
                    pathAlgo.push({
                        'id': tree.id,
                        'tree': JSON.parse(JSON.stringify(head)),
                    })
                    tree.children = []
                    for (let i = index; i < string.length; i++) {
                        tree.currentLine = 7
                        tree.debugMsg = `DEBUG: 'i' : ${i}, 'string': '${string}', 'index': ${index}, 'path': ${JSON.stringify(path)}, 'powerset': ${JSON.stringify(powerset)}`
                        tree.children.push(
                            {
                                name: `generatePowerset(${JSON.stringify([...path, string[i]])}, ${i + 1})`,
                                code: content,
                            })
                        pathAlgo.push({
                            'id': tree.id,
                            'tree': JSON.parse(JSON.stringify(head)),
                        })
                        generatePowerset([...path, string[i]], i + 1, head, tree.children[tree.children.length - 1], order);
                    }

                    tree.currentLine = 9
                    tree.debugMsg = `DEBUG: 'string': '${string}', 'index': ${index}, 'path': ${JSON.stringify(path)}, 'powerset': ${JSON.stringify(powerset)}`
                    pathAlgo.push({
                        'id': tree.id,
                        'tree': JSON.parse(JSON.stringify(head)),
                    })
                    return
                }

                treeHere.name = `Powerset(${string})`
                treeHere.val = powerset
                treeHere.currentLine = 12
                treeHere.debugMsg = `DEBUG: 'string': '${string}', 'powerset': ${JSON.stringify(powerset)}`
                pathAlgo.push({
                    'id': treeHere.id,
                    'tree': JSON.parse(JSON.stringify(treeHere)),
                })

                this.path = pathAlgo
                return powerset;
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

    .customNode {
        background-color: orange;
    }

    .treeBox {
        height: 800px;
        width: 800px;
        margin: auto;
        overflow: scroll;
        //overflow-x:hidden;
        border-radius: 4px;
        background-color: #001628;
    }

    .memoTable {
        height: 200px;
        width: 800px;
        margin: auto;
        overflow: scroll;
        border-width: 2px;
        border-color: black;
        border-style: solid;
    }

    .clickable {
        cursor: pointer;
    }

    .chooseFiboNumber {
        float: left;
        width: 35%;
        padding-left: 5px;
        padding-top: 5px;
        height: 70px;
    }

    .commandeBox {
        float: right;
        //width: 50%;
        //height: 70px;
        color: white;
    }

    .commande {
        text-align: center;
        padding-top: 15px;
    }

    .homeFibo {
        //width: fit-content;
        //margin: auto;
    }

    .memoAndVizWide {
        width: 99vw;
        margin-left: auto;
        margin-right: auto;
    }

    .memoAndVizTight {
        width: 99vw;
        margin-left: auto;
        margin-right: auto;
    }

    .homeBox {
        float: right;
        padding-top: 15px;
    }
</style>
