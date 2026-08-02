<template>
  <Navbar />
  <div class="app">
    <Carousel />
  </div>
</template>

<script>
/* eslint-disable */
import './fonts/fonts.css';

import InstantButton from '../src/components/instant-button/instant-button.vue';
import Navbar from '../src/components/navbar/navbar.vue';
import Loader from '../src/components/loader/loader.vue';
import { Favorites } from './PreferencesObject';
import Carousel from './components/carousel.vue';
import { listFiles } from './services/client';
import { AdMob, BannerAdSize, BannerAdPosition } from '@capacitor-community/admob';

export default {
  name: 'App',
  components: {
    InstantButton,
    Navbar,
    Loader,
    Carousel,
  },
  mounted: function () {
    this.loadAds();

    this.fetchFiles();

    this.loadFavorited();
  },
  methods: {
    loadAds: async function () {
      try {
        await AdMob.initialize({
          requestTrackingAuthorization: true,
          testingDevices: [], // add your device ID here while testing, keeps you from serving real ads to yourself
          initializeForTesting: true, // set to false when going live
        });

        await AdMob.showBanner({
          adId: process.env.VUE_APP_ADMOB_BANNER_ID,
          adSize: BannerAdSize.BANNER,
          position: BannerAdPosition.BOTTOM_CENTER,
          margin: 0,
          isTesting: process.env.VUE_APP_ADMOB_TESTING === 'true',
        });
      } catch(error){
        console.error('Error initiating ads:', error.message);
      }
    },
    fetchFiles: async function () {
      try {
        var response = await listFiles();

        const updatedList = response.map((obj) => {
            obj.name = obj.name.replace(/\.[^/.]+$/, "");
            return { ...obj, matched: true, favorited: false, playing: null };
          });

        this.$store.dispatch('initiateButtons', updatedList);
      } catch (error) {
        console.error('Error fetching files:', error);
      }
    },
    loadFavorited: async function () {
      const favoritedArray = await Favorites.getObject();
      this.$store.commit('setFavoritedList', favoritedArray);
    },
  },
}
</script>

<style lang="scss">
body,
html {
  margin: 0;
  height: 100%;
  overflow: hidden;
  font-family: 'Roboto', sans-serif;
}

// DELETE BODY > DIV & OVERFLOW: HIDDEN DE BODY, HTML PARA RETIRAR A TELA TRAVADA E VOLTAR AO RUBBER BANDING EFFECT
// NO BROSWER RETIRA AS BARRAS DE SCROLL

body>div {
  height: 100%;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
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

</style>