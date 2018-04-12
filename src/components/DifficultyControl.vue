<template>
    <div ref="container">
        <h3>Choose Difficulty</h3>
        <button @click="setDifficulty(0)">easy</button>
        <button @click="setDifficulty(1)">medium</button>
        <button @click="setDifficulty(2)">hard</button>
    </div>  
</template>

<script>
export default {
    name: "DifficultyControl",
    props: {
        onChange: Function
    },
    methods: {
        show: function (i_fnOnComplete) {
            let l_oDOMEl = this.$refs.container,
                l_fnOnAnimEnd = () => {
                    l_oDOMEl.removeEventListener("animationend", l_fnOnAnimEnd);

                    if (i_fnOnComplete) {
                        i_fnOnComplete();
                    }
                };
            l_oDOMEl.addEventListener("animationend", l_fnOnAnimEnd);
            l_oDOMEl.classList.remove("fade-out", "hidden");
            l_oDOMEl.classList.add("fade-in");
        },

        hide: function (i_fnOnComplete) {
            let l_oDOMEl = this.$refs.container,
                l_fnOnAnimEnd = () => {
                    l_oDOMEl.removeEventListener("animationend", l_fnOnAnimEnd);
                    l_oDOMEl.classList.add("hidden");
                    if (i_fnOnComplete) {
                        i_fnOnComplete();
                    }
                };
            l_oDOMEl.addEventListener("animationend", l_fnOnAnimEnd);
            l_oDOMEl.classList.add("fade-out");
        },
        setDifficulty: function (i_nDifficulty) {
            if (this.onChange) {
                this.onChange(i_nDifficulty);
            }
        }
    }
}
</script>

<style scoped>
.hidden {
  display: none;
}

.fade-in {
  animation: fadein 1s;
  opacity: 1;
}

.fade-out {
  animation: fadeout 1s;
  opacity: 0;
}

@keyframes fadein {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

@keyframes fadeout {
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
    display: none;
  }
}
</style>


