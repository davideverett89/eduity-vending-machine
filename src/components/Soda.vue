<template>
  <div class="Soda col-3">
    <div
      class="card soda-card pb-1 pt-5 px-4"
      :class="applyClass"
    >
      <img
        class="card-img-top img-fluid max-width: 100% height:auto mt-3 mb-0"
        :src="soda.image_url"
        :alt="soda.name"
      >
      <p class="soda-text lead">
        ${{ soda.price.toFixed(2) }}
      </p>
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
        calculateMoney: {
          type: Number,
          default: 0,
      }
    },
    computed: {
      // Dynamically returns a string of classes based on whether or not a customer has inserted a coin, if the soda is sold out, or both.
      applyClass() {
        let extraClass = '';
        if (this.calculateMoney >= this.soda.price && this.soda.quantity > 0) {
          extraClass += 'coin-inserted';
        } else if (this.soda.quantity === 0) {
          extraClass += 'no-coin sold-out';
        } else if (this.calculateMoney > 0 && this.soda.quantity === 0) {
          extraClass += 'no-coin sold-out';
        } else {
          extraClass += 'no-coin';
        }
        return extraClass;
      },
    }
}
</script>

<style lang="scss" scoped>
.Soda {
  display: block;
    margin: 10px 0;
    .soda-card {
        height: 500px;
        overflow: hidden;
        border-radius: 500px;
        position: relative;
        text-align: center;
        box-shadow: 0px 0px 6px #B2B2B2;
        .soda-text {
          font-size: 30px;
        }
    }
    .coin-inserted:hover {
        border: 2px solid gray;
        filter: brightness(110%);
    }
    .no-coin {
      filter: brightness(50%);
    }
    .sold-out::after {
      content: url("https://raw.githubusercontent.com/morecallan/css102-e6/master/images/soldOut.png");
      opacity: 1;
      position: relative;
      right: 115px;
      bottom: 365px;
    }
}
</style>