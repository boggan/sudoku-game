<template>
    <div class="cluster">
        <div>
            <span v-if="showSolution" class="solution-cell">{{solution[0]}}</span>
            <span v-else class="play-cell">{{numbers[0]}}</span>
        </div>
        <div>
            <span v-if="showSolution" class="solution-cell">{{solution[1]}}</span>
            <span v-else class="play-cell">{{numbers[1]}}</span>
        </div>
        <div>
            <span v-if="showSolution" class="solution-cell">{{solution[2]}}</span>
            <span v-else class="play-cell">{{numbers[2]}}</span>
        </div>
        
        <div>
            <span v-if="showSolution" class="solution-cell">{{solution[3]}}</span>
            <span v-else class="play-cell">{{numbers[3]}}</span>
        </div>
        <div>
            <span v-if="showSolution" class="solution-cell">{{solution[4]}}</span>
            <span v-else class="play-cell">{{numbers[4]}}</span>
        </div>
        <div>
            <span v-if="showSolution" class="solution-cell">{{solution[5]}}</span>
            <span v-else class="play-cell">{{numbers[5]}}</span>
        </div>

        <div>
            <span v-if="showSolution" class="solution-cell">{{solution[6]}}</span>
            <span v-else class="play-cell">{{numbers[6]}}</span>
        </div>
        <div>
            <span v-if="showSolution" class="solution-cell">{{solution[7]}}</span>
            <span v-else class="play-cell">{{numbers[7]}}</span>
        </div>
        <div>
            <span v-if="showSolution" class="solution-cell">{{solution[8]}}</span>
            <span v-else class="play-cell">{{numbers[8]}}</span>
        </div>
    </div>
</template>

<script>
export default {
  name: "Cluster",
  props: ["showSolution", "numbers", "solution"]
}
</script>

<style scoped>
.cluster {
    position: absolute;
    margin: 10px;
    width: 90px;
    height: 90px;
    display: flex;
    flex-flow: row;
    flex-wrap: wrap;
}

.cluster div {
    width: 30px;
    text-align: center;
    padding-top: 6px;
}

.solution-cell {
    display: none;
}
</style>


