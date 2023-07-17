<template>
    <div class="header">
        <SearchBar />
    </div>
</template>

<script>
import SearchBar from './search-bar.vue';

/* eslint-disable */
export default {
    name: 'navbar',
    components: {
        SearchBar,
    }
}
</script>

<style>
.header {
    background-color: #3F3F3F;
    height: 85px;
    display: flex;
    justify-content: center;
    align-items: center;

    padding-left: 8px;
    padding-right: 8px;

    position: fixed;
    top: 0;
    width: 100%;
    z-index: 2;
}
</style>