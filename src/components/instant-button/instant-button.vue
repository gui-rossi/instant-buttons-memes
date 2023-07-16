<template>
    <div class="instant">
        <div class="small-button-background" :style="getRandomColor()"></div>
        <button class="small-button"></button>
        <div class="small-button-shadow"></div>
        <div class="instant-button-name">Very Long Name Mucho longo</div>
    </div>
</template>

<script>

export default {
    name: "instant-button",
    data: function () {
        return {
            colors: ['#FF0000', '#00FF00', '#0000FF']
        }
    },
    methods: {
        getRandomColor: function () {
            const randomIndex = Math.floor(Math.random() * this.colors.length);
            return 'background-color: ' + this.colors[randomIndex];
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
    margin-bottom: 135px;
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
    /* height: 108px; */
    /* width: 115%; */
    display: flex;
    justify-content: center;
    /* align-items: flex-end; */
    overflow: hidden;
    margin-top: 90px;
    line-height: 15px;
    width: 110px;
}
</style>