<template>
    <div class="container">
        <BoxLikeAlgoExpert style="margin-top: 10px" height="70px" width="99vw" v-bind:center="true">
            <div class="choosePermutation">
                <md-field md-clearable>
                    <label>Permutations :</label>
                    <md-input v-model="permutInput" type="text" v-on:change="permutInputChanged = true"/>
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
            <BoxLikeAlgoExpert style="float: left; margin-right: 10px; padding: 10px" height="90vh" width="270px" v-bind:scrollable="true">
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
                <div v-else class="homePermut">
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
                <div v-else class="homePermut">
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
    import BoxLikeAlgoExpert from "./BoxLikeAlgoExpert";
    import TreeChartCustom from "./TreeChartCustom";
    import {router} from "../router";
    import '../assets/algoexpert.css'

    export default {
        name: "Permutations",
        components: {
            BoxLikeAlgoExpert,
            TreeChartCustom
        },
        data: function () {
            return {
                treeData: {},
                path: [],
                permutations: [],
                currentIdPath: 0,
                currentIdCell: 0,
                currentPermutations: [],
                permutInput: '123',
                permutInputChanged: false,
                permutationsAsCode: '',
                windowWidth: window.innerWidth,
                windowHeight: window.innerHeight,
                displayHome: true,
                canPause: false,
                canPlay: true,
                canResume: false,
                canGoBackward: false,
                canGoForward: true,
                firstTime: true,
                paused: false,
                complete: false,
                memo: {},
                currentMemo: {},
                memoAsCode: '',
                content: 'function permut(string, memo) {\n' +
                    '    if (string.length < 2) return string;\n' +
                    '    if (memo[string]) return memo[string];\n' +
                    '\n' +
                    '    var permutations = [];\n' +
                    '    for (var i = 0; i < string.length; i++) {\n' +
                    '        var char = string[i];\n' +
                    '\n' +
                    '        if (string.indexOf(char) !== i)\n' +
                    '            continue;\n' +
                    '\n' +
                    '        var remainingString = string.slice(0, i) + string.slice(i + 1, string.length);\n' +
                    '\n' +
                    '        for (var subPermutation of permut(remainingString, memo)) {\n' +
                    '            permutations.push(char + subPermutation)\n' +
                    '    }\n' +
                    '    memo[string] = permutations;\n' +
                    '    return permutations;\n' +
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
            }
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
            async play() {
                if (this.firstTime || this.complete || this.permutInputChanged) {
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
            async initTree() {
                this.displayHome = false
                var tree = {};
                this.path = [];
                this.memo = {}
                await this.permut(this.permutInput, this.memo, tree, tree, {'val': 0}, this.path);

                /*
                for (var permutation of permutations)
                    console.log(permutation)
*/
                this.currentIdPath = 0;
                this.treeData = this.path[this.currentIdPath]['tree'];
                //console.log(this.treeData)
                this.memoAsCode = {}
                this.updateMemoAsCode()
                this.currentIdCell = this.path[this.currentIdPath]['id'];
                //console.log(this.currentIdCell)
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
                    //offset: this.calculateOffset(),
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
                    //console.log(this.treeData)
                    this.currentMemo = this.path[this.currentIdPath]['memo']
                    this.updateMemoAsCode();
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
                        //offset: this.calculateOffset(),
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

                if (this.firstTime || this.complete || this.permutInputChanged) {
                    this.firstTime = false
                    this.complete = false
                    this.permutInputChanged = false
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
                        //offset: this.calculateOffset(),
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
            updateMemoAsCode() {
                var memoAsCode = ''
                memoAsCode += 'memo = { \n'
                //console.log(this.currentMemo)
                for (var i = 0; i < Object.keys(this.currentMemo).length; i++) {
                    var key = Object.keys(this.currentMemo)[i]
                    //console.log('key: ' + key)
                    //console.log('this.currentMemo[key]: ' + this.currentMemo[key])
                    memoAsCode += `    '${key}' : ['${this.currentMemo[key].join("', '")}'], \n`
                }
                memoAsCode += '}'

                this.memoAsCode = memoAsCode
            },
            permut(string, memo, head, tree, order, path) {

                tree.name = `Permutations(${string})`
                tree.val = '?';
                tree.id = order.val
                tree.code = this.content
                tree.currentLine = 0
                path.push({
                    'id': tree.id,
                    'tree': JSON.parse(JSON.stringify(head)),
                    'memo': JSON.parse(JSON.stringify(memo))
                })

                order.val += 1

                if (string.length < 2) {

                    tree.name = `Permutations(${string})`
                    tree.description = 'Our input string consists of only 1 character, so there is only one permutation possible : itself'
                    tree.val = string;
                    tree.currentLine = 1
                    tree.debugMsg = `DEBUG: 'string': '${string}'`
                    path.push({
                        'id': tree.id,
                        'tree': JSON.parse(JSON.stringify(head)),
                        'memo': JSON.parse(JSON.stringify(memo))
                    })
                    return string;
                } // This is our break condition
                else {
                    tree.currentLine = 1
                    tree.debugMsg = `DEBUG: 'string': '${string}'`
                    path.push({
                        'id': tree.id,
                        'tree': JSON.parse(JSON.stringify(head)),
                        'memo': JSON.parse(JSON.stringify(memo))
                    })
                }

                if (memo[string]) {
                    tree.description = `Picked directly from memoization`
                    tree.val = memo[string]
                    tree.currentLine = 2
                    tree.debugMsg = `DEBUG: 'string': '${string}', 'memo': '${memo}'`
                    path.push({
                        'id': tree.id,
                        'tree': JSON.parse(JSON.stringify(head)),
                        'memo': JSON.parse(JSON.stringify(memo))
                    })
                    return memo[string]
                } else {
                    tree.currentLine = 2
                    tree.debugMsg = `DEBUG: 'string': '${string}', 'memo': '${JSON.stringify(memo)}'`
                    path.push({
                        'id': tree.id,
                        'tree': JSON.parse(JSON.stringify(head)),
                        'memo': JSON.parse(JSON.stringify(memo))
                    })
                }

                tree.children = []
                var permutations = []; // This array will hold our permutations


                for (var i = 0; i < string.length; i++) {

                    var char = string[i];

                    tree.description = `For each character in our input string, we remove it and we compute the permutations of the remaining strings.
                    Here our character is '${char}'`

                    tree.currentLine = 5
                    tree.debugMsg = `DEBUG: 'i': ${i}, 'string': '${string}'`
                    path.push({
                        'id': tree.id,
                        'tree': JSON.parse(JSON.stringify(head)),
                        'memo': JSON.parse(JSON.stringify(memo))
                    })
                    tree.currentLine = 6
                    tree.debugMsg = `DEBUG: 'i': ${i}, 'string': '${string}', 'char': '${char}'`
                    path.push({
                        'id': tree.id,
                        'tree': JSON.parse(JSON.stringify(head)),
                        'memo': JSON.parse(JSON.stringify(memo))
                    })

                    tree.currentLine = 8
                    tree.debugMsg = `DEBUG: 'string': '${string}', 'char': '${char}', 'i': ${i}`
                    path.push({
                        'id': tree.id,
                        'tree': JSON.parse(JSON.stringify(head)),
                        'memo': JSON.parse(JSON.stringify(memo))
                    })
                    // Cause we don't want any duplicates:
                    if (string.indexOf(char) !== i) { // if char was used already
                        tree.currentLine = 9
                        tree.debugMsg = `DEBUG: 'string': '${string}', 'char': '${char}', 'i': ${i}`
                        path.push({
                            'id': tree.id,
                            'tree': JSON.parse(JSON.stringify(head)),
                            'memo': JSON.parse(JSON.stringify(memo))
                        })
                        continue; // skip it this time
                    }

                    var remainingString = string.slice(0, i) + string.slice(i + 1, string.length); //Note: you can concat Strings via '+' in JS

                    tree.currentLine = 11
                    tree.description = `char = '${char}', remainingString = '${remainingString}'`
                    tree.debugMsg = `DEBUG: 'i': ${i}, 'string': '${string}', 'char': '${char}', 'remainingString': '${remainingString}'`
                    path.push({
                        'id': tree.id,
                        'tree': JSON.parse(JSON.stringify(head)),
                        'memo': JSON.parse(JSON.stringify(memo))
                    })

                    tree.currentLine = 13
                    tree.description = `We will compute the permutations of 'remainingString': '${remainingString}'`
                    tree.debugMsg = `DEBUG: 'i': ${i}, 'string': '${string}', 'char': '${char}', 'remainingString': '${remainingString}'`
                    path.push({
                        'id': tree.id,
                        'tree': JSON.parse(JSON.stringify(head)),
                        'memo': JSON.parse(JSON.stringify(memo))
                    })

                    tree.children.push(
                        {
                            name: `Permutations(${remainingString})`,
                            code: this.content,
                            val: '?'
                        }
                    );
                    path.push({
                        'id': tree.id,
                        'tree': JSON.parse(JSON.stringify(head)),
                        'memo': JSON.parse(JSON.stringify(memo))
                    })
                    var subPermutations = this.permut(remainingString, memo, head, tree.children[i], order, path);

                    let subPermutationsStr = ''
                    if ((typeof subPermutations) === 'string') {
                        subPermutationsStr = subPermutations
                    } else if ((typeof subPermutations) === 'object') {
                        subPermutationsStr = subPermutations.join("', '")
                    }
                    tree.currentLine = 13
                    tree.description = `Got the permutations of 'remainingString'(${remainingString}) : ['${subPermutations}']`
                    tree.debugMsg = `DEBUG: 'permut(remainingString)': ['${subPermutationsStr}']`
                    path.push({
                        'id': tree.id,
                        'tree': JSON.parse(JSON.stringify(head)),
                        'memo': JSON.parse(JSON.stringify(memo))
                    })
                    for (var subPermutation of subPermutations) {
                        permutations.push(char + subPermutation)
                        tree.currentLine = 14
                        tree.description = `We add our char '${char}' to each sub permutation : '${char}' + '${subPermutation}'`
                        tree.val = permutations
                        tree.debugMsg = `DEBUG: 'char': ${char}, 'subPermutation': '${subPermutation}'`
                        path.push({
                            'id': tree.id,
                            'tree': JSON.parse(JSON.stringify(head)),
                            'memo': JSON.parse(JSON.stringify(memo))
                        })
                    }
                }

                memo[string] = permutations;

                tree.currentLine = 16
                tree.description = `We finished computing the permutations for '${string}', we add it to 'memo'.`
                tree.debugMsg = `DEBUG: 'permutations': ['${permutations.join("', '")}']`
                path.push({
                    'id': tree.id,
                    'tree': JSON.parse(JSON.stringify(head)),
                    'memo': JSON.parse(JSON.stringify(memo))
                })

                tree.currentLine = 17
                tree.description = `We finished computing the permutations for '${string}', we return it : ['${permutations.join("', '")}']`
                tree.debugMsg = `DEBUG: 'permutations': ['${permutations.join("', '")}']`
                path.push({
                    'id': tree.id,
                    'tree': JSON.parse(JSON.stringify(head)),
                    'memo': JSON.parse(JSON.stringify(memo))
                })

                return permutations;
            },
            pause() {
                this.canPause = false
                this.canPlay = true
                this.paused = true
            },
            goBackHome() {
                router.push("/")
            }
        }
    }
</script>

<style scoped lang="scss">

    .choosePermutation {
        float: left;
        width: 35%;
        padding-left: 5px;
        padding-top: 5px;
        height: 70px;
    }

    .homeBox {
        float: right;
        padding-top: 15px;
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

    .homePermut {
        /*
        width: fit-content;
        margin: auto;*/
    }

</style>
