<template>
  <div class="card">
    <router-link :to="{ name: 'roadmap', params: { id: roadmap.id } }">
      <img
        class="card__preview"
        src="../assets/card_preview.png"
        alt="preview"
      />
    </router-link>
    <div class="card__about">
      <h3>{{ roadmap.name }}</h3>
      <span>{{ roadmap.description }}</span>
      <a href="">Open roadmap</a>
    </div>
  </div>
</template>


<script>
import { defineComponent } from "vue";
import Roadmap from "@/models/Roadmap";

export default defineComponent({
  name: "RoadmapCard",
  props: {
    roadmap: {
      type: Roadmap,
      required: true,
    },
  },
});
</script>


<style lang="scss" scoped>
$corner_R: 8px;

.card {
  height: auto;
  width: 100%;
  border-radius: $corner_R;
  background: #ffffff;
  filter: drop-shadow(0 0 4px #cecece);

  .card__preview {
    border: 0;
    height: auto;
    width: 100%;
    max-width: 100%;
    border-radius: $corner_R $corner_R 0 0;
  }

  .card__about {
    display: flex;
    flex-direction: column;
    border-radius: 0 0 $corner_R $corner_R;
    h3,
    span {
      text-align: start;
      padding: 16px;
    }

    h3 {
      font-size: 26px;
      font-weight: bold;
    }

    span {
      font-size: 16px;
    }

    a {
      padding: 8px;
      font-size: 16px;
    }
  }
}
</style>
