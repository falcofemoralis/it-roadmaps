<template>
  <div class="roadmap-node">
    <h3 class="node-name">
      {{ node.name }}
    </h3>
    <ul v-if="node.tasks" class="roadmap-tasks">
      <li v-for="(task, index) in node.tasks" :key="index">
        <TaskComponent
          :opinions="opinions"
          :name="task.name"
          :description="task.description"
          :opinionId="task.opinionId"
        >
          <template v-slot:controls>
            <div class="task-controls" v-if="$store.state.token">
              <span v-if="!task.isCompleted" @click="saveProgress(true, task)">
                I know it
              </span>
              <span v-else @click="saveProgress(false, task)">
                I forget this
              </span>
            </div>
            <div class="task-controls" v-else>
              <span @click="showAlert">I know it</span>
            </div>
          </template>
        </TaskComponent>
      </li>
    </ul>
    <slot name="addTask" />
    <span
      v-if="node.opinionId"
      class="opinion"
      :style="'background:' + opinion.color"
    >
      ✓
    </span>
  </div>
</template>


<script lang="ts">
import { defineComponent, PropType } from "vue";
import Node from "@/models/Node";
import Task from "@/models/Task";
import TaskComponent from "@/components/TaskComponent.vue";
import Opinion from "@/models/Opinion";
import RoadmapService from "@/services/RoadmapService";

export default defineComponent({
  name: "RoadmapNode",
  components: {
    TaskComponent,
  },
  props: {
    node: {
      type: Node,
      required: true,
    },
    opinions: { type: Array as PropType<Array<Opinion>>, required: true },
  },
  data() {
    return {
      currentModal: -1 as number,
      opinion: {} as Opinion,
    };
  },
  created() {
    if (this.node.opinionId) {
      const opinion = RoadmapService.getOpinionById(
        this.opinions,
        this.node.opinionId
      );

      if (opinion) {
        this.opinion = opinion;
      }
    }
  },
  methods: {
    showMsg(msg: string) {
      alert(msg);
    },
    saveProgress(isCompleted: boolean, task: Task) {
      task.isCompleted = !task.isCompleted;
      this.$emit("progress", isCompleted, this.node.id, task.id);
    },
    showAlert() {
      alert("Sign up or login to achieve it!");
    },
  },
});
</script>


<style lang="scss" scoped>
@import "@/styles/elements.scss";

.roadmap-node {
  position: relative;
  min-width: 250px;
  height: fit-content;
  padding: 16px;
  margin: 15px;
  border-radius: 8px;
  background: #ffffff;
  box-shadow: rgb(0 0 0 / 12%) 0px 5px 10px;
  display: flex;
  flex-direction: column;
  align-items: center;

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
  }
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

.opinion {
  @extend %opinion;
}
</style>
