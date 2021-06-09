<template>
  <DataModal @saveModal="saveNodeModal" @close="$emit('close')">
    <template v-slot:header>
      <span>Enter node info</span>
    </template>
    <template v-slot:body>
      <div>
        <label>Name: </label>
        <input type="text" v-model="name" />
      </div>
      <select v-model="opinionId">
        <option
          v-for="(opinion, index) in opinions"
          :key="index"
          :value="opinion.id"
          :style="'color: ' + opinion.color"
        >
          {{ opinion.name }}
        </option>
      </select>
    </template>
  </DataModal>
</template>


<script lang="ts">
import { defineComponent, PropType } from "vue";
import DataModal from "@/components/DataModal.vue";
import Opinion from "@/models/Opinion";

export default defineComponent({
  name: "NewNodeModal",
  components: {
    DataModal,
  },
  props: {
    opinions: { type: Array as PropType<Array<Opinion>>, required: true },
  },
  data() {
    return {
      name: "" as string,
      opinionId: null as string | null,
    };
  },
  methods: {
    saveNodeModal() {
      this.$emit("save", this.name, this.opinionId);

      this.name = "";
      this.opinionId = "";
    },
  },
});
</script>