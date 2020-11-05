<template>
  <div class="VendingMachine container-fluid my-5 p-5">
    <div class="row">
      <div class="vending-machine-component col-9 border border-dark rounded d-flex flex-wrap justify-content-center align-items-start p-5">
        <Soda
          v-for="soda in sodas"
          :key="soda.id"
          :soda="soda"
          :coin-inserted="coinInserted"
          @click.native="makePurchase(soda)"
        />
      </div>
      <div class="vending-machine-component col-3 border border-dark rounded interface-box">
        <h2 class="mt-2">
          Insert coin and make selection.
        </h2>
        <CoinSlot
          :insert-coin="insertCoin"
          :eject-coin="ejectCoin"
          :coin-inserted="coinInserted"
          :currently-vending="currentlyVending"
        />
        <div class="vending-slot mt-5 border border-dark rounded">
          <VendedSoda
            v-if="currentlyVending"
            :vended-soda="vendedSoda"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import sodaData from '../helpers/data/sodaData';
import purchaseData from '../helpers/data/purchaseData';
import authData from '../helpers/data/authData';

import Soda from './Soda';
import CoinSlot from './CoinSlot';
import VendedSoda from './VendedSoda';

export default {
  name: "VendingMachine",
  components: {
      Soda,
      CoinSlot,
      VendedSoda,
  },
  data() {
      return {
          sodas: [],
          coinInserted: false,
          currentlyVending: false,
          vendedSoda: {},
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
    delay(t) { 
      return new Promise((resolve) => setTimeout(resolve, t))
    },
    vend(soda) {
      this.vendedSoda = soda;
      this.currentlyVending = true;
      this.delay(5000)
        .then(() => {
          this.vendedSoda = {};
          this.currentlyVending = false;
        });
    },
      makePurchase(soda) {
          if (this.coinInserted) {
              const newPurchase = {
                customer_uid: authData.getUid(),
                soda_id: soda.id,
                timestamp: moment().format('MMMM Do YYYY, h:mm:ss a')
              };
              purchaseData.postPurchase(newPurchase)
                .then(() => {
                  this.coinInserted = false;
                  this.vend(soda);
                })
                .catch((err) => console.error('There was an error posting a new purchase:', err));
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
.vending-slot {
  min-height: 755px;
}
</style>