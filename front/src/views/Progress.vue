<template>
  <div class="container wrapper">
    <div class="progress-info">
      <span v-if="msg">{{ msg }}</span>
    </div>
    <ul class="timeline">
      <li
        class="timeline-block"
        v-for="(progressTask, index) in getTasks()"
        :key="index"
      >
        <div class="timeline-time">
          {{ progressTask.date }}
        </div>
        <TaskComponent
          :class="index % 2 == 0 ? 'timeline-panel' : 'timeline-panel-inverted'"
          class="timeline-task"
          :name="progressTask.task.name"
          :description="progressTask.task.description"
          :opinionId="progressTask.task.opinionId"
        />
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AuthService from "@/services/AuthService";
import RoadmapsService from "@/services/RoadmapService";
import Progress from "@/models/Progress";
import Node from "@/models/Node";
import { ProgressTask } from "@/models/Progress";
import TaskComponent from "@/components/TaskComponent.vue";

export default defineComponent({
  name: "Progress",
  components: {
    TaskComponent,
  },
  data() {
    return {
      progress: [] as Progress[],
      msg: "" as string,
      roadmapData: [] as Node[],
    };
  },
  created() {
    // Download roadmap data (nodes)
    RoadmapsService.getRoadmapData()
      .then((roadmapData) => (this.roadmapData = roadmapData))
      .catch((err: any) => (this.msg = err));

    // Download user progress
    AuthService.getProgress()
      .then((progress) => (this.progress = progress))
      .catch((err) => (this.msg = err));
  },
  methods: {
    getTasks() {
      const progressTasks: ProgressTask[] = [];

      for (let i = 0; i < this.progress.length; i++) {
        const progressTask = this.progress[i];

        if (progressTask.isCompleted) {
          for (let j = 0; j < this.roadmapData.length; j++) {
            const tasks = this.roadmapData[j].tasks;
            if (tasks) {
              for (let n = 0; n < tasks.length; n++) {
                if (tasks[n].id == progressTask.taskId) {
                  const date: Date = new Date(progressTask.time);
                  progressTasks.push(
                    new ProgressTask(
                      tasks[n],
                      date.getDate() +
                        "/" +
                        (date.getMonth() + 1) +
                        "/" +
                        date.getFullYear() +
                        " " +
                        date.getHours() +
                        ":" +
                        date.getMinutes() +
                        ":" +
                        date.getSeconds()
                    )
                  );
                }
              }
            }
          }
        }
      }

      console.log(progressTasks);

      return progressTasks;
    },
  },
});
</script>

<style lang="scss" scoped>
@import "@/styles/elements.scss";

.progress-info {
  @extend %info;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.timeline {
  @extend %timeline-page;

  /*   %timeline-panel {
    display: flex;
  } */

  .timeline-block {
    position: relative;
    margin-bottom: 150px;
    height: fit-content;

    &:before,
    &:after {
      content: " ";
      display: table;
    }

    .timeline-panel {
      float: left;
      margin-left: 15%;
    }

    .timeline-panel-inverted {
      float: right;
      margin-right: 15%;
    }

    .timeline-time {
      position: absolute;
      top: 36px;
      left: 50%;
      text-align: center;
      width: 36px;
      height: 36px;
      line-height: 36px;
      margin-left: -35px;
      z-index: 10;
      transform: rotate(-90deg);
    }

    .timeline-task {
      width: 46%;
      padding: 15px;
      position: relative;
      min-height: auto;
      box-shadow: 0 1px 6px rgb(0 0 0 / 15%);
    }
  }
}
</style>