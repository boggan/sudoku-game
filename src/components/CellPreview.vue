<template>
    <div class="cell-preview">
        <input placeholder="Notes: " 
               v-model="notes"
               class="cell-notes" />

        <single-number-input    :number="previewData && previewData.inputValue || ''"
                                :onChange="onInputChanged" />
    </div>
</template>

<script>
import SingleNumberInput from './SingleNumberInput';

export default {
  name: "CellPreview",
  components: { SingleNumberInput },
  props: {
    onCellSelected: Function,
    onCellNumberChanged: Function,
    onCellNoteChanged: Function,
    previewData: Object
  },
  computed: {
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
    onInputChanged: function(i_nNumber) {
      this.onCellNumberChanged(this.previewData.id, i_nNumber);
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


