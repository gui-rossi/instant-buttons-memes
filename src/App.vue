<template>
  <Navbar />
  <div class="app">
    <Carousel />
  </div>
  <!-- <AdSense /> -->
</template>

<script>
/* eslint-disable */
import './fonts/fonts.css';

import InstantButton from '../src/components/instant-button/instant-button.vue';
import Navbar from '../src/components/navbar/navbar.vue';
import AdSense from '../src/components/footer/adsense.vue';
import Loader from '../src/components/loader/loader.vue';
import { GetButton } from './services/button_services';
import { Favorites } from './PreferencesObject';
import Carousel from './components/carousel.vue';

export default {
  name: 'App',
  components: {
    InstantButton,
    Navbar,
    AdSense,
    Loader,
    Carousel,
  },
  mounted: async function () {
    this.$store.commit("setIsMobile");

    this.fetchData();

    if (!this.$store.state.isMobile)
      return;

    await this.loadFavorited();
  },
  methods: {
    fetchData() {
      GetButton.fetchButtons()
        .then((response) => {
          const updatedList = response.data.map((obj) => {
            return { ...obj, matched: true, favorited: false, playing: "" };
          });

          this.$store.dispatch('initiateButtons', updatedList);
        })
        .catch((error) => {
          console.error("Error fetching data: ", error);
        });
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
