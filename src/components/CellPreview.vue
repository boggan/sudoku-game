<template>
    <div class="cell-preview">
        <input placeholder="Notes: " 
               v-model="notes"
               class="cell-notes" />

        <input v-model="inputValue"
               @input="onInputChanged" 
               @focus="onFocus"
               type="text" 
               class="cell-input" 
               size="1" 
               maxlength="1"/>
    </div>
</template>

<script>
export default {
  name: "CellPreview",
  props: {
    onCellSelected: Function,
    onCellNumberChanged: Function,
    onCellNoteChanged: Function,
    previewData: Object
  },
  computed: {
    inputValue: {
      get: function() {
          let l_xData = this.previewData && this.previewData.inputValue;
          if(l_xData === " ") {
              l_xData = "";
          }
        return l_xData;
      },
      set: function(i_nValue) {
        // this.value = i_nValue;
        console.log("computed input value -> ", i_nValue);
        this.onCellNumberChanged(this.previewData.id, i_nValue);
      }
    },

    notes: {
      get: function() {
        return (this.previewData && this.previewData.notes) || "";
      },
      set: function(i_sNotes) {
        console.log("computed notes -> ", i_sNotes);
        this.onCellNoteChanged(this.previewData.id, i_sNotes);
      }
    }
  },
  methods: {
    onFocus: function(i_oEvent) {
      console.log("Preview Focus: ", i_oEvent);
    },

    onInputChanged: function(i_oEvent) {
      console.log("Preview Input Changed: ", i_oEvent);
    }
  }
};
</script>

<style scoped>
.cell-preview {
  border: 2px solid #00d500;
  width: 120px;
  height: 120px;
  position: absolute;
  left: 360px;
  top: 70px;
}

.cell-notes {
  width: 100%;
}

.cell-input {
  width: 100%;
  height: 82%;
  font-size: 64px;
  text-align: center;
}
</style>


