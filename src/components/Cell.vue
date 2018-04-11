<template>
    <div class="cell"
         :class="{ cell: true, 'editable-cell': this.editable }"
    >
        <div v-if="editable && !showSolution">
            <input v-model="inputValue"  
                  @focus="onFocus"
                  @input="onInput"
                  @change="onInputChanged"
                  @keyup="onKeyUp"
                  type="text" 
                  class="cell-input" 
                  size="1" 
                  maxlength="1"
                  pattern="[1-9]"/>
        </div>
        <div v-else>
            <span class="play-cell">{{solution}}</span>
        </div>
    </div>
</template>

<script>
export default {
  name: "Cell",
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

  computed: {
    inputValue: {
      get: function() {
        return String(this.answer).trim();
      },
      set: function(i_nNumber) {
        this.processInput(i_nNumber);
      }
    }
  },
  methods: {
    onFocus: function(i_oEvent) {
      console.log("On input focuses", this.id, "Current Value: ", this.answer);

      this.onCellSelected({
        id: this.id,
        notes: this.notes,
        inputValue: this.answer
      });
    },

    onInput: function(i_oEvent) {
      console.log("On Input received with -> ", i_oEvent.key);
    },

    onInputChanged: function(i_oEvent) {
      console.log("On Input Changed received -> ", i_oEvent);
    },

    onKeyUp: function(i_oEvent) {
      console.log("On Key Up received -> ", i_oEvent.key);
      let l_sChar = this.processInput(i_oEvent.key);
      i_oEvent.target.value = l_sChar;
    },

    processInput(i_sChar) {
      let l_nNumKey = Number(i_sChar);

      if (isNaN(l_nNumKey) || l_nNumKey === 0) {
        l_nNumKey = "";
      }
      this.onCellNumberChanged(this.id, l_nNumKey);
      return l_nNumKey;
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


