<template>
  <div class="roadmap-node">
    <h3 class="node-name">
      {{ node.name }}
    </h3>
    <ul v-if="node.tasks" class="roadmap-tasks">
      <li v-for="(task, index) in node.tasks" :key="index">
        <div class="roadmap-task">
          <span class="task-name"> {{ task.name }}</span>
          <span class="task-description"> {{ task.description }}</span>
          <div class="task-controls">
            <div>
              <span>×</span>
              <span>✓</span>
            </div>
            <span @click="showMsg('You know it!')">I know it</span>
          </div>
          <div
            v-if="task.opinionId"
            class="opinion"
            :style="'background:' + getOpinion(task.opinionId).color"
          >
            ✓
          </div>
        </div>
      </li>
    </ul>
    <button @click="createTask">New task</button>
    <span
      v-if="node.opinionId"
      class="opinion"
      :style="'background:' + getOpinion(node.opinionId).color"
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
  data() {
    return {
      currentModal: -1 as number,
    };
  },
  methods: {
    showMsg(msg: string) {
      alert(msg);
    },
    createTask() {
      this.$emit("addTask");
    },
    getOpinion(id: string): Opinion | undefined {
      console.log(this.$store.state.opinions);

      return this.$store.state.opinions.find(
        (opinion: Opinion) => opinion._id === id
      );
    },
  },
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
      justify-content: space-between;
      align-items: center;
      flex-direction: column;
      min-height: 150px;
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

      .task-controls {
        width: 100%;
        display: flex;
        justify-content: space-between;
        margin-top: 25px;

        span {
          color: #fff;
          font-weight: bold;
          cursor: pointer;
        }
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
    text-align: center;
  }
}
</style>
