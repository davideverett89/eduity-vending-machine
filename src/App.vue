<template>
  <div id="app">
    <h2>Test Header</h2>
    <button
      class="btn btn-info"
      @click="testFunction"
    >
      Test Button
    </button>
  </div>
</template>

<script>

export default {
  name: 'App',
  methods: {
    testFunction() {
      console.log('Hello world!');
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
