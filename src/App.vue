<template>
    <div id="app">
        <h1 class="title">Sudoku</h1>

        <div v-if="board.length > 0"
             class="preview-switch">
          <SwitchToggle :checked="previewEnabled"
                        :onChange="onPreviewToggled"
                        label="Enable Preview: " />
        </div>
        
        <DifficultyControl ref="difficulty-control"
                           :onChange="setDifficulty" />

        <div v-if="board.length > 0"
             :class="{'fade-in': board.length > 0}"
             ref="board-container">

          <Board :board="board"
                :signature="signature" 
                :showSolution="showSolution"
                :onCellNumberChanged="onCellNumberChanged"
                :onCellSelected="onCellSelected">

            <Congratulations  v-if="showSolution" 
                              slot="celebration" />

            <CellPreview  v-show="previewData && previewEnabled"
                          v-on:close-preview="onClosePreview"
                          :previewData="previewData" 
                          :onCellNumberChanged="onCellNumberChanged"
                          :onCellNoteChanged="onCellNoteChanged" />
          </board>

          <div class="ctrl-buttons"
              v-if="board.length > 0">

            <button v-if="!showSolution"
                    @click="validateSheet">validate</button>
            <button @click="onNewSheetClicked">new sheet</button>

            <div>
              <span>Number of tries: {{nbTries}}</span>
            </div>
          </div>
        </div> <!-- end anim container -->
    </div>
</template>

<script>
import { SudokuGenerator } from "js-sudoku-generator";
import Congratulations from "./components/Congratulations";
import Board from "./components/Board";
import CellPreview from "./components/CellPreview";
import SwitchToggle from "./components/SwitchToggle";
import DifficultyControl from "./components/DifficultyControl";

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
  components: { Board, CellPreview, SwitchToggle, DifficultyControl, Congratulations },
  data: function () {
    return {
      board: [],
      signature: "",
      showSolution: false,
      previewEnabled: true,
      previewData: null,
      difficulty: -1,
      nbTries: 0
    };
  },
  created: function () {
    // this.buildNewBoard();
  },
  methods: {
    //=============================================================================
    onPreviewToggled: function (i_bEnabled) {
      this.previewEnabled = i_bEnabled;
    },

    //=============================================================================
    onNewSheetClicked: function () {
      let l_oBoardContainer = this.$refs['board-container'],
        l_oDifficultyControl = this.$refs['difficulty-control'],
        l_fnOnAnimationEnded = () => {
          l_oBoardContainer.removeEventListener("animationend", l_fnOnAnimationEnded);
          this.board.length = 0;
          this.signature = "";
          this.showSolution = false;
          this.previewData = null;
          this.difficulty = -1;
          this.nbTries = 0;
          l_oDifficultyControl.show();
        };

      l_oBoardContainer.addEventListener("animationend", l_fnOnAnimationEnded);
      l_oBoardContainer.classList.add("fade-out");
    },

    //=============================================================================
    buildNewBoard: function (i_nDifficulty) {
      let l_oBoardData = _buildNewBoard(i_nDifficulty);
      this.board = l_oBoardData.board;
      this.signature = l_oBoardData.signature;
      this.nbTries = 0;
      this.previewData = null;
      this.showSolution = false;
    },

    //=============================================================================
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
          if (l_bErrorFound) {
            l_nNbErrorsDetected++;
          }
        }
      }

      if (l_nNbErrorsDetected === 0) {
        this.showSolution = true;
        this.previewData = null;
      }
      else {
        this.$forceUpdate();
      }
    },

    //=============================================================================
    onCellSelected: function (i_oCellData) {
      this.previewData = i_oCellData;
    },

    //=============================================================================
    onCellNumberChanged: function (i_nCellId, i_nNumber) {
      let l_oCoordinates = _findCellCoordinatesByKey(i_nCellId);
      this.board[l_oCoordinates.row][l_oCoordinates.column].answer = i_nNumber;
      if (this.previewData) {
        this.previewData.inputValue = i_nNumber;
      }
    },

    //=============================================================================
    onCellNoteChanged: function (i_nCellId, i_sNotes) {
      let l_oCoordinates = _findCellCoordinatesByKey(i_nCellId);
      this.board[l_oCoordinates.row][l_oCoordinates.column].notes = i_sNotes.substr(0, MAX_NOTES_LENGTH);
      if (this.previewData) {
        this.previewData.notes = i_sNotes;
      }
    },

    //=============================================================================
    onClosePreview: function () {
      this.previewData = null;
    },

    //=============================================================================
    setDifficulty: function (i_nDifficulty) {
      this.difficulty = i_nDifficulty;
      this.$refs['difficulty-control'].hide(() => this.onDifficultyChosen());
    },

    //=============================================================================
    onDifficultyChosen: function () {
      // on animation ended
      this.buildNewBoard(this.difficulty);
    }
  }
};
</script>

<style scoped>
#app {
  position: relative;
  /* color: #01410a; */
  text-align: center;
}

.preview-switch {
  position: absolute;
  top: 0;
  right: 10px;
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