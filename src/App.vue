<template>
  <Navbar />
  <div class="app">
    <div class="background-buttons">
      <Loader v-if="this.$store.state.buttonList.length == 0" class="loader-app" />
      <InstantButton v-else v-for="instant in this.$store.state.filteredButtonList" :key="instant" :button="instant"/>
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
import { GetButton } from './services/button_services';

export default {
  name: 'App',
  components: {

  },
  data: function () {
    return {
      myImage: null,
      listOfInstants: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
      listOfButtons: []
    }
  },
  components: {
    InstantButton,
    Navbar,
    AdSense,
    Loader,
  },
  mounted: function () {
    this.fetchData();
  },
  methods: {
    fetchData() {
      GetButton.fetchButtons()
        .then((response) => {
          this.$store.commit('setButtonListVars', response.data)
        })
        .catch((error) => {
          console.error("Error fetching data: ", error);
        });
    },
  },
}
</script>

<style>
body, html {
  margin: 0;
}

.loader-app {
  display: flex;
  justify-content: center;
  align-items: center;
}

.app {
  display: flex;
  justify-content: center;
  background-color: #222222;
  
  padding-top: 85px;
  min-height: calc(100vh - 85px);
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
