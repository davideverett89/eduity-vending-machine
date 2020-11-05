<template>
  <div class="VendingMachine container-fluid my-5 p-5">
    <div class="row">
      <div class="vending-machine-component col-9 border border-dark rounded d-flex flex-wrap justify-content-center align-items-start p-5">
        <Soda
          v-for="soda in sodas"
          :key="soda.id"
          :soda="soda"
          :coin-inserted="coinInserted"
          @click.native="vend(soda.id)"
        />
      </div>
      <div class="vending-machine-component col-3 border border-dark rounded interface-box">
        <CoinSlot
          :insert-coin="insertCoin"
          :eject-coin="ejectCoin"
          :coin-inserted="coinInserted"
        />
        <VendingSlot />
      </div>
    </div>
  </div>
</template>

<script>
import sodaData from '../helpers/data/sodaData';

import Soda from './Soda';
import CoinSlot from './CoinSlot';
import VendingSlot from './VendingSlot';

export default {
  name: "VendingMachine",
  components: {
      Soda,
      CoinSlot,
      VendingSlot,
  },
  data() {
      return {
          sodas: [],
          coinInserted: false,
          currentlyVending: false,
      }
  },
  mounted() {
    sodaData.getSodas()
      .then((sodas) => {
          this.sodas = sodas;
      })
      .catch((err) => console.error('There was an issue getting all sodas:', err));
  },
  destroyed() {
      console.log('Vending machine unmounted!');
  },
  methods: {
      vend(sodaId) {
          if (this.coinInserted) {
              console.log('Vended soda:', sodaId);
          }
      },
      insertCoin() {
          console.log('Coin inserted!');
          this.coinInserted = true;
      },
      ejectCoin() {
          console.log('Coin ejected!');
          this.coinInserted = false;
      },
  }
}
</script>

<style>

</style>