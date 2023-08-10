<template>
    <div class="load-wrapp">
        <div class="load-4">
            <div class="ring-1"></div>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
export default {
    name: 'loader'
}
</script>

<style>
.load-4 .ring-1 {
    animation: loadingD 0.8s 0s linear infinite;
}

.ring-1 {
    width: 10px;
    height: 10px;
    margin: 0 auto;
    padding: 10px;
    border: 7px dashed white;
    border-radius: 100%;
}

@keyframes loadingD {
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

.load-wrapp {
    width: 50px;
}

.load-wrapp:last-child {
    margin-right: 0;
}
</style>