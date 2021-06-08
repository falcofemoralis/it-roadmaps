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
import AuthService from "@/services/AuthService";
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      username: "" as string,
      password: "" as string,
      msg: "" as string,
    };
  },
  methods: {
    login() {
      const credentials = {
        username: this.username,
        password: this.password,
      };
      AuthService.login(credentials)
        .then((res) => {
          this.$store.dispatch("login", { token: res.token });
          this.$router.push("/");
        })
        .catch((err) => (this.msg = err));
    },
  },
});
</script>