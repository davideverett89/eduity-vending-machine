<template>
  <div class="VendedSoda">
    <div class="vended-soda-card pb-1 pt-5 px-4">
      <img
        class="card-img-top img-fluid max-width: 100% height:auto mt-3 mb-0"
        :src="vendedSoda.image_url"
        :alt="vendedSoda.name"
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "VendedSoda",
  props: {
    vendedSoda: {
      type: Object,
      default: null
    }
  }
}
</script>

<style lang="scss" scoped>
.VendedSoda {
    display: block;
}
</style>