<template>
    <div class="cell"
         :class="{ cell: true, 'editable-cell': this.editable }"
    >
        <div v-if="editable && !showSolution">
            <single-number-input    :number="answer"
                                    :onChange="onChange"
                                    :onSelected="onSelected" />
        </div>
        <div v-else>
            <span class="play-cell">{{solution}}</span>
        </div>
    </div>
</template>

<script>
import SingleNumberInput from "./SingleNumberInput";

export default {
  name: "Cell",
  components: { SingleNumberInput },
  props: {
    id: Number,
    editable: Boolean,
    answer: [String, Number],
    solution: Number,
    notes: String,
    showSolution: Boolean,
    onCellNumberChanged: Function,
    onCellSelected: Function
  },

  methods: {
    onSelected: function(i_oEvent) {
      this.onCellSelected({
        id: this.id,
        notes: this.notes,
        inputValue: this.answer
      });
    },

    onChange: function(i_nNumber) {
      this.onCellNumberChanged(this.id, i_nNumber);
    }
  }
};
</script>

<style scoped>
.cell {
  position: relative;
  font-size: 16px;
  width: 30px;
  min-height: 24px;
  text-align: center;
  padding-top: 6px;
  border: 1px solid brown;
  background-color: #d3d3d3;
}

.cell-input {
  position: absolute;
  top: 0;
  left: 0;
  font-size: 16px;
  width: 30px;
  height: 30px;
  text-align: center;
  border: none;
}

.editable-cell {
  background-color: #ffffff;
}
</style>


