<template>
    <div id="app">
        <h1>Sudoku Game!</h1>
        <Board :board="board"
               :signature="signature" 
               :showSolution="showSolution"
               :onCellNumberChanged="onCellNumberChanged"
               :onCellSelected="onCellSelected" />

        <CellPreview v-show="previewData"
                     :previewData="previewData" 
                     :onCellNumberChanged="onCellNumberChanged"
                     :onCellNoteChanged="onCellNoteChanged" />

        <button v-on:click="showSolution = !showSolution">
            <span v-if="showSolution">hide Solution</span>
            <span v-else>Show Solution</span>
        </button>
    </div>
</template>

<script>
import { SudokuGenerator } from "js-sudoku-generator";
import Board from "./components/Board";
import CellPreview from "./components/CellPreview";

//=============================================================================
function _findCellCoordinatesByKey(i_nCellId) {
  return {
    row: Math.floor(i_nCellId / 9),
    column: i_nCellId % 9
  };
}

//=============================================================================
// main module execution
//=============================================================================
const MAX_NOTES_LENGTH = 50;

SudokuGenerator.generate(1);

let l_aEasySheet = SudokuGenerator.generatedBoards[0].getSheet(0),
  l_aBoardData = JSON.parse(JSON.stringify(l_aEasySheet)),
  l_nRow,
  l_nColumn,
  l_bEditable,
  l_nId = 0;

// build cell data
for (l_nRow = 0; l_nRow < l_aBoardData.length; l_nRow++) {
  for (l_nColumn = 0; l_nColumn < l_aBoardData[l_nRow].length; l_nColumn++) {
    l_bEditable = String(l_aBoardData[l_nRow][l_nColumn]).trim() === "";
    l_aBoardData[l_nRow][l_nColumn] = {
      id: l_nId,
      editable: l_bEditable,
      solution: SudokuGenerator.generatedBoards[0].board[l_nRow][l_nColumn]
    };

    if (l_bEditable) {
      l_aBoardData[l_nRow][l_nColumn].answer = " ";
      l_aBoardData[l_nRow][l_nColumn].notes = "";
    }
    l_nId++;
  }
}

export default {
  name: "App",
  components: { Board, CellPreview },
  data: function() {
    return {
      board: l_aBoardData,
      signature: SudokuGenerator.generatedBoards[0].signature,
      showSolution: false,
      previewData: null
    };
  },
  methods: {
    onCellSelected: function(i_oCellData) {
      console.log("App::On Cell Selected received!", i_oCellData);
      this.previewData = i_oCellData;
    },
    onCellNumberChanged: function(i_nCellId, i_nNumber) {
      console.log("cell number changed ", i_nCellId, i_nNumber);
      let l_oCoordinates = _findCellCoordinatesByKey(i_nCellId);
      this.board[l_oCoordinates.row][l_oCoordinates.column].answer = i_nNumber;
      if (this.previewData) {
        this.previewData.inputValue = i_nNumber;
      }
    },
    onCellNoteChanged: function(i_nCellId, i_sNotes) {
      console.log("cell note changed ", i_nCellId);
      let l_oCoordinates = _findCellCoordinatesByKey(i_nCellId);
      this.board[l_oCoordinates.row][
        l_oCoordinates.column
      ].notes = i_sNotes.substr(0, MAX_NOTES_LENGTH);
      if (this.previewData) {
        this.previewData.notes = i_sNotes;
      }
    }
  }
};
</script>

<style scoped>
#app {
  position: relative;
  color: #01410a;
}
</style>


