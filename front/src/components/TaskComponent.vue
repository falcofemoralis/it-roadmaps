<template>
  <div class="task">
    <span class="task-name"> {{ name }}</span>
    <span class="task-description" v-if="description">
      {{ description }}
    </span>
    <slot name="controls" />
    <div
      v-if="opinionId"
      class="opinion"
      :style="'background:' + opinion.color"
    >
      ✓
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Opinion from "@/models/Opinion";
import RoadmapService from "@/services/RoadmapService";

export default defineComponent({
  name: "TaskComponent",
  props: {
    name: { type: String, required: true },
    description: { type: String, required: true },
    opinionId: { type: String, required: true },
  },
  data() {
    return {
      opinion: {} as Opinion,
    };
  },
  created() {
    RoadmapService.getOpinions().then((opinions) => {
      const opinion = RoadmapService.getOpinionById(opinions, this.opinionId);

      if (opinion) {
        this.opinion = opinion;
      }
    });
  },
});
</script>

<style lang="scss" scoped>
@import "@/styles/elements.scss";

.task {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  min-height: 150px;
  min-width: 225px;
  max-width: 250px;
  font-size: 14px;
  border-radius: 5px;
  background: #69b7fe;
  padding: 20px;

  .task-name {
    height: auto;
    width: 100%;
    padding: 8px;
    color: #145796;
    font-weight: bold;
    font-size: 18px;
    text-align: start;
  }

  .task-description {
    height: auto;
    width: 100%;
    text-align: start;
  }

  .opinion {
    @extend %opinion;
  }
}
</style>