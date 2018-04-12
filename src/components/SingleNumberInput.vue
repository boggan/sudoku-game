<template>
    <input  v-model="inputValue"  
            @focus="onFocus"
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
      if (this.onSelected) {
        this.onSelected();
      }
    },

    onKeyUp: function(i_oEvent) {
      let l_sChar = '';

      if (i_oEvent.keyCode >= 32 && i_oEvent.keyCode <= 126) {
        l_sChar = this.processInput(i_oEvent.key);
      }
      
      i_oEvent.target.value = l_sChar;
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

