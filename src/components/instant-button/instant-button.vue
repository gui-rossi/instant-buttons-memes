<template>
    <div class="instant" :class="{ 'added-opacity': !button.matched }"
        :style="{ 'marginBottom': this.loadingAudio ? '96px' : '150px' }">
        <div class="small-button-background"
            :style="{ '--dynamic-color-standard': this.buttonColor, '--dynamic-color-playing': button.playing }"></div>
        <button ref="buttonRef" class="small-button" @touchstart="onTouchStart" @touchend="onTouchEnd" @touchmove="onTouchMove"></button>
        <div class="small-button-shadow"></div>
        <Loader v-if="this.loadingAudio" style="margin-top: 10px;" />
        <div class="instant-button-name">{{ button.name }}</div>
        
        <font-awesome-icon v-if="button.playing != null" @click="pauseAudio" :icon="['fas', 'pause-circle']" class="upper-right-icon pause-icon" />
        <div v-else>
            <font-awesome-icon v-if="!this.verifyIfFavorite" @click="addOrRemoveFavorite" :icon="['far', 'heart']" class="upper-right-icon favorite-icon-regular" />
            <font-awesome-icon v-else @click="addOrRemoveFavorite" :icon="['fas', 'heart']" class="upper-right-icon favorite-icon-solid" />
        </div>
    </div>
</template>

<script>
import Loader from '../loader/loader.vue';
import { getFile } from '../../services/axios';
import { writeCacheFile, readCacheFile } from '@/services/cache_helper';
import { Share } from '@capacitor/share';

/* eslint-disable */

export default {
    name: "instant-button",
    data: function () {
        return {
            loadingAudio: false,
            buttonColor: "",

            touchMoved: false,
            holdTimer: null,
            clickedButtonInfos: null,
        }
    },
    props: {
        button: Object
    },
    components: {
        Loader,
    },
    mounted: function () {
        this.buttonColor = this.getRandomColorEnhanced();
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
        getRandomColorEnhanced: function () {
            var cor = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;

            return cor;
        },
        playFile: async function () {
            try {
                var file = await this.getFile();
                
                this.$store.dispatch("playAudio", { audio: file, buttonInfos: { button: this.button, color: this.buttonColor } })
                
                if (this.button.id != this.$store.state.cachedAudio)
                {
                    this.$store.dispatch('cacheAudio', this.button.id);
                    await writeCacheFile(file);
                }
            } catch (error) {
                console.error('Error playing file:', error);
            }
        },
        pauseAudio: function () {
            this.$store.state.audioConfig.audio.pause();
            this.$store.state.audioConfig.audio.dispatchEvent(new Event('ended'));
        },
        getFile: async function() {
            try {
                if (this.button.id == this.$store.state.cachedAudio){
                    var file = await readCacheFile();
                    return `data:audio/wav;base64,${file}`;
                } else {
                    this.loadingAudio = true;
                    const fileBlob = await getFile(this.button.id);
                    var base64 = await this.blobToBase64(fileBlob);
                    return base64;
                }
            } catch (error) {
                console.error('Error fetching file:', error);
            } finally {
                this.loadingAudio = false;
            }
        } ,
        onTouchStart(event) {
            const boundigBoxes = this.$refs.buttonRef.getBoundingClientRect();

            this.clickedButtonInfos = {
                left: boundigBoxes.left,
                right: boundigBoxes.right,
                top: boundigBoxes.top,
                bottom: boundigBoxes.bottom,
            };

            this.holdTimer = setTimeout(async () => {
                const file = await this.getFile();
                const uri = await writeCacheFile(file, "SharedAudio.wav");

                await Share.share({
                    title: "Baixa o aplicativo para ouvir mais memes! https://play.google.com/store/apps/details?id=botoes.memes",
                    text: "Baixa o aplicativo para ouvir mais memes! https://play.google.com/store/apps/details?id=botoes.memes",
                    dialogTitle: "Baixa o aplicativo para ouvir mais memes! https://play.google.com/store/apps/details?id=botoes.memes",
                    url: uri
                });
            }, 1000);
        },
        onTouchEnd(event) {
            clearTimeout(this.holdTimer);

            if (event.changedTouches[0].clientX > this.clickedButtonInfos.right ||
                event.changedTouches[0].clientX < this.clickedButtonInfos.left ||
                event.changedTouches[0].clientY > this.clickedButtonInfos.bottom ||
                event.changedTouches[0].clientY < this.clickedButtonInfos.top) {
                return;
            }

            if (!this.touchMoved) {
                this.playFile();
            }

            event.stopPropagation();
        },
        onTouchMove() {
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
        blobToBase64: async function (blob) {
            return new Promise((resolve, _) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result);
                reader.readAsDataURL(blob);
            });
        }
    }
}

</script>

<style lang="scss">
.upper-right-icon {
    position: absolute;
    z-index: 1;
    right: -10%;
    font-size: x-large;
}

.pause-icon {
    color: white;
}

.favorite-icon-regular {
    color: #ff0000;
    opacity: 0.3;
}

.favorite-icon-solid {
    color: #ff0000;
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
    --dynamic-color-standard: unset;
    --dynamic-color-playing: unset;

    border-radius: 50%;
    width: 86px;
    height: 84px;
    margin-top: 3px;
    position: absolute;
    background-color: var(--dynamic-color-standard);
}

.small-button-background::before {
    content: "";
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: var(--dynamic-color-playing);
    border-radius: 50%;
    animation: expandFade 1s ease-in-out infinite;
}

.small-button {
    width: 94px;
    height: 89px;
    position: absolute;
    /*COMMENT OUT THIS LINE TO ADD ANIMATION IN BUTTONS VERTICALLY*/
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
    /* height: 37px; */
    overflow: hidden;
    font-size: small;
}

@keyframes expandFade {
    0% {
        transform: scale(1);
        opacity: 1;
    }

    100% {
        transform: scale(1.5);
        opacity: 0;
    }
}
</style>