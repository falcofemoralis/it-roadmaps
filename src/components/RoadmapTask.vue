<template>
  <div class="action__block">
    <div class="action">
      {{ task.text }}
    </div>
    <span class="opinion">
      {{ getOpinion(action.opinion) }}
    </span>
  </div>
</template>


<script lang="ts">
import { defineComponent } from "vue";
import Task, { Opinion } from "../models/Task";

export default defineComponent({
  name: "RoadmapTask",
  props: {
    task: {
      type: Task,
      required: true,
    },
  },
  methods: {
    getOpinion(opinion: Opinion) {
      switch (opinion) {
        case Opinion.recommended:
          return "+";
        case Opinion.alternative:
          return "=";
        case Opinion.extra:
          return "-";
        default:
          return "0";
      }
    },
  },
});
</script>


<style lang="scss" scoped>
.action__block {
  position: relative;

  .opinion {
    position: absolute;
    top: -2px;
    left: -2px;
    font-size: 18px;
  }

  .action {
    float: left;
    width: 120px;
    background-color: rgb(60, 255, 0);
    padding: 8px;
    margin: 8px 0 0 0;
  }
}
</style>
