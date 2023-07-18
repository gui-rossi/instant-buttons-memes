<template>
  <Navbar />
  <div class="app">
    <div class="background-buttons">
      <InstantButton v-for="instant in listOfInstants" :key="instant" />
    </div>
  </div>
  <!-- <AdSense /> -->
</template>

<script>
/* eslint-disable */
import InstantButton from '../src/components/instant-button/instant-button.vue'
import Navbar from '../src/components/navbar/navbar.vue'
import AdSense from '../src/components/footer/adsense.vue'
import Loader from '../src/components/loader/loader.vue'


export default {
  name: 'App',
  components: {

  },
  data: function () {
    return {
      myImage: null,
      listOfInstants: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],

    }
  },
  components: {
    InstantButton,
    Navbar,
    AdSense,
    Loader
  },
  mounted: function () {

  },
  methods: {
  },
}
</script>

<style>
body {
  margin: 0;
}

.app {
  display: flex;
  justify-content: center;
  background-color: #3F3F3F;
  
  padding-top: 85px;
}

.background-buttons {
  width: 400px;
  text-align: center;

  display: flex;
  justify-content: space-evenly;
  text-align: center;
  flex-wrap: wrap;
}

</style>
