<template>
  <div class="VendingMachine container-fluid my-5 p-5">
    <div class="row">
      <div class="col-9 border border-dark rounded d-flex flex-wrap justify-content-center align-items-start p-5">
        <Soda
          v-for="soda in sodas"
          :key="soda.id"
          :soda="soda"
        />
      </div>
      <div class="col-3 border border-dark rounded">
        <h1 class="mt-2">
          Interface
        </h1>
      </div>
    </div>
    <div class="row">
      <div class="col-12 border border-dark rounded">
        <div class="col-9 border border-dark rounded m-5">
          <h1 class="mt-2">
            Vending Slot
          </h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import sodaData from '../helpers/data/sodaData';

import Soda from './Soda';

export default {
  name: "VendingMachine",
  components: {
      Soda,
  },
  data() {
      return {
          sodas: [],
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
  }
}
</script>

<style>

</style>