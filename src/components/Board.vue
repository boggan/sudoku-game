<template>
    <div class="play-sheet">
        <div class="sudoku-board">
            <!-- or v-for n in 9 // 1 -> 9 would build c1 -> c9 -->
            <Cluster v-for="idx in 9"
                     v-bind:key="idx"
                     :class="'c' + idx"
                     :clusterIdx="idx - 1"
                     :sheet="sheet" 
                     :solution="solution" 
                     :showSolution="showSolution" />
        </div>
        <div class="signature">{{signature}}</div> 
    </div>
</template>

<script>
import Cluster from "./Cluster";

//=============================================================================
export default {
  name: "Board",
  components: { Cluster },
  props: ["sheet", "solution", "signature", "showSolution"]
};
</script>

<style scoped>
.sudoku-board {
  position: relative;
  width: 340px;
  height: 360px;
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
  border: 1px SOLID #d3d5d5;
  top: 0;
}

.c4,
.c5,
.c6 {
  border: 1px SOLID #00ff00;
  top: 120px;
}

.c7,
.c8,
.c9 {
  border: 1px SOLID #0000ff;
  top: 240px;
}

.signature {
  font-size: 8px;
}
</style>
