<template>
  <div>
    <div class="view-switcher">
      <label @click="this.onAllButtons" class="view-item"
        :class="{ 'view-item-active': this.allButtons, 'view-item-disable': !this.allButtons }">
        <div class="view-item-content">Todos os botões</div>
      </label>
      <label @click="this.onFavorites" class="view-item"
        :class="{ 'view-item-active': this.favorites, 'view-item-disable': !this.favorites }">
        <div class="view-item-content">Favoritos</div>
      </label>
    </div>

    <div class="holster" ref="carouselRef">
      <div class="carousel">
        <div class="background-buttons carousel-item">
          <Loader v-if="$store.state.buttonList.length == 0" class="loader-app" />
          <InstantButton v-for="instant in $store.state.filteredButtonList" :key="instant.id" :button="instant" />
        </div>
      </div>

      <div class="carousel">
        <div class="background-buttons carousel-item">
          <Loader v-if="$store.state.buttonList.length == 0" class="loader-app" />
          <InstantButton v-for="instant in $store.state.favoritedButtonsList" :key="instant.id" :button="instant" />
          <div v-if="!$store.state.favoritedButtonsList.length" class="no-favorites">
            <div>
              Você ainda não tem nenhum meme favoritado.
            </div>
            <div class="no-favorites-2">
              Clique no <span style="color: red; font-size: larger;">coração</span> ao lado do botão para favoritar!
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import InstantButton from './instant-button/instant-button.vue';
import Loader from './loader/loader.vue';

export default {
  name: "carousel",
  data() {
    return {
      allButtons: true,
      favorites: false,
    };
  },
  components: {
    InstantButton,
    Loader,
  },
  mounted: function () {
    const allButtonsWidth = this.$refs.carouselRef.scrollWidth;

    const onAllButtonsScroll = (e) => {
      if (e.target.scrollLeft <= 0 + 30 && !this.allButtons) {
        this.allButtons = true;
        this.favorites = false;
      } else if (e.target.scrollLeft >= (allButtonsWidth / 2 - 30) && !this.favorites) {
        this.allButtons = false;
        this.favorites = true;
      }
    };

    this.$refs.carouselRef.addEventListener("scroll", onAllButtonsScroll);
  },
  methods: {
    onFavorites(e) {
      const width = this.$refs.carouselRef.scrollWidth / 2;

      this.$refs.carouselRef.scrollTo({
        left: width,
        behavior: "smooth"
      });
    },
    onAllButtons(e) {
      this.$refs.carouselRef.scrollTo({
        left: 0,
        behavior: "smooth"
      });
    },
  },
};
</script>

<style lang="scss">
.holster {
  display: flex;
  justify-content: space-between;
  height: calc(100vh - 149px);
  scroll-snap-type: x mandatory;
  overflow-x: auto;
}

.carousel>div {
  text-align: center;
  scroll-snap-align: center;
  flex: none;
}

.carousel {
  display: flex;
  flex: none;
  flex-flow: nowrap;
  width: 100%;
}

.carousel-item {
  box-sizing: border-box;
  min-width: 100%;
  overflow-x: auto;
  transition: opacity 0.3s ease-in-out;
}

.background-buttons {
  width: 175px;
  text-align: center;
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  align-content: baseline;
}

.view-switcher {
  display: flex;
  justify-content: space-evenly;
  margin-bottom: 10px;
  margin-top: 40px;
}

.view-item {
  background-color: white;
  height: 4px;
  width: 45%;
  border-radius: 8px;
  display: flex;
  flex-direction: column-reverse;
  justify-content: end;
  align-items: center;
  margin-bottom: 8px;
}

.view-item-content {
  margin-bottom: 16px;
  font-weight: bolder;
  color: white;
}

.view-item-active {
  animation: appear 0.5s ease;
  opacity: 1;
}

.view-item-disable {
  animation: disappear 0.5s ease;
  opacity: 0.5;
}

@keyframes disappear {
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0.5;
  }
}

@keyframes appear {
  0% {
    opacity: 0.5;
  }

  100% {
    opacity: 1;
  }

}

.no-favorites {
  color: white;
  font-size: larger;
  font-weight: bolder;
  width: 80%;
  margin-top: 20px;
}

.no-favorites-2 {
  margin-top: 20px;
}
</style>
