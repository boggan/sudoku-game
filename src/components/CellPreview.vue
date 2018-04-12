<template>
    <div class="cell-preview"
          @keydown="onKeyDown">
        <input placeholder="Notes: " 
               v-model="notes"
               class="cell-notes" />

        <SingleNumberInput    :number="previewData && previewData.inputValue || ''"
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
      get: function () {
        return (this.previewData && this.previewData.notes) || "";
      },
      set: function (i_sNotes) {
        this.onCellNoteChanged(this.previewData.id, i_sNotes);
      }
    }
  },
  methods: {
    onKeyDown: function (i_oEvent) {
      if (i_oEvent.key === "Escape") {
        this.$emit("close-preview");
      }
    },
    onInputChanged: function (i_nNumber) {
      this.onCellNumberChanged(this.previewData.id, i_nNumber);
    }
  }
};
</script>

<style scoped>
.cell-preview {
  box-shadow: 4px 4px 10px #d3d3d3;
  border: 2px solid #505050;
  width: 120px;
  height: 120px;
  position: absolute;
  left: 360px;
  top: 10px;
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


