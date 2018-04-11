<template>
    <input  v-model="inputValue"  
            @focus="onFocus"
            @input="onInput"
            @change="onInputChanged"
            @keyup="onKeyUp"
            type="text" 
            class="cell-input" 
            size="1" 
            maxlength="1"
            pattern="[1-9]"/>
</template>

<script>
export default {
  name: "SingleNumberInput",
  props: {
    onSelected: Function,
    onChange: Function,
    number: [Number, String]
  },
  computed: {
    inputValue: {
      get: function() {
        return String(this.number).trim();
      },
      set: function(i_nNumber) {
        this.processInput(i_nNumber);
      }
    }
  },
  methods: {
    onFocus: function(i_oEvent) {
      console.log("On input focuses", this.id, "Current Value: ", this.answer);
      if (this.onSelected) {
        this.onSelected();
      }
    },

    onInput: function(i_oEvent) {
      console.log("On Input received with -> ", i_oEvent.key);
    },

    onInputChanged: function(i_oEvent) {
      console.log("On Input Changed received -> ", i_oEvent);
    },

    onKeyUp: function(i_oEvent) {
      if (i_oEvent.keyCode >= 32 && i_oEvent.keyCode <= 126) {
        console.log("On Key Up received -> ", i_oEvent.key);
        let l_sChar = this.processInput(i_oEvent.key);
        i_oEvent.target.value = l_sChar;
      }
    },

    processInput(i_sChar) {
      let l_nNumKey = Number(i_sChar);

      if (isNaN(l_nNumKey) || l_nNumKey === 0) {
        l_nNumKey = "";
      }
      if (this.onChange) {
        this.onChange(l_nNumKey);
      }

      return l_nNumKey;
    }
  }
};
</script>

<style scoped>

</style>

