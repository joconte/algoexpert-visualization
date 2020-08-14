<template>
    <div class="container">
        <BoxLikeAlgoExpert style="margin-top: 10px" height="70px" width="99vw" v-bind:center="true">
            <div class="chooseFiboNumber">
                <md-field md-clearable>
                    <label>Fibonacci number :</label>
                    <md-input v-model="number" type="number" v-on:change="numberChanged = true" />
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
        <div class="memoAndVizWide" v-if="windowWidth > 825">
            <BoxLikeAlgoExpert style="float: left; margin-right: 10px; padding: 10px" height="90vh" width="150px" v-bind:scrollable="true">
                <label>Memoization :</label>
                <codemirror
                        :value="memoAsCode"
                        :options="cmOptions"
                        style="text-align: left;"
                />
            </BoxLikeAlgoExpert>
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
        <div class="memoAndVizTight" v-else>
            <BoxLikeAlgoExpert v-bind:height="'70vh'" v-bind:center="true"
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
            <BoxLikeAlgoExpert style="padding: 10px" height="16vh" width="99vw" v-bind:center="true" v-bind:scrollable="true">
                <label>Memoization :</label>
                <codemirror
                        :value="memoAsCode"
                        :options="cmOptions"
                        style="text-align: left;"
                />
            </BoxLikeAlgoExpert>
        </div>
    </div>
</template>

<script>

    import TreeChartCustom from "./TreeChartCustom";
    import BoxLikeAlgoExpert from "./BoxLikeAlgoExpert";
    import {router} from "../router";
    import '../assets/algoexpert.css'

    export default {

        name: 'Fibonacci',
        components: {
            BoxLikeAlgoExpert,
            TreeChartCustom
        },
        data: function () {
            return {
                treeData: {},
                number: 5,
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
                content: 'function fibonacci(num, memo) {\n' +
                    '    if (memo[num]) return memo[num];\n' +
                    '\n' +
                    '    var fibo1 = fibonacci(num - 1, memo);\n' +
                    '    var fibo2 = fibonacci(num - 2, memo);\n' +
                    '    memo[num] = fibo1 + fibo2;\n' +
                    '\n' +
                    '    return memo[num];\n' +
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
            fibonacci(num, memo, head, tree, order, path, left) {

                tree.currentLine = 0
                tree.val = '?';
                tree.id = order.val
                tree.code = this.content
                tree.left = left
                tree.name = `Fibonacci(${num})`
                path.push({
                    'id': tree.id,
                    'display': true,
                    'tree': JSON.parse(JSON.stringify(head)),
                    'memo': JSON.parse(JSON.stringify(memo))
                })

                order.val += 1

                if (memo[num]) {
                    tree.name = `Fibonacci(${num})`
                    tree.description = 'Picked directly from memoization'
                    tree.val = memo[num];
                    tree.currentLine = 1
                    tree.debugMsg = `DEBUG: \n'num': ${num}, \n'memo': ${JSON.stringify(memo)}`
                    console.log(tree.debugMsg)

                    path.push({
                        'id': tree.id,
                        'tree': JSON.parse(JSON.stringify(head)),
                        'memo': JSON.parse(JSON.stringify(memo))
                    })
                    return memo[num];
                } else {
                    tree.currentLine = 1
                    tree.debugMsg = `DEBUG: \n'num': ${num}, \n'memo': ${JSON.stringify(memo)}`
                    path.push({
                        'id': tree.id,
                        'tree': JSON.parse(JSON.stringify(head)),
                        'memo': JSON.parse(JSON.stringify(memo))
                    })
                }

                tree.name = `Fibonacci(${num})`
                tree.description = `Let's compute Fibonacci(${num - 1}) and Fibonacci(${num - 2}) to find Fibonacci(${num})`
                tree.currentLine = 3
                tree.debugMsg = `DEBUG: \n'num': ${num}, \n'memo': ${JSON.stringify(memo)}`

                path.push({
                    'id': tree.id,
                    'tree': JSON.parse(JSON.stringify(head)),
                    'memo': JSON.parse(JSON.stringify(memo))
                })

                tree.children = [
                    {
                        name: `Fibonacci(${num - 1})`,
                        code: this.content,
                        val: '?'
                    },
                    {
                        name: `Fibonacci(${num - 2})`,
                        code: this.content,
                        val: '?'
                    }
                ];

                var fibo1 = this.fibonacci(num - 1, memo, head, tree.children[0], order, path, true);

                tree.currentLine = 4
                tree.debugMsg = `DEBUG: \n'fibo1': ${fibo1}, \n'num': ${num}, \n'memo': ${JSON.stringify(memo)}`
                tree.description = `We explored everything on the left side, we went back here. Now that we have Fibonacci(${num - 1}), let's go to the right side to find Fibonacci(${num - 2})`
                path.push({
                    'id': tree.id,
                    'tree': JSON.parse(JSON.stringify(head)),
                    'memo': JSON.parse(JSON.stringify(memo))
                })

                var fibo2 = this.fibonacci(num - 2, memo, head, tree.children[1], order, path, false);
                memo[num] = fibo1 + fibo2;

                tree.debugMsg = `DEBUG: \n'fibo2': ${fibo2}, \n'fibo1': ${fibo1}, \n'num': ${num}, \n'memo': ${JSON.stringify(memo)}`
                tree.currentLine = 5
                tree.description = `Now we set Fibonacci(${num}) = ${memo[num]} to memoization`
                tree.val = memo[num];

                path.push({
                    'id': tree.id,
                    'tree': JSON.parse(JSON.stringify(head)),
                    'memo': JSON.parse(JSON.stringify(memo))
                })

                tree.currentLine = 7
                tree.debugMsg = `DEBUG: \n'memo[num]': ${memo[num]}, \n'fibo2': ${fibo2}, \n'fibo1': ${fibo1}, \n'num': ${num}, \n'memo': ${JSON.stringify(memo)}`
                tree.description = `And we go back`

                path.push({
                    'id': tree.id,
                    'tree': JSON.parse(JSON.stringify(head)),
                    'memo': JSON.parse(JSON.stringify(memo))
                })

                return memo[num];
            },
            onResize() {
                this.windowWidth = window.innerWidth
                this.windowHeight = window.innerHeight
            },
            async initTree() {
                this.displayHome = false
                var tree = {}
                this.path = [];
                this.memo = {1: 1, 2: 1};
                await this.fibonacci(this.number, this.memo, tree, tree, {'val': 0}, this.path);
                this.currentIdPath = 0;
                this.treeData = this.path[this.currentIdPath]['tree'];
                //console.log('this.treeData')
                //console.log(this.treeData)
                this.currentMemo = {1: 1, 2: 1};
                this.updateMemoAsCode()
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
                    this.currentMemo = this.path[this.currentIdPath]['memo']
                    this.updateMemoAsCode();
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

                if (this.currentIdPath < this.path.length) {
                    this.currentIdPath += 1
                    this.treeData = this.path[this.currentIdPath]['tree']
                    this.currentMemo = this.path[this.currentIdPath]['memo']
                    this.updateMemoAsCode();
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
                if (this.currentIdPath >= this.path.length) {
                    this.complete = true
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

                if (this.firstTime || this.complete || this.numberChanged) {
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

                while (this.currentIdPath < this.path.length && !this.paused) {
                    this.next()
                    await new Promise(resolve => {
                        setTimeout(resolve, 1000)
                    })
                }
                if (this.currentIdPath >= this.path.length) {
                    this.canPause = false
                    this.canPlay = true
                    this.complete = true
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
