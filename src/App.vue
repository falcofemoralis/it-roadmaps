<template>
  <div class="container">
    <Header />
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Header from "./components/Header.vue";

export default defineComponent({
  components: {
    Header,
  },
});
</script>

<style lang="scss">
* {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
  padding: 0;
  font-size: 14px;
  list-style: none;
  text-decoration: none;
}

/* *,
*::after,
*::before {
  box-sizing: border-box;
}
 */

.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}
</style>
