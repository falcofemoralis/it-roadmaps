<template>
  <div class="home">
    <ul class="roadmap__shelf">
      <li v-for="roadmap in roadmaps" :key="roadmap.id">
        <RoadmapCard :roadmap="roadmap" />
      </li>
      <li>
        <button class="add-btn" @click="createRoadmap">+</button>
      </li>
    </ul>
    <NewRoadmapModal
      v-show="roadmapDataActive"
      @save="saveRoadmap"
      @close="close"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import RoadmapCard from "@/components/RoadmapCard.vue";
import NewRoadmapModal from "@/components/NewRoadmapModal.vue";
import Roadmap from "@/models/Roadmap";
import RoadmapsService from "@/services/RoadmapService";

export default defineComponent({
  components: {
    RoadmapCard,
    NewRoadmapModal,
  },
  data() {
    return {
      roadmaps: [] as Roadmap[],
      roadmapDataActive: false as boolean,
    };
  },
  created() {
    RoadmapsService.getRoadmaps()
      .then((roadmaps: Roadmap[]) => {
        this.roadmaps = roadmaps;
      })
      .catch((err) => console.log(err));
  },
  methods: {
    createRoadmap() {
      this.roadmapDataActive = true;
    },
    close() {
      this.roadmapDataActive = false;
    },
    saveRoadmap(name: string, description: string) {
      const roadmap = new Roadmap("", name, description);

      RoadmapsService.saveRoadmap(roadmap)
        .then((id) => {
          roadmap.id = id;
          this.roadmaps.push(roadmap);
          this.roadmapDataActive = false;
        })
        .catch((err) => console.log(err));
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