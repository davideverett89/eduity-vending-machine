<template>
  <div class="Soda col-3">
    <div
      class="card soda-card pb-1 pt-5 px-4"
      :class="[coinInserted ? 'coin-inserted' : 'no-coin']"
    >
      <img
        class="card-img-top img-fluid max-width: 100% height:auto mt-3 mb-0"
        :src="soda.image_url"
        :alt="soda.name"
      >
    </div>
  </div>
</template>

<script>
export default {
    name: "Soda",
    props: {
        soda: {
            type: Object,
            default: null,
        },
        coinInserted: {
          type: Boolean,
          default: false
        },
    }

}
</script>

<style lang="scss" scoped>
.Soda {
    margin: 10px 0;
    .soda-card {
        height: 500px;
        overflow: hidden;
        border-radius: 500px;
        box-shadow: 0px 0px 6px #B2B2B2;
    }
    .coin-inserted:hover {
        border: 2px solid gray;
        filter: brightness(110%);
    }
    .no-coin {
      filter: brightness(70%);
    }
}
</style>