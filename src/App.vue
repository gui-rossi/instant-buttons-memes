<template>
  <Navbar />
  <div class="app">
    <div class="background-buttons">
      <Loader v-if="this.$store.state.buttonList.length == 0" class="loader-app" />
      <InstantButton v-else v-for="instant in this.$store.state.filteredButtonList" :key="instant" :button="instant" />
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
import { Favorites } from './PreferencesObject';

export default {
  name: 'App',
  components: {

  },
  data: function () {
    return {

    }
  },
  components: {
    InstantButton,
    Navbar,
    AdSense,
    Loader,
  },
  computed: {

  },
  mounted: async function () {
    this.fetchData();

    if (!this.isMobile())
      return;
      
    await this.loadFavorited();

  },
  methods: {
    fetchData() {
      GetButton.fetchButtons()
        .then((response) => {
          const updatedList = response.data.map((obj) => {
            return { ...obj, matched: true };
          });

          this.$store.commit('setButtonListVars', updatedList)
        })
        .catch((error) => {
          console.error("Error fetching data: ", error);
        });
    },
    loadFavorited: async function () {
      const favoritedObj = await Favorites.getObject();
      this.$store.commit('setFavoritedList', favoritedObj ? favoritedObj.value: [])
    },
    isMobile() {
      if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        return true
      } else {
        return false
      }
    }
  },
}
</script>

<style>
body,
html {
  margin: 0;
  height: 100%;
}

.loader-app {
  display: flex;
  justify-content: center;
  align-items: center;
}

#app {
  display: flex;
  background-color: #222222;
  justify-content: center;
}

.app {
  background-color: #222222;
  padding-top: 85px;
  min-height: calc(100vh - 85px);
}

.background-buttons {
  width: 400px;
  text-align: center;
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
}
</style>
