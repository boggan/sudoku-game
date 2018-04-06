<template>
    <div id="app">
        <h1>Sudoku Game!</h1>
        <span>man, this is NOT react ;)</span>
        <p>This took a LOT longer to setup than react, but I'm still gonna give it a go....</p>
        <Board :sheet="sheet" :solution="solution" :signature="signature" :showSolution="showSolution" />
        <button v-on:click="showSolution = !showSolution">
            <span v-if="showSolution">hide Solution</span>
            <span v-else>Show Solution</span>
        </button>
    </div>
</template>

<script>
import { SudokuGenerator } from "js-sudoku-generator";
import Board from "./components/Board";

SudokuGenerator.generate(1);
let l_aEasySheet = SudokuGenerator.generatedBoards[0].getSheet(0);

export default {
  name: "App",
  components: { Board },
  data: function() {
    return {
      sheet: l_aEasySheet,
      solution: SudokuGenerator.generatedBoards[0].board,
      signature: SudokuGenerator.generatedBoards[0].signature,
      showSolution: false
    };
  }
};
</script>

<style scoped>
#app {
  color: #01410a;
}
</style>


