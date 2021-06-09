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
import { defineComponent } from "vue";
import DataModal from "@/components/DataModal.vue";
import RoadmapService from "@/services/RoadmapService";
import Opinion from "@/models/Opinion";

export default defineComponent({
  name: "NewNodeModal",
  components: {
    DataModal,
  },
  data() {
    return {
      name: "" as string,
      opinionId: null as string | null,
      opinions: [] as Opinion[],
    };
  },
  created() {
    RoadmapService.getOpinions().then((opinions) => {
      this.opinions = opinions;
    });
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