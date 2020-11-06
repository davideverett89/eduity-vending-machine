<template>
  <div class="VendingMachine container-fluid my-5 p-5">
    <div class="row">
      <div class="vending-machine-component col-9 border border-dark rounded d-flex flex-wrap justify-content-center align-items-start p-5">
        <Soda
          v-for="soda in sodas"
          :key="soda.id"
          :soda="soda"
          :calculate-money="calculateMoney"
          @click.native="makePurchase(soda)"
        />
      </div>
      <div class="vending-machine-component col-3 border border-dark rounded interface-box">
        <h2
          v-if="change === 0"
          class="mt-2 slot-header"
        >
          {{ currentlyVending ? 'Enjoy!': 'Insert coin and make selection.' }}
        </h2>
        <h2
          v-if="change > 0"
          class="mt-2 slot-header change-text"
        >
          Your change is ${{ change.toFixed(2) }}
        </h2>
        <span>Quarters Only Please.</span>
        <CoinSlot
          :insert-coin="insertCoin"
          :eject-coin="ejectCoin"
          :currently-vending="currentlyVending"
          :calculate-money="calculateMoney"
          :change="change"
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
          quarters: 0,
          change: 0,
          currentlyVending: false,
          vendedSoda: {},
      }
  },
  computed: {
    // Assuming this machine only accepts quarters, this function multiplies the quarter count in state by 0.25 and returns that result.
      calculateMoney() {
      const insertedAmount = 0.25 * this.quarters;
      return insertedAmount;
    }
  },
  // When the vending machine component initializes, it gets the array of available sodas from the database.
  mounted() {
    this.getData();
  },
  methods: {
    // Calls the function that queries the database for all of the sodas on record, and then sets the resulting array to state.
    getData() {
      sodaData.getSodas()
        .then((sodas) => {
            this.sodas = sodas;
        })
        .catch((err) => console.error('There was an issue getting all sodas:', err));
    },
    // Accepts a number of milliseconds as an argument, and then returns a promise that performs other tasks after the passed in interval.
    delay(t) { 
      return new Promise((resolve) => setTimeout(resolve, t))
    },
    // Accepts a soda object as an argument, sets it to state to be displayed in the vending slot for a set period of time, before being cleared.
    vend(soda) {
      this.vendedSoda = soda;
      this.currentlyVending = true;
      this.delay(5000)
        .then(() => {
          if (this.vendedSoda.quantity > 0) {
            const newQuantity = this.vendedSoda.quantity - 1;
            sodaData.patchSoda(soda.id, newQuantity)
              .then(() => {
                this.getData();
              });
          }
          this.vendedSoda = {};
          this.currentlyVending = false;
          this.getData();
        });
    },
    // Triggered by click event.  If there is a coin inserted into the mahcine and the soda quantity is more than zero, creates a purchase object
    // to be posted to the database.
      makePurchase(soda) {
        if (this.calculateMoney >= soda.price && soda.quantity > 0 && this.currentlyVending === false) {
            const newPurchase = {
              customer_uid: authData.getUid(),
              soda_id: soda.id,
              timestamp: moment().format('MMMM Do YYYY, h:mm:ss a')
            };
            purchaseData.postPurchase(newPurchase)
              .then(() => {
                this.quarters = (this.calculateMoney - soda.price) / 0.25;
                this.vend(soda);
              })
              .catch((err) => console.error('There was an error posting a new purchase:', err));
        }
      },
      // Click event triggered by the insert coin button in the CoinSlot component.  Increments the quarter count in state by one.
      insertCoin() {
        this.quarters++
      },
      // Click event triggered by the eject coin button in the CoinSlot component.  Returns the quarter count in state to zero.
      ejectCoin() {
        if (this.quarters > 0) {
          this.change = this.quarters * 0.25;
          this.delay(2000)
            .then(() => {
              this.change = 0;
            });
          this.quarters = 0;
        }
      },
  }
}
</script>

<style lang="scss" scoped>
.interface-box {
  box-shadow: 0px 0px 6px #B2B2B2;
}

.vending-slot {
  min-height: 720px;
  box-shadow: 0px 0px 6px #B2B2B2;
}

.slot-header {
  min-height: 76px;
}
</style>