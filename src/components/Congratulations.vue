<template>
    <div ref="confetti-container" class="congratulations">
        <span class="congratulations-title">Congratulations!</span>
    </div>
</template>

<script>

//=============================================================================
function _boundRandomNumber(i_nMin, i_nMax) {
    let l_nNumber = Math.round(Math.random() * i_nMax);
    return Math.max(i_nMin, l_nNumber);
}

//=============================================================================
function _loadConfettis(i_oDOM) {
    let i,
        l_nConfettiType,
        l_nNbConfetti = (300 / 50) * 10,
        l_oSPAN;

    for (i = 0; i <= l_nNbConfetti; i++) {
        l_oSPAN = document.createElement("span");
        i_oDOM.appendChild(l_oSPAN);

        l_nConfettiType = Math.ceil(Math.random() * 6);
        l_oSPAN.classList.add("celebration-confetti", "c" + l_nConfettiType);
        l_oSPAN.style.top = _boundRandomNumber(0, 60) + '%';
        l_oSPAN.style.left = _boundRandomNumber(0, 100) + '%'; // random 0, 100 %
        l_oSPAN.style.width = _boundRandomNumber(6, 8) + 'px'; // random 6,8px
        l_oSPAN.style.height = _boundRandomNumber(3, 4) + 'px'; // random 3,4px
        l_oSPAN.style.animationDelay = _boundRandomNumber(0, 10) + 's'; // random 0, 30s
        
    }
}

//=============================================================================
// COMPONENT MODULE
//=============================================================================
export default {
    name: "Congratulations",
    created: function () {
        console.log("Congratulations created! ", this.$refs['confetti-container']);
    },
    mounted: function () {
        console.log("Congratulations Mounted ? ", this.$refs['confetti-container']);
        _loadConfettis(this.$refs['confetti-container']);
    }
}
</script>

<style>
.congratulations {
  position: absolute;
  width: 300px;
  height: 40px;
  margin: auto;
  left: 0;
  top: 0;
  right: 0;
  z-index: 9;
  background-color: #fff;
  border: 1px SOLID #000;
  bottom: 0;
}

.congratulations-title {
  margin: auto;
  position: absolute;
  top: 4px;
  left: 0;
  right: 0;
  bottom: 0;
  font-size: 26px;
}

.celebration-confetti {
  opacity: 0;
  position: absolute;
  animation: confetti 3s ease-in infinite;
}

.c1 {
  background-color: rgba(76, 175, 80, 0.5);
}
.c2 {
  background-color: rgba(156, 39, 176, 0.5);
}
.c3 {
  background-color: rgba(41, 205, 255, 0.5);
}
.c4 {
  background-color: rgba(120, 255, 68, 0.5);
}
.c5 {
  background-color: rgba(255, 113, 141, 0.5);
}
.c6 {
  background-color: rgba(253, 255, 106, 0.5);
}

@keyframes confetti {
  0% {
    opacity: 0;
    transform: translateY(0%) rotate(0deg);
  }
  10% {
    opacity: 1;
  }
  35% {
    transform: translateY(-800%) rotate(270deg);
  }
  80% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: translateY(2000%) rotate(1440deg);
  }
}
</style>


