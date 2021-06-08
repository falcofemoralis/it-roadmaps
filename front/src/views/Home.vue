<template>
  <div class="home">
    <ul class="roadmap__shelf">
      <li v-for="roadmap in roadmaps" :key="roadmap._id">
        <RoadmapCard :roadmap="roadmap" />
      </li>
      <li>
        <button class="add-btn" @click="createRoadmap">+</button>
      </li>
    </ul>
    <DataModal v-show="roadmapDataActive" @save="saveRoadmap" @close="close">
      <template v-slot:header>
        <span>Enter roadmaps info</span>
      </template>
      <template v-slot:body>
        <div>
          <label>Name: </label>
          <input type="text" v-model="roadmapTmp.name" />
        </div>
        <div>
          <label>Description: </label>
          <input type="text" v-model="roadmapTmp.description" />
        </div>
      </template>
    </DataModal>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { plainToClass } from "class-transformer";
import RoadmapCard from "@/components/RoadmapCard.vue";
import DataModal from "@/components/DataModal.vue";
import Roadmap from "@/models/Roadmap";
import RoadmapsService from "@/services/RoadmapService";

export default defineComponent({
  components: {
    RoadmapCard,
    DataModal,
  },
  data() {
    return {
      roadmaps: [] as Array<Roadmap>,
      roadmapTmp: {} as Roadmap,
      roadmapDataActive: false as boolean,
    };
  },
  async created() {
    this.roadmaps = await RoadmapsService.getRoadmaps();
  },
  methods: {
    close() {
      this.roadmapDataActive = false;
    },
    createRoadmap() {
      this.roadmapTmp = new Roadmap("", "", "");
      this.roadmapDataActive = true;
    },
    async saveRoadmap() {
      const id = await RoadmapsService.saveRoadmap(this.roadmapTmp);
      this.roadmapTmp.id = id;
      this.roadmaps.push(this.roadmapTmp);
      this.roadmapDataActive = false;
    },
  },
});
</script>

<style lang="scss" scoped>
.roadmap__shelf {
  display: grid;
  grid-gap: 24px;
  grid-template-columns: repeat(3, 1fr);

  li {
    margin: 8px;
  }

  .add-btn {
    height: 60px;
    width: 60px;
    font-size: 20px;
    border: none;
    cursor: pointer;
    border-radius: 8px;
    background: #b4b4b4;
    color: #fff;
    filter: drop-shadow(0 0 4px #cecece);
  }
}
</style>