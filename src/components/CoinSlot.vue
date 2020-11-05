<template>
  <div class="CoinSlot border border-dark rounded p-5 mt-3">
    <h3 class="lcd-display border border-dark">
      {{ coinInserted ? '$0.25' : '$0.00' }}
    </h3>
    <div class="d-flex justify-content-around align-items-center mt-5">
      <button
        class="btn btn-success"
        @click="insertCoin"
      >
        Insert Coin
      </button>
      <button
        class="btn btn-danger"
        @click="ejectCoin"
      >
        Eject Coin
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
      coinInserted: {
          type: Boolean,
          default: false
      },
  },
}
</script>

<style>

</style>