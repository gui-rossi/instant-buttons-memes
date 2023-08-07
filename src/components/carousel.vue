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

    <div class="holster" @touchend="onTouchEnd">
      <div class="carousel" ref="carouselRef">
        <div class="background-buttons carousel-item">
          <Loader v-if="this.$store.state.buttonList.length == 0" class="loader-app" />
          <InstantButton v-for="instant in this.$store.state.filteredButtonList" :key="instant.id" :button="instant" />
        </div>

        <div class="background-buttons carousel-item">
          <Loader v-if="this.$store.state.buttonList.length == 0" class="loader-app" />
          <InstantButton v-for="instant in this.$store.state.favoritedButtonsList" :key="instant.id" :button="instant" />
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
    const width = this.$refs.carouselRef.scrollWidth;

    this.$refs.carouselRef.addEventListener("scroll", (e) => {
      if (e.target.scrollLeft <= 0 + 30 && !this.allButtons) {
        this.allButtons = true;
        this.favorites = false;
      } else if (e.target.scrollLeft >= ((width / 2) - 30) && !this.favorites) {
        this.allButtons = false;
        this.favorites = true;
      }
    })
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
    }
  },
};
</script>

<style lang="scss">
.holster {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-flow: column nowrap;
  // font-family: monospace;
  height: 100%;
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
  scroll-snap-type: x mandatory;
  overflow-x: auto;
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
}

.view-switcher {
  display: flex;
  justify-content: space-evenly;
  margin-bottom: 1rem;
  margin-top: 3rem;
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
  // opacity: 1 !important;
  animation: appear 0.5s ease;
  opacity: 1;
}

.view-item-disable {
  // opacity: 1 !important;
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
}</style>
