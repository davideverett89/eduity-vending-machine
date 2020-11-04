<template>
  <div id="App">
    <Nav
      :authed="authed"
    />
    <Auth
      v-if="authed === false"
      :authed="authed"
    />
    <VendingMachine 
      v-if="authed"
    />
  </div>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/auth';

import Nav from './components/Nav';
import Auth from './components/Auth';
import VendingMachine from './components/VendingMachine';

import fbConnection from './helpers/data/connection';

fbConnection();

export default {
  name: 'App',
  components: {
    Nav,
    Auth,
    VendingMachine,
  },
  data() {
    return {
      authed: false
    }
  },
  mounted() {
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.authed = true;
        } else {
          this.authed = false;
        }
    });
  },
  destroyed() {
    this.removeListener();
  },
  methods: {
    testFunction() {
      console.log('Hello world!');
    },
  }
}
</script>

<style>
#App {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
