# sudoku-game

Play a web based game of Sudoku! :) This version has been built with the [Vuejs](https://vuejs.org/) framework.

# usage

copy the contents of the "dist" folder anywhere and open up index.html 

# build instructions

## dependencies
- nodejs

## install dependencies

```
npm install
```

## build commands

### Production build
```
webpack --config webpack.prod.js
```

### Development build
```
webpack --config webpack.dev.js
```

built code ends up in the "dist" folder for production, and "dist/debug" for development