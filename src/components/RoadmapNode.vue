<template>
  <div class="roadmap-node">
    <h3 class="node-name">
      {{ node.name }}
    </h3>
    <ul v-if="node.tasks" class="roadmap-tasks">
      <li v-for="(task, index) in node.tasks" :key="index">
        <div class="roadmap-task">
          <span class="task-name"> {{ task.name }}</span>
          <span
            v-if="task.opinion"
            class="opinion"
            :style="'background:' + task.opinion"
            >✓
          </span>
        </div>
      </li>
    </ul>
    <span
      v-if="node.opinion"
      class="opinion"
      :style="'background:' + node.opinion"
      >✓
    </span>
  </div>
</template>


<script lang="ts">
import { defineComponent } from "vue";
import Node, { Opinion } from "../models/Node";

export default defineComponent({
  name: "RoadmapNode",
  props: {
    node: {
      type: Node,
      required: true,
    },
  },
  methods: {},
});
</script>


<style lang="scss" scoped>
.roadmap-node {
  position: relative;
  min-width: 250px;
  height: fit-content;
  padding: 16px;
  margin: 15px;
  border-radius: 8px;
  background: #ffffff;
  box-shadow: rgb(0 0 0 / 12%) 0px 5px 10px;

  .node-name {
    font-weight: 600;
    font-size: 20px;
    line-height: 24px;
    color: rgb(114, 114, 114);
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    justify-content: center;
    padding: 8px;
  }

  .roadmap-tasks {
    display: grid;
    grid-gap: 24px;
    grid-template-columns: repeat(3, 1fr);

    .roadmap-task {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      min-height: 40px;
      font-size: 14px;
      border-radius: 8px;
      background: #69b7fe;
      padding: 20px;
      cursor: pointer;

      .task-name {
        padding: 8px;
        color: #145796;
        font-weight: bold;
        font-size: 18px;
      }
    }
  }

  .opinion {
    position: absolute;
    top: -12px;
    left: -12px;
    font-size: 18px;
    height: 24px;
    width: 24px;
    color: #fff;
    border-radius: 24px;
  }
}
</style>
