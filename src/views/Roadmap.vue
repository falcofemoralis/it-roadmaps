<template>
  <div>
    <h1>This is an roadmap page of {{ $route.params.id }}</h1>
    <ul class="roadmap">
      <li
        class="roadmap-block"
        v-for="(parentNode, index) in roadmapData"
        :key="index"
      >
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
                <RoadmapNode :node="node" />
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
import RoadmapNode from "../components/RoadmapNode.vue";

let roadmapData = [
  new Node("Internet", {
    opinion: Opinion.Recommended,
    tasks: [
      new Task("How does the internet work?", Opinion.Recommended),
      new Task("What is HTTP", Opinion.Recommended),
      new Task("Browsers and how they work?", Opinion.Recommended),
      new Task("DNS and how it works?", Opinion.Recommended),
      new Task("What is Domain Name?", Opinion.Recommended),
      new Task("What is hosting?", Opinion.Recommended),
    ],
  }),
  new Node("HTML", {
    tasks: [
      new Task("Learn the basisc", Opinion.Recommended),
      new Task("Writing Semantic HTML", Opinion.Extra),
      new Task("Forms and validation", Opinion.Recommended),
      new Task("Conventions and Best Practices", Opinion.Recommended),
      new Task("Accessibility", Opinion.Extra),
      new Task("SEO Basics", Opinion.Extra),
    ],
  }),
  new Node("Build Tools", {
    childNodes: [
      new Node("Listeners and formatters", {
        tasks: [
          new Task("Prettier", Opinion.Recommended),
          new Task("ESLint", Opinion.Recommended),
          new Task("StandartJS", Opinion.Recommended),
        ],
      }),
      new Node("Task Runners", {
        tasks: [
          new Task("npm scripts", Opinion.Recommended),
          new Task("Gulp", Opinion.Recommended),
        ],
      }),
      new Node("Module Bundlers", {
        tasks: [
          new Task("Webpack", Opinion.Recommended),
          new Task("Rollup", Opinion.Recommended),
          new Task("Parcel", Opinion.Recommended),
        ],
      }),
    ],
  }),
];

export default defineComponent({
  components: {
    RoadmapNode,
  },
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


<style lang="scss" scoped>
.roadmap {
  padding: 20px 0 20px;
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: #fafafa;

  /*   &:before {
    top: 0;
    bottom: 0;
    position: absolute;
    content: " ";
    width: 3px;
    background-color: rgb(0, 0, 0);
    left: 50%;
  } */

  .roadmap-block {
    margin-bottom: 50px;
    display: flex;
    justify-content: center;
  }

  .roadmap-nodes {
    display: flex;
    align-items: center;
    flex-direction: row;
  }

  .roadmap-inverted {
    flex-direction: row-reverse;
  }
}

.wrapper {
  max-width: none !important;
}
</style>