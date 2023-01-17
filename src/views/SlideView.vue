<template>
  <div id="carousel" class="carousel slide container">
    <div class="carousel-inner">
      <div class="carousel-item active">
        <img src="/assets/slides/0.png" class="d-block w-100" alt="">
      </div>
      <div class="carousel-item">
        <img src="/assets/slides/0.png" class="d-block w-100" alt="">
      </div>
      <template v-for="i in Array(10).fill(0).map((_, idx) => idx)" v-bind:key="i">
        <div class="carousel-item">
          <img :src="'/assets/slides/' + i + '.png'" class="d-block w-100" alt="">
        </div>
      </template>
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#carousel" data-bs-slide="prev"></button>
    <button class="carousel-control-next" type="button" data-bs-target="#carousel" data-bs-slide="next"></button>
  </div>

</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SlideView',
  created() {
    document.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        if (!document.fullscreenElement) {
          document.getElementById('carousel')?.requestFullscreen();
        } else if (document.exitFullscreen) {
          document.exitFullscreen();
        }
      }
    }, false);
  }
})
</script>

<style>
#carousel {
  display: block;
}
</style>