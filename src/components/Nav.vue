<template>
  <div class="Nav">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon" />
      </button>

      <div
        id="navbarSupportedContent"
        class="collapse navbar-collapse"
      >
        <ul
          v-if="authed"
          class="navbar-nav ml-auto"
        >
          <li class="nav-item">
            <button
              class="btn btn-dark logout-btn"
              @click.prevent="logMeOut"
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
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
      // Firebase built in method to remove the Firebase auth token from the browser.
        logMeOut() {
            firebase.auth().signOut();
        }
    }
}
</script>

<style lang="scss" scoped>
.Nav {
  nav{
    min-height: 54px;
  }
}
</style>