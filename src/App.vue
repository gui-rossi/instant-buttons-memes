<template>
  <div class="app">
    <div class="background-buttons">

      <InstantButton v-for="instant in listOfInstants" :key="instant" />

    </div>
  </div>
</template>

<script>
/* eslint-disable */
import InstantButton from '../src/components/instant-button/instant-button.vue'

export default {
  name: 'App',
  components: {

  },
  data: function () {
    return {
      myImage: null,
      listOfInstants: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],

    }
  },
  components: {
    InstantButton
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
  background-color: #18191A;
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
