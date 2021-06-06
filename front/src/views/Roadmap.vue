<template>
  <div>
    <div class="roadmap-info">
      <h2>This is an roadmap page of {{ roadmapId }}</h2>
      <span>Step by step guide to becoming a modern frontend developer</span>
      <button @click="saveRoadmap">Save roadmap</button>
    </div>
    <ul class="roadmap">
      <li
        class="roadmap-block"
        v-for="(block, index) in getRoadmapBlocks(roadmapData)"
        :key="index"
      >
        <ul class="roadmap-nodes">
          <li v-for="(nodes, index) in block" :key="index">
            <ul>
              <li v-for="node in nodes" :key="node.id">
                <RoadmapNode :node="node" @addTask="createTask(node)" />
              </li>
            </ul>
          </li>
          <button @click="createNode(block[0][0].id)">New node</button>
        </ul>
      </li>
    </ul>
    <div style="display: flex; flex-direction: column">
      <button @click="createNode()">New block</button>
    </div>
    <!-- Modal for enter node data -->
    <DataModal v-show="nodeDataActive" @save="saveNode" @close="close(0)">
      <template v-slot:header>
        <span>Enter node info</span>
      </template>
      <template v-slot:body>
        <input type="text" v-model="nodeTmp.name" />
        <select v-model="nodeTmp.opinionId">
          <option
            v-for="(opinion, index) in $store.state.opinions"
            :key="index"
            :value="opinion._id"
            :style="'color: ' + opinion.color"
          >
            {{ opinion.name }}
          </option>
        </select>
      </template>
    </DataModal>
    <!-- Modal for enter task data -->
    <DataModal v-show="taskDataActive" @save="saveTask" @close="close(1)">
      <template v-slot:header>
        <span>Enter task info</span>
      </template>
      <template v-slot:body>
        <input type="text" v-model="taskTmp.name" />
        <input type="text" v-model="taskTmp.description" />
        <select v-model="taskTmp.opinionId">
          <option
            v-for="(opinion, index) in $store.state.opinions"
            :key="index"
            :value="opinion._id"
            :style="'color: ' + opinion.color"
          >
            {{ opinion.name }}
          </option>
        </select>
      </template>
    </DataModal>
  </div>
</template>


<script lang="ts">
import { defineComponent } from "vue";
import Node, { Opinion } from "../models/Node";
import Task from "../models/Task";
import RoadmapNode from "../components/RoadmapNode.vue";
import DataModal from "../components/DataModal.vue";

export default defineComponent({
  components: {
    RoadmapNode,
    DataModal,
  },
  data() {
    return {
      roadmapId: this.$route.params.id as string,
      roadmapData: [] as Array<Node>,
      roadmapDataToSend: [] as Array<Node>,
      roadmapDataToUpdate: [] as Array<Node>,
      nodeDataActive: false as boolean,
      taskDataActive: false as boolean,
      nodeTmp: {} as Node,
      taskTmp: {} as Task,
    };
  },
  async created() {
    //TODO как-то переделать
    const result = await this.$api.roadmaps.getMany<Array<Opinion>>(
      "/opinions"
    );
    if (result) {
      this.$store.state.opinions = result;
      console.log("opinion downloaded");
    }

    const result2 = await this.$api.roadmaps.getMany<Array<Node>>("/");
    if (result2) {
      this.roadmapData = result2;
      console.log("roadmap downloaded");
    }
  },
  methods: {
    getRoadmapBlocks(roadmapData: Node[]) {
      const blocks: Node[][][] = [];

      for (let i = 0; i < roadmapData.length; i++) {
        if (!roadmapData[i].parentId) {
          blocks.push([[roadmapData[i]]]);
        }
      }

      for (let i = 0; i < roadmapData.length; i++) {
        for (let j = 0; j < blocks.length; ++j) {
          if (blocks[j][0][0].id === roadmapData[i].parentId) {
            if (!blocks[j][1]) blocks[j][1] = [];
            blocks[j][1].push(roadmapData[i]);
          }
        }
      }

      return blocks;
    },
    createNode(parentId: number) {
      this.nodeTmp = new Node(this.roadmapId, "", {
        parentId: parentId ?? null,
      });
      this.nodeDataActive = true;
    },
    createTask(node: Node) {
      this.taskDataActive = true;

      this.nodeTmp = node;
      if (!this.nodeTmp.tasks) {
        this.nodeTmp.tasks = [];
      }
      this.taskTmp = new Task("", "");
    },
    saveNode() {
      this.nodeDataActive = false;
      this.roadmapData.push(this.nodeTmp);
      this.roadmapDataToSend.push(this.nodeTmp);
    },
    saveTask() {
      if (this.nodeTmp.tasks) {
        this.nodeTmp.tasks.push(this.taskTmp);
      }

      if (!this.isToUpdate(this.nodeTmp)) {
        this.roadmapDataToUpdate.push(this.nodeTmp);
      }

      //update
      this.taskDataActive = false;
    },
    close(modal: number) {
      if (modal === 0) {
        this.nodeDataActive = false;
      } else if (modal === 1) {
        this.taskDataActive = false;
      }
    },
    isToUpdate(node: Node) {
      const isOnUpdate = this.roadmapDataToUpdate.find(
        (el: Node) => el.id === node.id
      );
      return isOnUpdate;
    },
    async saveRoadmap() {
      if (this.roadmapDataToSend.length > 0) {
        this.$api.roadmaps.post("/", this.roadmapDataToSend);
      }

      if (this.roadmapDataToUpdate.length > 0) {
        this.$api.roadmaps.put("/", this.roadmapDataToUpdate);
      }
    },
  },
});
</script>


<style lang="scss" scoped>
.roadmap-info {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 25px;

  h2 {
    font-weight: 700;
    margin-bottom: 12px;
    font-size: 48px;
  }

  span {
    font-size: 16px;
    color: rgb(68, 68, 68);
  }
}

.roadmap {
  padding: 20px 0 20px;
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: #ebebeb;

  &:before {
    top: 0;
    bottom: 0;
    position: absolute;
    content: " ";
    width: 3px;
    background-color: rgb(102, 102, 102);
    left: 50%;
  }

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

.wrapper {
  max-width: none !important;
}
</style>