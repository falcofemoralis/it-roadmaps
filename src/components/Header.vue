<template>
  <div class="nav">
    <div class="links">
      <img class="logo" src="../assets/logo.png" />
      <router-link to="/">Roadmaps</router-link> |
      <router-link to="/progress">My progress</router-link>
    </div>
    <div class="user__panel">
      <img src="../assets/userlogo.png" />
      <span>Username</span>
    </div>
  </div>
</template>


<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Header",
});
</script>


<style lang="scss" scoped>
$header-height: 50px;

.nav {
  height: $header-height;
  padding: 30px;
  display: flex;
  justify-content: space-between;
}

.user__panel {
  display: flex;

  img {
    height: $header-height;
    width: 50px;
    border: 0px solid;
    border-radius: 50px;
    box-sizing: content-box;
  }

  span {
    display: flex;
    align-items: center;
    font-weight: bold;
    margin-left: 5px;
  }
}

.links {
  display: flex;
  align-items: center;

  a {
    color: #2c3e50;
    font-weight: bold;
    margin: 0 7px 0 7px;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.logo {
  height: $header-height;
  margin-right: 10px;
}
</style>