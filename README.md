# AlgoExpert SWE Project Contests Summer-Fall 2020 - Recursive Algorithms Visualization

The goal is to help visualize recursive algorithms by drawing the recursive calls as a tree and showing variable values like in a debugger.
It currently have 3 algorithms : Fibonacci, Permutations, Powerset.
It's currently quiet easy to add other recursive algorithm but it's not yet fully generic.

I used Vue-Tree-Chart (https://github.com/tower1229/Vue-Tree-Chart) for the tree structure but I tweaked it a bit for my needs.
I used CodeMirror (https://codemirror.net) to display the code.
Finally I tried to give the website an AlgoExpert look.

![alt text](https://raw.githubusercontent.com/joconte/algoexpert-visualization/master/public/home.png)

![alt text](https://raw.githubusercontent.com/joconte/algoexpert-visualization/master/public/run.png)

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
