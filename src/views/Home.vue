<template>
  <div class="home">
    <ul class="roadmap__shelf">
      <li v-for="roadmap in roadmaps" :key="roadmap">
        <RoadmapCard :roadmapName="roadmap" />
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import RoadmapCard from "../components/RoadmapCard.vue";

export default defineComponent({
  components: {
    RoadmapCard,
  },
  data() {
    return {
      roadmaps: ["11", "12", "13", "14"],
    };
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
}
</style>