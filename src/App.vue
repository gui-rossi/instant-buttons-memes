<template>
  <div class="app">
    <div class="background-buttons">
      <!-- <button @click="this.takePicture">TIRE FOTO</button> -->

      <div class="instant" v-for="instant in listOfInstants" :key="instant">
        <div class="small-button-background" :style="getRandomColor()"></div>
        <button class="small-button"></button>
        <div class="small-button-shadow"></div>
      </div>

    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { Camera, CameraResultType } from '@capacitor/camera'
import { App } from '@capacitor/app'

export default {
  name: 'App',
  components: {

  },
  data: function () {
    return {
      myImage: null,
      listOfInstants: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      colors: ['#FF0000', '#00FF00', '#0000FF']
    }
  },
  mounted: function () {

  },
  methods: {
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
    getRandomColor: function () {
      const randomIndex = Math.floor(Math.random() * this.colors.length);
      return 'background-color: ' + this.colors[randomIndex];
    }
  },
}
</script>

<style>
.background-buttons {
  width: 300px;
  text-align: center;

  display: flex;
  justify-content: center;
  text-align: center;
  flex-wrap: wrap;
}

.app {
  display: flex;
  justify-content: center;
}

.instant {
  position: relative;
  vertical-align: top;
  text-align: center;
  word-wrap: break-word;

  margin-right: 18px;
  flex-basis: calc((100% - 60px) / 3);
  margin-bottom: 100px;
}

.circle {
  background-color: #00ff00;
}

.small-button-background {
  border-radius: 50%;
  width: 86px;
  height: 84px;
  margin-top: 3px;
  margin-left: 3px;
  position: absolute;
}

.small-button {
  width: 94px;
  height: 89px;
  position: absolute;
  border: 0;
  display: block;
  background: url('/public/up.png') no-repeat;
  z-index: 1;
  outline: none;
}

.small-button:active {
  background: url('/public/down.png') no-repeat;
}

.small-button-shadow {
  width: 94px;
  height: 89px;
  margin-bottom: 5px;
  background: url('/public/shadow.png') no-repeat;
  position: absolute;
}
</style>
