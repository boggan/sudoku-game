<template>
    <div class="play-sheet">
        <div class="sudoku-board">
            <!-- or v-for n in 9 // 1 -> 9 would build c1 -> c9 -->
            <Cluster v-for="idx in 9"
                     v-bind:key="idx"
                     :class="'c' + idx"
                     :clusterIdx="idx - 1"
                     :cells="clusters[idx - 1]"
                     :showSolution="showSolution"
                     :onCellNumberChanged="onCellNumberChanged"
                     :onCellSelected="onCellSelected" />
          <slot name="celebration"></slot>
          <slot></slot>
        </div>
        <div class="signature">{{signature}}</div> 
    </div>
</template>

<script>
import Cluster from "./Cluster";

/*
split data into cluster chunks
*/

//=============================================================================
function _extractClusterNumber(i_aSheet, i_nStartRow, i_nColumnOffset) {
  let l_nEndColumn = i_nColumnOffset + 3;

  return i_aSheet[i_nStartRow]
    .slice(i_nColumnOffset, l_nEndColumn)
    .concat(i_aSheet[i_nStartRow + 1].slice(i_nColumnOffset, l_nEndColumn))
    .concat(i_aSheet[i_nStartRow + 2].slice(i_nColumnOffset, l_nEndColumn));
}

//=============================================================================
function _buildClusterInfos(i_aBoard, i_nIndex) {
  let l_nRest = i_nIndex % 3,
    l_nStartRow = Math.abs(Math.floor(l_nRest) - i_nIndex),
    l_nColumnOffset = l_nRest * 3;

  return _extractClusterNumber(i_aBoard, l_nStartRow, l_nColumnOffset);
}

//=============================================================================
export default {
  name: "Board",
  components: { Cluster },
  props: {
    board: Array,
    signature: String,
    showSolution: Boolean,
    onCellNumberChanged: Function,
    onCellSelected: Function
  },

  computed: {
    clusters: function () {
      let i,
        l_aClusters = [];

      // 9 clusters
      for (i = 0; i < 9; i++) {
        l_aClusters.push(_buildClusterInfos(this.board, i));
      }

      return l_aClusters;
    }
  }
};
</script>

<style scoped>
.sudoku-board {
  position: relative;
  width: 360px;
  height: 360px;
  margin: auto;
}

.signature {
  margin: 20px auto 20px auto;
  display: none;
}

.c1,
.c4,
.c7 {
  left: 0;
}

.c2,
.c5,
.c8 {
  left: 120px;
}

.c3,
.c6,
.c9 {
  left: 240px;
}

.c1,
.c2,
.c3 {
  top: 0;
}

.c4,
.c5,
.c6 {
  top: 120px;
}

.c7,
.c8,
.c9 {
  top: 240px;
}

.signature {
  font-size: 8px;
  margin-top: 10px;
  margin-bottom: 20px;
}
</style>
