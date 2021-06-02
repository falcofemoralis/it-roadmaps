<template>
  <div>
    <div class="roadmap-info">
      <h2>This is an roadmap page of {{ $route.params.id }}</h2>
      <span>Step by step guide to becoming a modern frontend developer</span>
    </div>
    <ul class="roadmap">
      <li
        class="roadmap-block"
        v-for="(parentNode, index) in roadmapData"
        :key="index"
      >
        <ul class="roadmap-nodes">
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
  new Node("Version Control Systems", {
    childNodes: [
      new Node("Basic usage of git", { opinion: Opinion.Recommended }),
      new Node("Repo hosting services", {
        tasks: [
          new Task("GitHub", Opinion.Recommended),
          new Task("GitLab", Opinion.Extra),
          new Task("Bitbucket", Opinion.Extra),
        ],
      }),
    ],
  }),
  new Node("Keep learning"),
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