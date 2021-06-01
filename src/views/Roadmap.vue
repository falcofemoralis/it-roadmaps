<template>
  <div>
    <h1>This is an roadmap page of {{ $route.params.id }}</h1>
    <ul class="roadmap">
      <li
        class="roadmap-block"
        v-for="(parentNode, index) in roadmapData"
        :key="index"
      >
        <!-- Roadmap-block -->
        <ul
          class="roadmap-nodes"
          :class="index % 2 == 0 ? 'roadmap-inverted' : ''"
        >
          <li
            v-for="(block, index) in getRoadmapBlocks(parentNode)"
            :key="index"
          >
            <ul>
              <li v-for="(node, index) in block" :key="index">
                <div class="roadmap-node">
                  <h3>{{ node.name }}</h3>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Node, { Opinion } from "../models/Node";
import Task from "../models/Task";

let roadmapData = [
  new Node("Internet", {
    childNodes: [
      new Task("How does the internet work?", { opinion: Opinion.Recommended }),
      new Node("What is HTTP", { opinion: Opinion.Recommended }),
      new Node("Browsers and how they work?", { opinion: Opinion.Recommended }),
      new Node("DNS and how it works?", { opinion: Opinion.Recommended }),
      new Node("What is Domain Name?", { opinion: Opinion.Recommended }),
      new Node("What is hosting?", { opinion: Opinion.Recommended }),
    ],
  }),
  new Node("Build Tools", {
    childNodes: [
      new Node("Listeners and formatters", {
        childNodes: [
          new Node("Prettier", { opinion: Opinion.Recommended }),
          new Node("ESLint", { opinion: Opinion.Recommended }),
          new Node("StandartJS", { opinion: Opinion.Recommended }),
        ],
      }),
      new Node("Task Runners", {
        childNodes: [
          new Node("npm scripts", { opinion: Opinion.Recommended }),
          new Node("Gulp", { opinion: Opinion.Recommended }),
        ],
      }),
      new Node("Module Bundlers", {
        childNodes: [
          new Node("Webpack", { opinion: Opinion.Recommended }),
          new Node("Rollup", { opinion: Opinion.Recommended }),
          new Node("Parcel", { opinion: Opinion.Recommended }),
        ],
      }),
    ],
  }),
];

export default defineComponent({
  components: {},
  data() {
    return {
      roadmapData: roadmapData,
    };
  },
  methods: {
    getRoadmapBlocks(parentNode: Node) {
      let blocks: Node[][] = [];
      let n = 0;
      let isChildNodes = true;
      blocks.push([parentNode]);

      while (isChildNodes) {
        let moreChildNodes = false;
        let block: Node[] = [];

        for (let i = 0; i < blocks[n].length; i++) {
          let node: Node = blocks[n][i];

          if (node.childNodes) {
            for (let j = 0; j < node.childNodes.length; ++j) {
              if (node.childNodes[j].childNodes) moreChildNodes = true;
              block.push(node.childNodes[j]);
            }
          }
        }

        blocks.push(block);
        n++;
        isChildNodes = moreChildNodes;
      }

      return blocks;
    },
  },
});
</script>


<style lang="scss">
.roadmap {
  padding: 20px 0 20px;
  position: relative;
  display: flex;
  flex-direction: column;

  &:before {
    top: 0;
    bottom: 0;
    position: absolute;
    content: " ";
    width: 3px;
    background-color: rgb(0, 0, 0);
    left: 50%;
  }

  .roadmap-block {
    margin-bottom: 50px;
    display: flex;
    justify-content: center;
  }

  .roadmap-node {
    width: 100px;
    height: 36px;
    padding: 10px;
    margin: 15px;
    background: #ed8146;
  }

  .roadmap-nodes {
    display: flex;
    align-items: center;
    flex-direction: column;
  }

  .roadmap-inverted {
    flex-direction: column;
  }
}
</style>