<template>
    <div class="instant" :class="{ 'added-opacity': !button.matched }">
        <div class="small-button-background" :style="this.getRandomColor"></div>
        <button v-if="this.$store.state.isMobile" ref="buttonRef" class="small-button" @touchstart="onTouchStart" @touchend="onTouchEnd" @touchcancel="onTouchCancel"></button>
        <button v-else class="small-button" @click="playSound"></button>
        <div class="small-button-shadow"></div>
        <!-- <Loader v-if="loadingAudio" style="margin-top: 10px;" /> -->
        <!-- <Playing style="margin-top: 10px; margin-left: -23px;" /> -->
        <div class="instant-button-name">{{ button.name }}</div>
        <font-awesome-icon v-if="!this.verifyIfFavorite" @click="addOrRemoveFavorite" :icon="['far', 'heart']" class="favorite-icon-regular" />
        <font-awesome-icon v-else @click="addOrRemoveFavorite" :icon="['fas', 'heart']" class="favorite-icon-solid" />
    </div>
</template>

<script>
import Loader from '../loader/loader.vue';
import Playing from '../play-animation/playing.vue';
import { GetButton } from '../../services/button_services';

/* eslint-disable */

export default {
    name: "instant-button",
    data: function () {
        return {
            loadingAudio: false,

            held: false,
            holdTimer: null,
        }
    },
    props: {
        button: Object
    },
    components: {
        Loader,
        Playing
    },
    computed: {
        verifyIfFavorite: function () {
            const isFavorite = this.$store.state.favoritedButtonsList.some(but => but.id == this.button.id);

            if (isFavorite)
                return true;
            else
                return false;
        },
        getRandomColor: function () {
            var val1 = Math.floor(Math.random() * 6);
            var val2;

            var hex = "#";

            do {
                val2 = Math.floor(Math.random() * 6);
            } while (val1 === val2);

            for (var i = 0; i < 6; i++) {
                if (val1 == i || val2 == i) {
                    hex = hex + "F";
                } else {
                    hex = hex + "0";
                }
            }

            return 'background-color: ' + hex;
        }
    },
    methods: {
        playSound: function () {
            this.loadingAudio = true;

            GetButton.fetchButtonFile(this.button.id)
                .then(response => {
                    this.$store.commit('playAudio', `data:audio/x-wav;base64, ${response.data.file}`);
                    
                    this.$store.state.audio.play().catch(_ => _);
                })
                .catch(err => {
                    console.error("Error while loading file!", err);
                })
                .finally(_ => {
                    this.loadingAudio = false;
                })            
        },
        onTouchStart(event) {
            this.held = false;
            this.holdTimer = setTimeout(async () => {
                this.held = true;

                this.addOrRemoveFavorite();
            }, 1200);
        },
        async onTouchEnd(event) {
            clearTimeout(this.holdTimer);
            
            const boundigBoxes = this.$refs.buttonRef.getBoundingClientRect();
            
            if (event.changedTouches[0].clientX < boundigBoxes.left || event.changedTouches[0].clientX > boundigBoxes.right) {
                return;
            }

            if (event.changedTouches[0].clientY < boundigBoxes.top || event.changedTouches[0].clientY > boundigBoxes.bottom) {
                return;
            }

            if (!this.held) {
                this.playSound();
            }
            
            event.stopPropagation();
        },
        onTouchCancel() {
            clearTimeout(this.holdTimer);
        },
        addOrRemoveFavorite: function () {
            var favorites = this.$store.state.favoritedButtonsList;
            const buttonIsAlreadyFavorited = favorites.some(but => but.id == this.button.id);

            if (buttonIsAlreadyFavorited) {
                const filteredOutFavorites = favorites.filter(but => but.id != this.button.id);

                this.$store.commit('setFavoritedList', filteredOutFavorites)
            } else {
                favorites.push(this.button);

                this.$store.commit('setFavoritedList', favorites);
            }
        },
    }
}

</script>

<style>
.favorite-icon-regular {
    color: #ff0000;
    position: absolute;
    z-index: 1;
    right: -10%;
    font-size: x-large;
    opacity: 0.3;
}


.favorite-icon-solid {
    color: #ff0000;
    position: absolute;
    z-index: 1;
    right: -10%;
    font-size: x-large;
}

.added-opacity {
    opacity: 0.15;
}

.instant {
    position: relative;
    vertical-align: top;
    text-align: center;
    word-wrap: break-word;

    display: flex;
    justify-content: center;

    flex-basis: calc((100% - 60px) / 3);
    margin-bottom: 150px;
}

.small-button-background {
    border-radius: 50%;
    width: 86px;
    height: 84px;
    margin-top: 3px;
    position: absolute;
}

.small-button {
    width: 94px;
    height: 89px;
    position: absolute;  /*COMMENT OUT THIS LINE TO ADD ANIMATION IN BUTTONS VERTICALLY*/
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
    z-index: -1;
}

.instant-button-name {
    color: white;
    position: absolute;
    margin-top: 90px;
    height: 37px;
    overflow: hidden;
}
</style>