<template>
    <div class="load-wrapp-playing">
        <div class="load-4-playing">
            <div class="ring-1-playing"></div>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
export default {
    name: 'playing'
}
</script>

<style scoped>
.load-4-playing .ring-1-playing {
    animation: loadingD-playing 1.5s 0.3s cubic-bezier(0.17, 0.37, 0.43, 0.67) infinite;
}

.ring-1-playing {
    width: 10px;
    height: 10px;
    margin: 0 auto;
    padding: 10px;
    border: 7px dashed white;
    border-radius: 100%;
}

@keyframes loadingD-playing {
    0% {
        transform: rotate(0deg);
    }

    50% {
        transform: rotate(180deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

.load-wrapp-playing {
    width: 50px;
}

.load-wrapp-playing:last-child {
    margin-right: 0;
}
</style>