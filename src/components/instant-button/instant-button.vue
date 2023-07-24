<template>
    <div class="instant" @click="playSound">
        <div class="small-button-background" :style="getRandomColor()"></div>
        <button class="small-button"></button>
        <div class="small-button-shadow"></div>
        <!-- <Loader style="margin-top: 10px;" /> -->
        <!-- <Playing style="margin-top: 10px; margin-left: -23px;" /> -->
        <div class="instant-button-name">{{ button.name }}</div>
    </div>
</template>

<script>
import Loader from '../loader/loader.vue'
import Playing from '../play-animation/playing.vue'

/* eslint-disable */

export default {
    name: "instant-button",
    data: function () {
        return {
            colors: ['#FF0000', '#00FF00', '#0000FF']
        }
    },
    props: {
        button: Object
    },
    components: {
        Loader,
        Playing
    },
    methods: {
        playSound: function () {
            const sound = new Audio(`data:audio/x-wav;base64, ${this.button.file}`);
            sound.play();
        },
        getRandomColor: function () {
            var val1 = Math.floor(Math.random() * 6);
            var val2;

            var hex = "#";

            do {
                val2 = Math.floor(Math.random() * 6);
            } while (val1 === val2);

            for(var i = 0; i < 6; i++){
                if (val1 == i || val2 == i){
                    hex = hex + "F"; 
                } else {
                    hex = hex + "0"; 
                }
            }
            
            return 'background-color: ' + hex;
        }
    }
}

</script>

<style>
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