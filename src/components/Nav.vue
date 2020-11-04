<template>
  <div class="Nav">
    <p>Logged In: {{ authed }}</p>
    <button
      class="btn btn-dark logout-btn"
      @click.prevent="logMeOut"
    >
      Logout
    </button>
  </div>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/auth';

export default {
    name: "Nav",
    props: {
        authed: Boolean
    },
    methods: {
        logMeOut() {
            firebase.auth().signOut();
        }
    }
}
</script>