<template>
    <div class="cluster">
        <Cell v-for="cell in cells" 
              :key="cell.id" 
              :id="cell.id"
              :editable="cell.editable"
              :answer="cell.answer"
              :solution="cell.solution"
              :notes="cell.notes"
              :showSolution="showSolution"
              :onCellNumberChanged="onCellNumberChanged"
              :onCellSelected="onCellSelected"
              />
    </div>
</template>

<script>
import Cell from "./Cell";

export default {
  name: "Cluster",
  components: { Cell },
  props: {
    clusterIdx: Number,
    showSolution: Boolean,
    cells: Array,
    onCellNumberChanged: Function,
    onCellSelected: Function
  }
};
</script>

<style scoped>
.cluster {
  position: absolute;
  margin: 10px;
  width: 96px;
  height: 96px;
  display: flex;
  flex-flow: row;
  flex-wrap: wrap;
}
</style>


