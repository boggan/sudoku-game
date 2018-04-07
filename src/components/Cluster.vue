<template>
    <div class="cluster">
        <div v-for="(number, idx) in cluster" 
             v-bind:key="number + ':' + idx" 
             v-bind:class="{ 'solution-cell': String(number).trim() === '' }" >
            <span v-if="showSolution">{{cSolution[idx]}}</span>
            <span v-else class="play-cell">{{number}}</span>
        </div>
    </div>
</template>

<script>
//=============================================================================
function _extractClusterNumber(i_aSheet, i_nStartRow, i_nColumnOffset) {
  let l_nEndColumn = i_nColumnOffset + 3;

  return i_aSheet[i_nStartRow]
    .slice(i_nColumnOffset, l_nEndColumn)
    .concat(i_aSheet[i_nStartRow + 1].slice(i_nColumnOffset, l_nEndColumn))
    .concat(i_aSheet[i_nStartRow + 2].slice(i_nColumnOffset, l_nEndColumn));
}

//=============================================================================
export default {
  name: "Cluster",
  props: ["clusterIdx", "showSolution", "sheet", "solution"],
  data: function() {
      let l_nRest = this.clusterIdx % 3,
        l_nStartRow = Math.abs(Math.floor(l_nRest) - this.clusterIdx),
        l_nColumnOffset = l_nRest * 3;

      return {
          cluster: _extractClusterNumber(this.sheet, l_nStartRow, l_nColumnOffset),
          cSolution:  _extractClusterNumber(this.solution, l_nStartRow, l_nColumnOffset)
      };
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

.cluster div {
  width: 30px;
  min-height: 24px;
  text-align: center;
  padding-top: 6px;
  border: 1px solid brown;
}

.solution-cell {
  background-color: #d3d3d3;
}
</style>


