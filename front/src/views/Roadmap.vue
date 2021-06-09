<template>
  <div>
    <div class="roadmap-info">
      <h2>This is an roadmap page of {{ roadmap.name }}</h2>
      <span>Step by step guide to becoming a modern frontend developer</span>
      <!--  <span v-if="msg">{{ msg }}</span> -->
    </div>
    <ul class="roadmap">
      <li
        class="roadmap-block"
        v-for="(block, index) in getRoadmapBlocks()"
        :key="index"
      >
        <ul class="roadmap-nodes">
          <li v-for="(nodes, index) in block" :key="index">
            <ul>
              <li v-for="node in nodes" :key="node.id">
                <RoadmapNode
                  :opinions="opinions"
                  :node="node"
                  @progress="updateProgress"
                >
                  <template v-slot:addTask>
                    <button
                      class="add-btn"
                      @click="createTask(node)"
                      v-if="$store.state.isAdmin"
                    >
                      New task
                    </button>
                  </template>
                </RoadmapNode>
              </li>
            </ul>
          </li>
          <li class="btn-wrapper">
            <button
              class="add-btn"
              @click="createNode(block[0][0].id)"
              v-if="$store.state.isAdmin"
            >
              New node
            </button>
          </li>
        </ul>
      </li>
      <li class="btn-wrapper" v-if="$store.state.isAdmin">
        <button class="add-btn" @click="createBlock">New block</button>
      </li>
    </ul>

    <NewNodeModal
      v-show="nodeModalActive"
      :opinions="opinions"
      @save="saveNode"
      @close="close(0)"
    />
    <NewTaskModal
      v-show="taskModalActive"
      :opinions="opinions"
      @save="saveTask"
      @close="close(1)"
    />
  </div>
</template>


<script lang="ts">
import { defineComponent } from "vue";
import Node from "@/models/Node";
import Task from "@/models/Task";
import RoadmapNode from "@/components/RoadmapNode.vue";
import Roadmap from "@/models/Roadmap";
import RoadmapsService from "@/services/RoadmapService";
import AuthService from "@/services/AuthService";
import NewNodeModal from "@/components/NewNodeModal.vue";
import NewTaskModal from "@/components/NewTaskModal.vue";
import Progress from "@/models/Progress";
import Opinion from "@/models/Opinion";

export default defineComponent({
  components: {
    RoadmapNode,
    NewNodeModal,
    NewTaskModal,
  },
  data() {
    return {
      roadmap: {} as Roadmap,
      roadmapData: [] as Node[],
      nodeModalActive: false as boolean,
      taskModalActive: false as boolean,
      msg: "" as string,
      parentIdTmp: null as string | null,
      nodeTmp: {} as Node,
      progress: [] as Progress[],
      opinions: [] as Opinion[],
    };
  },
  created() {
    // Download roadmap
    RoadmapsService.getRoadmap(this.$route.params.id as string)
      .then((roadmap) => {
        this.roadmap = roadmap;

        RoadmapsService.getOpinions()
          .then((opinions) => {
            this.opinions = opinions;
          })
          .catch((err) => (this.msg = err));

        // Download roadmap data (nodes)
        RoadmapsService.getRoadmapData(this.roadmap.id as string)
          .then((roadmapData) => (this.roadmapData = roadmapData))
          .catch((err) => (this.msg = err));

        // Download user progress
        AuthService.getProgress(this.roadmap.id as string)
          .then((progress) => (this.progress = progress))
          .catch((err) => (this.msg = err));
      })
      .catch((err) => (this.msg = err));
  },
  methods: {
    getRoadmapBlocks() {
      const blocks: Node[][][] = [];

      for (let i = 0; i < this.progress.length; i++) {
        this.applyProgress(this.progress[i]);
      }

      for (let i = 0; i < this.roadmapData.length; i++) {
        if (!this.roadmapData[i].parentId) {
          blocks.push([[this.roadmapData[i]]]);
        }
      }

      for (let i = 0; i < this.roadmapData.length; i++) {
        for (let j = 0; j < blocks.length; ++j) {
          if (blocks[j][0][0].id === this.roadmapData[i].parentId) {
            if (!blocks[j][1]) blocks[j][1] = [];
            blocks[j][1].push(this.roadmapData[i]);
          }
        }
      }

      return blocks;
    },
    applyProgress(progress: Progress) {
      for (let j = 0; j < this.roadmapData.length; j++) {
        const node = this.roadmapData[j];

        if (progress.nodeId === node.id && node.tasks) {
          for (let n = 0; n < node.tasks.length; n++) {
            const task = node.tasks[n];

            if (task.id === progress.taskId) {
              task.isCompleted = progress.isCompleted;
            }
          }
        }
      }
    },
    createBlock() {
      this.nodeModalActive = true;
    },
    createNode(parentId: string) {
      this.parentIdTmp = parentId;
      this.nodeModalActive = true;
    },
    saveNode(name: string, opinionId: string) {
      const node = new Node("", this.roadmap.id as string, name, {
        opinionId: opinionId,
        parentId: this.parentIdTmp,
      });

      if (this.parentIdTmp) {
        this.parentIdTmp = null;
      }

      RoadmapsService.saveNode(node)
        .then((id) => {
          node.id = id;

          this.nodeModalActive = false;
          this.roadmapData.push(node);
        })
        .catch((err) => console.log(err));
    },
    createTask(node: Node) {
      this.nodeTmp = node;
      this.taskModalActive = true;
    },
    saveTask(name: string, description: string, opinionId: string) {
      const task = new Task("", name, description, opinionId);
      const tasks = this.nodeTmp.tasks ?? [];
      tasks.push(task);

      RoadmapsService.updateNode(this.nodeTmp.id, { tasks: tasks })
        .then(() => {
          /*  for (let i = 0; i < this.roadmapData.length; i++) {
            if (this.roadmapData[i].id == updatedNode.id) {
              this.roadmapData[i] = updatedNode;
              console.log(this.roadmapData[i]);

              break;
            }
          } */

          this.taskModalActive = false;
        })
        .catch((err) => console.log(err));
    },
    close(modal: number) {
      if (modal === 0) {
        this.nodeModalActive = false;
      } else if (modal === 1) {
        this.taskModalActive = false;
      }
    },
    updateProgress(isCompleted: boolean, nodeId: string, taskId: string) {
      AuthService.updateProgress(
        this.roadmap.id as string,
        nodeId,
        taskId,
        isCompleted
      ).catch((err) => console.log(err));
    },
  },
});
</script>


<style lang="scss" scoped>
@import "@/styles/elements.scss";

.roadmap-info {
  @extend %info;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.roadmap {
  @extend %timeline-page;
  display: flex;
  flex-direction: column;
  align-items: center;

  .roadmap-block {
    margin-bottom: 50px;
    display: flex;
    justify-content: center;
  }

  .roadmap-nodes {
    display: flex;
    align-items: center;
    flex-direction: column;
  }
}

%btn {
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  padding: 8px;
  height: 35px;
  width: 125px;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  margin: 10px;
}

.save-btn {
  @extend %btn;
  background-color: rgb(42, 192, 92);
}

.add-btn {
  @extend %btn;
  background-color: rgb(30, 153, 230);
}

.btn-wrapper {
  z-index: 1;
}
</style>