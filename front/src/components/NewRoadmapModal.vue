<template>
  <DataModal @saveModal="saveRoadmapModal" @close="$emit('close')">
    <template v-slot:header>
      <span>Enter roadmaps info</span>
    </template>
    <template v-slot:body>
      <div>
        <label>Name: </label>
        <input type="text" v-model="name" />
      </div>
      <div>
        <label>Description: </label>
        <input type="text" v-model="description" />
      </div>
    </template>
  </DataModal>
</template>


<script lang="ts">
import { defineComponent } from "vue";
import DataModal from "@/components/DataModal.vue";

export default defineComponent({
  name: "NewRoadmapModal",
  components: {
    DataModal,
  },
  data() {
    return {
      name: "" as string,
      description: "" as string,
    };
  },
  methods: {
    saveRoadmapModal() {
      this.$emit("save", this.name, this.description);

      this.name = "";
      this.description = "";
    },
  },
});
</script>


<style lang="scss">
</style>