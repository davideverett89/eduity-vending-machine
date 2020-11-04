<template>
  <div class="Soda col-3">
    <div
      class="card soda-card"
    >
      <img
        class="card-img-top img-fluid max-width: 100% height:auto mt-3"
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
        }
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
    }
    .soda-card:hover {
        border: 2px solid gray;
        filter: brightness(110%);
    }
}
</style>