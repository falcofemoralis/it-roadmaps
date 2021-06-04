<template>
  <div>
    <Header />
    <router-view class="container wrapper" />
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
*,
*::after,
*::before {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 0;
  padding: 0;
  list-style: none;
  text-decoration: none;
}

html,
body {
  height: 100vh;
}

body {
  scroll-behavior: smooth;
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
