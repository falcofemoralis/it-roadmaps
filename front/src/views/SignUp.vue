<template>
  <div>
    <h1>Sign Up</h1>
    <input type="text" placeholder="Username" v-model="username" />
    <input type="text" placeholder="Password" v-model="password" />
    <input type="text" placeholder="Password (repeat)" v-model="rePassword" />
    <input type="button" @click="signUp" value="Sign Up" />
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
      rePassword: "" as string,
      msg: "" as string,
    };
  },
  methods: {
    async signUp() {
      try {
        const credentials = {
          username: this.username,
          password: this.password,
          rePassword: this.rePassword,
        };
        const response = await AuthService.signUp(credentials);
        this.msg = response.msg;
        this.$router.push("/");
      } catch (error) {
        this.msg = error.response.data.msg;
      }
    },
  },
});
</script>