<template>
  <div class="app">
    <div class="background-buttons">

      <!-- <button @click="this.takePicture">TIRE FOTO</button> -->
      <InstantButton v-for="instant in listOfInstants" :key="instant" />

    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { Camera, CameraResultType } from '@capacitor/camera'
import InstantButton from '../src/components/instant-button/instant-button.vue'
import { App } from '@capacitor/app'

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
    getRandomColor: function () {
      const randomIndex = Math.floor(Math.random() * this.colors.length);
      return 'background-color: ' + this.colors[randomIndex];
    },
    takePicture: async function () {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri
      }).catch(err => console.log("ERROR"));

      if (image) {
        var imageUrl = image.webPath;

        this.myImage = imageUrl;
      }
    },
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
  width: 300px;
  text-align: center;

  display: flex;
  justify-content: center;
  text-align: center;
  flex-wrap: wrap;
}
</style>
