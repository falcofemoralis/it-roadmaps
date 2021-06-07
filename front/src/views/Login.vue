<template>
  <div>
    <h1>Login</h1>
    <input type="text" placeholder="Username" v-model="username" />
    <input type="text" placeholder="Password" v-model="password" />
    <input type="button" @click="login" value="Login" />
    <span v-if="msg">{{ msg }}</span>
  </div>
</template>


<script lang="ts">
import AuthService from "@/services/AuthService.js";
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      username: "",
      password: "",
      msg: "",
    };
  },
  methods: {
    async login() {
      try {
        const credentials = {
          username: this.username,
          password: this.password,
        };
        const response = await AuthService.login(credentials);
        this.msg = response.msg;

        const token = response.token;
        const user = response.user;

        this.$store.dispatch("login", { token, user });
        this.$router.push("/");
      } catch (error) {
        this.msg = error.response.data.msg;
      }
    },
  },
});
</script>