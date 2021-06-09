<template>
  <div class="nav">
    <div class="links">
      <img class="logo" src="../assets/logo.png" />
      <router-link to="/">Roadmaps</router-link>
      <router-link v-if="isLoggedIn" to="/progress">| My progress</router-link>
    </div>
    <div v-if="isLoggedIn" class="userPanel" @click="changeState">
      <img src="../assets/userlogo.png" />
      <span>{{ username }}</span>
      <div class="userMenu" v-show="isUsermenu">
        <button @click="logOut">Log out</button>
      </div>
    </div>
    <div v-if="!isLoggedIn">
      <router-link to="/registration">Sign up</router-link> |
      <router-link to="/login">Login</router-link>
    </div>
  </div>
</template>


<script lang="ts">
import { defineComponent } from "vue";
import AuthService from "@/services/AuthService";
import User from "@/models/User";

export default defineComponent({
  name: "Header",
  data() {
    return {
      isUsermenu: false as boolean,
      username: "" as string,
    };
  },
  methods: {
    changeState() {
      this.isUsermenu = !this.isUsermenu;
    },
    logOut() {
      this.$store.dispatch("logout");
      this.$router.push("/");
    },
    getUsername() {
      AuthService.getUserData()
        .then((user: User) => (this.username = user.username))
        .catch((err: any) => console.log(err));
    },
  },
  computed: {
    isLoggedIn() {
      if (this.$store.getters.getToken) {
        this.getUsername();
      }
      return this.$store.getters.getToken;
    },
  },
});
</script>


<style lang="scss" scoped>
$header-height: 50px;

.nav {
  height: $header-height;
  padding: 30px;
  display: flex;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
}

.userPanel {
  position: relative;
  display: flex;
  cursor: pointer;

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

.userMenu {
  position: absolute;
  top: 50px;
  background: rgb(179, 179, 179);
}

.logo {
  height: $header-height;
  margin-right: 10px;
}
</style>