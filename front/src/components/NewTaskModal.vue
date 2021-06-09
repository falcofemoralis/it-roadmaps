<template>
  <DataModal @saveModal="saveTaskModal" @close="$emit('close')">
    <template v-slot:header>
      <span>Enter task info</span>
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
import Opinion from "@/models/Opinion";
import RoadmapService from "@/services/RoadmapService";

export default defineComponent({
  name: "NewTaskModal",
  components: {
    DataModal,
  },
  data() {
    return {
      name: "" as string,
      description: "" as string,
      opinionId: "" as string,
      opinions: [] as Opinion[],
    };
  },
  created() {
    RoadmapService.getOpinions().then((opinions) => {
      this.opinions = opinions;
    });
  },
  methods: {
    saveTaskModal() {
      this.$emit("save", this.name, this.description, this.opinionId);

      this.name = "";
      this.description = "";
      this.opinionId = "";
    },
  },
});
</script>