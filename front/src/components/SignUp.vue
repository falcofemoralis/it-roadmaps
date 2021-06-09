<template>
  <div>
    <DataModal @saveModal="signUp" @close="close">
      <template v-slot:header>
        <h2>Sign Up</h2>
      </template>
      <template v-slot:body>
        <input type="text" placeholder="Username" v-model="username" />
        <input type="text" placeholder="Password" v-model="password" />
        <input
          type="text"
          placeholder="Password (repeat)"
          v-model="rePassword"
        />
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
  name: "SignUp",
  components: {
    DataModal,
  },
  data() {
    return {
      username: "" as string,
      password: "" as string,
      rePassword: "" as string,
      msg: "" as string,
    };
  },
  methods: {
    signUp() {
      const credentials = {
        username: this.username,
        password: this.password,
        rePassword: this.rePassword,
      };
      AuthService.register(credentials)
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