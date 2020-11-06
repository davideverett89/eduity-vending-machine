<template>
  <div class="CoinSlot border border-dark rounded p-5 mt-3 bg-dark">
    <h3
      v-if="currentlyVending === false"
      class="lcd-display border border-dark bg-light"
    >
      {{ calculateMoney > 0 ? `$${calculateMoney.toFixed(2)}` : '$0.00' }}
    </h3>
    <h3
      v-else
      class="lcd-display border border-dark bg-light"
    >
      Vending...
    </h3>
    <div class="d-flex justify-content-around align-items-center mt-5">
      <button
        class="btn btn-outline-light"
        :disabled="currentlyVending || change > 0"
        @click="insertCoin"
      >
        Insert Coin
      </button>
      <button
        class="btn btn-outline-light"
        :disabled="currentlyVending || change > 0"
        @click="ejectCoin"
      >
        Eject Change
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "CoinSlot",
  props: {
      insertCoin: {
          type: Function,
          default: null
      },
      ejectCoin: {
          type: Function,
          default: null
      },
      currentlyVending: {
        type: Boolean,
        default: false
      },
      calculateMoney: {
        type: Number,
        default: 0,
      },
      change: {
        type: Number,
        default: 0,
      }
  }
}
</script>

<style>
.CoinSlot {
  box-shadow: 0px 0px 6px #000;
}
</style>