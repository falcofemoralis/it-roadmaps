<template>
  <div>
    <DataModal @saveModal="login" @close="close">
      <template v-slot:header>
        <h2>Login</h2>
      </template>
      <template v-slot:body>
        <input type="text" placeholder="Username" v-model="username" />
        <input type="text" placeholder="Password" v-model="password" />
      </template>
      <template v-slot:footer>
        <span v-if="msg">{{ msg }}</span>
      </template>
    </DataModal>
  </div>
</template>


<script lang="ts">
import { defineComponent } from "vue";
import AuthService from "@/services/AuthService";
import DataModal from "@/components/DataModal.vue";

export default defineComponent({
  name: "Login",
  components: {
    DataModal,
  },
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
        .then((token) => {
          this.$store.dispatch("login", { token: token });
          close();
          this.$router.push("/");
        })
        .catch((err) => (this.msg = err));
    },
    close() {
      this.$emit("close");
    },
  },
});
</script>