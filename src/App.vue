<template>
    <div id="app">
        <h1 class="title">Sudoku</h1>

        <div ref="difficulty-control">
          <h3>Choose Difficulty</h3>
          <button @click="setDifficulty(0)">easy</button>
          <button @click="setDifficulty(1)">medium</button>
          <button @click="setDifficulty(2)">hard</button>
        </div>

        <div v-if="board.length > 0"
             :class="{'fade-in': board.length > 0}"
             ref="board-container">

          <Board :board="board"
                :signature="signature" 
                :showSolution="showSolution"
                :onCellNumberChanged="onCellNumberChanged"
                :onCellSelected="onCellSelected">

            <CellPreview  v-show="previewData"
                          v-on:close-preview="onClosePreview"
                          :previewData="previewData" 
                          :onCellNumberChanged="onCellNumberChanged"
                          :onCellNoteChanged="onCellNoteChanged" />
          </board>

          <div class="ctrl-buttons"
              v-if="board.length > 0">
            <button @click="showSolution = !showSolution">
                <span v-if="showSolution">hide Solution</span>
                <span v-else>Show Solution</span>
            </button>

            <button @click="validateSheet">validate sheet</button>
            <button @click="onNewSheetClicked">get new sheet</button>
            <div>
              <span>Number of tries: {{nbTries}}</span>
            </div>
          </div>
        </div> <!-- end anim container -->
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

//=============================================================================
function _buildNewBoard(i_nDifficulty) {
  let l_aBoards = SudokuGenerator.generate(1),
    l_aPlaySheet = l_aBoards[0].getSheet(i_nDifficulty),
    l_aBoardData = JSON.parse(JSON.stringify(l_aPlaySheet)),
    l_nRow,
    l_nColumn,
    l_bEditable,
    l_nId = 0,
    l_oCell;

  // build cell data
  for (l_nRow = 0; l_nRow < l_aBoardData.length; l_nRow++) {
    for (l_nColumn = 0; l_nColumn < l_aBoardData[l_nRow].length; l_nColumn++) {
      l_bEditable = String(l_aBoardData[l_nRow][l_nColumn]).trim() === "";
      l_oCell = {
        id: l_nId,
        editable: l_bEditable,
        solution: SudokuGenerator.generatedBoards[0].board[l_nRow][l_nColumn]
      };

      if (l_bEditable) {
        l_oCell.isWrong = false;
        l_oCell.answer = " ";
        l_oCell.notes = "";
      }
      l_aBoardData[l_nRow][l_nColumn] = l_oCell;
      l_nId++;
    }
  }

  return {
    board: l_aBoardData,
    signature: SudokuGenerator.generatedBoards[0].signature
  };
}

//=============================================================================
// COMPONENT MODULE
//=============================================================================
export default {
  name: "App",
  components: { Board, CellPreview },
  data: function () {
    return {
      board: [],
      signature: "",
      showSolution: false,
      previewData: null,
      difficulty: -1,
      nbTries: 0
    };
  },
  created: function () {
    // this.buildNewBoard();
  },
  methods: {
    onNewSheetClicked: function () {
      let l_oBoardContainer = this.$refs['board-container'],
        l_oDifficultyControl = this.$refs['difficulty-control'],
        l_fnOnAnimationEnded = () => {
          l_oBoardContainer.removeEventListener("animationend", l_fnOnAnimationEnded);
          // on animation ended, 
          // reset board
          // fade-in difficulty control
          this.board.length = 0;
          this.signature = "";
          this.showSolution = false;
          this.previewData = null;
          this.difficulty = -1;
          this.nbTries = 0;
          l_oDifficultyControl.classList.remove("fade-out", "hidden");
          l_oDifficultyControl.classList.add("fade-in");
        };

      l_oBoardContainer.addEventListener("animationend", l_fnOnAnimationEnded);
      l_oBoardContainer.classList.add("fade-out");
    },
    buildNewBoard: function (i_nDifficulty) {
      let l_oBoardData = _buildNewBoard(i_nDifficulty);
      this.board = l_oBoardData.board;
      this.signature = l_oBoardData.signature;
      this.nbTries = 0;
      this.previewData = null;
      this.showSolution = false;
    },

    validateSheet: function () {
      this.nbTries++;
      this.previewData = null;

      // compare board to solution
      let l_nRow,
        l_nColumn,
        l_oCell,
        l_bErrorFound = false,
        l_nNbErrorsDetected = 0;

      for (l_nRow = 0; l_nRow < this.board.length; l_nRow++) {
        for (l_nColumn = 0; l_nColumn < this.board[l_nRow].length; l_nColumn++) {
          l_oCell = this.board[l_nRow][l_nColumn];
          if (!l_oCell.editable) {
            continue;
          }
          l_bErrorFound = l_oCell.answer !== l_oCell.solution;
          this.board[l_nRow][l_nColumn].isWrong = l_bErrorFound;
          l_nNbErrorsDetected++;
        }
      }

      if (l_nNbErrorsDetected === 0) {
        console.log("*** SUCCESS! ***");
        this.showSolution = true;
      }
      else {
        this.$forceUpdate();
      }
    },

    onCellSelected: function (i_oCellData) {
      this.previewData = i_oCellData;
    },
    onCellNumberChanged: function (i_nCellId, i_nNumber) {
      let l_oCoordinates = _findCellCoordinatesByKey(i_nCellId);
      this.board[l_oCoordinates.row][l_oCoordinates.column].answer = i_nNumber;
      if (this.previewData) {
        this.previewData.inputValue = i_nNumber;
      }
    },
    onCellNoteChanged: function (i_nCellId, i_sNotes) {
      let l_oCoordinates = _findCellCoordinatesByKey(i_nCellId);
      this.board[l_oCoordinates.row][l_oCoordinates.column].notes = i_sNotes.substr(0, MAX_NOTES_LENGTH);
      if (this.previewData) {
        this.previewData.notes = i_sNotes;
      }
    },
    onClosePreview: function () {
      this.previewData = null;
    },

    setDifficulty: function (i_nDifficulty) {
      this.difficulty = i_nDifficulty;
      let l_oDOMRef = this.$refs['difficulty-control'],
        l_fnOnAnimationEnded = () => {
          l_oDOMRef.classList.add("hidden");
          this.onDifficultyChosen();
          l_oDOMRef.removeEventListener("animationend", l_fnOnAnimationEnded);
        };
      l_oDOMRef.addEventListener("animationend", l_fnOnAnimationEnded);
      l_oDOMRef.classList.add("fade-out");
    },

    onDifficultyChosen: function () {
      // on animation ended
      this.buildNewBoard(this.difficulty);
    }
  }
};
</script>

<style scoped>
.title {
  padding-left: 16px;
}
#app {
  position: relative;
  /* color: #01410a; */
  text-align: center;
}

.hidden {
  display: none;
}

.fade-in {
  animation: fadein 1s;
  opacity: 1;
}

.fade-out {
  animation: fadeout 1s;
  opacity: 0;
}

@keyframes fadein {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

@keyframes fadeout {
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
    display: none;
  }
}
</style>


