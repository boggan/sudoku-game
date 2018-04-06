<template>
    <div class="play-sheet">
        <div class="sudoku-board">
            <Cluster class="top c1" :numbers="cluster1" :solution="solution1" :showSolution="showSolution" />
            <Cluster class="top c2" :numbers="cluster2" :solution="solution2" :showSolution="showSolution" />
            <Cluster class="top c3" :numbers="cluster3" :solution="solution3" :showSolution="showSolution" />
            <Cluster class="middle c1" :numbers="cluster4" :solution="solution4" :showSolution="showSolution" />
            <Cluster class="middle c2" :numbers="cluster5" :solution="solution5" :showSolution="showSolution" />
            <Cluster class="middle c3" :numbers="cluster6" :solution="solution6" :showSolution="showSolution" />
            <Cluster class="bottom c1" :numbers="cluster7" :solution="solution7" :showSolution="showSolution" />
            <Cluster class="bottom c2" :numbers="cluster8" :solution="solution8" :showSolution="showSolution" />
            <Cluster class="bottom c3" :numbers="cluster9" :solution="solution9" :showSolution="showSolution" />
        </div>
        <div class="signature">{{signature}}</div> 
    </div>
</template>

<script>
import Cluster from "./Cluster";

//=============================================================================
function _extractClusterNumber(i_aBoard, i_nStartRow, i_nColumnOffset) {
  let l_nEndColumn = i_nColumnOffset + 3;

  return i_aBoard[i_nStartRow]
    .slice(i_nColumnOffset, l_nEndColumn)
    .concat(i_aBoard[i_nStartRow + 1].slice(i_nColumnOffset, l_nEndColumn))
    .concat(i_aBoard[i_nStartRow + 2].slice(i_nColumnOffset, l_nEndColumn));
}

//=============================================================================
export default {
  name: "Board",
  components: { Cluster },
  props: ["sheet", "solution", "signature", "showSolution"],

  // need to find a way to generate this...
  computed: {
    cluster1() {
      return _extractClusterNumber(this.sheet, 0, 0);
    },

    solution1() {
      return _extractClusterNumber(this.solution, 0, 0);
    },

    cluster2() {
      return _extractClusterNumber(this.sheet, 0, 3);
    },

    solution2() {
      return _extractClusterNumber(this.solution, 0, 0);
    },

    cluster3() {
      return _extractClusterNumber(this.sheet, 0, 6);
    },

    solution3() {
      return _extractClusterNumber(this.solution, 0, 0);
    },

    cluster4() {
      return _extractClusterNumber(this.sheet, 3, 0);
    },

    solution4() {
      return _extractClusterNumber(this.solution, 0, 0);
    },

    cluster5() {
      return _extractClusterNumber(this.sheet, 3, 3);
    },

    solution5() {
      return _extractClusterNumber(this.solution, 0, 0);
    },

    cluster6() {
      return _extractClusterNumber(this.sheet, 3, 6);
    },

    solution6() {
      return _extractClusterNumber(this.solution, 0, 0);
    },

    cluster7() {
      return _extractClusterNumber(this.sheet, 6, 0);
    },

    solution7() {
      return _extractClusterNumber(this.solution, 0, 0);
    },

    cluster8() {
      return _extractClusterNumber(this.sheet, 6, 3);
    },

    solution8() {
      return _extractClusterNumber(this.solution, 0, 0);
    },

    cluster9() {
      return _extractClusterNumber(this.sheet, 6, 6);
    },

    solution9() {
      return _extractClusterNumber(this.solution, 0, 0);
    },
  }
};
</script>

<style scoped>
.sudoku-board {
  position: relative;
  width: 340px;
  height: 360px;
}

.c1 {
  left: 0;
}

.c2 {
  left: 120px;
}

.c3 {
  left: 240px;
}

.top {
  border: 1px SOLID #d3d5d5;
  top: 0;
}

.middle {
  border: 1px SOLID #00ff00;
  top: 120px;
}

.bottom {
  border: 1px SOLID #0000ff;
  top: 240px;
}

.signature {
  font-size: 8px;
}
</style>
