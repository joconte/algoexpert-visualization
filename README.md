# AlgoExpert SWE Project Contests Summer-Fall 2020 - Recursive Algorithms Visualization

This is my attempt for the AlgoExpert SWE Project Contest Summer-Fall 2020.
The goal is to help visualize recursive algorithms by drawing the recursive tree and showing variable values like in a debugger.

![alt text](https://raw.githubusercontent.com/joconte/algoexpert-visualization/master/public/home.png)

![alt text](https://raw.githubusercontent.com/joconte/algoexpert-visualization/master/public/run.png)

It currently have 3 algorithms : Fibonacci, Permutations, Powerset.
It's actually quiet easy to add other recursive algorithm but not yet fully generic.

I used Vue-Tree-Chart (https://github.com/tower1229/Vue-Tree-Chart) for the tree structure but I tweaked it a bit for my needs.
I used CodeMirror to display the code.
Finally I tried to give the website an AlgoExpert look.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Live
Live here : https://fibonacci-visualization.herokuapp.com/
