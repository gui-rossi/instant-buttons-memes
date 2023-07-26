<template>
    <div class="search-bar">
        <div class="search-bar-icon">
            <font-awesome-icon :icon="['fas', 'search']" />
        </div>
        <input class="search-bar-input" v-model="inputText" type="text" placeholder="O james eu quero uma..." name="search">
    </div>
</template>

<script>

/* eslint-disable */
export default {
    name: 'search-bar',
    data: function () {
        return {
            inputText: "",
        }
    },
    watch: {
        inputText: function (value) {
            if (value == ""){
                this.$store.commit('resetFilteredButtonList');
            }
            else {
                this.$store.commit('setFilteredButtonList', value);
            }
        }
    }
}
</script>

<style>
.search-bar {
    width: 70%;
    height: 55%;
    display: flex;
    align-items: center;
}

.search-bar-input {
    width: 100%;
    height: 100%;
    border-top-right-radius: 100px;
    border-bottom-right-radius: 100px;

    border: 0;
    outline: 0;

    background-color: black;
    padding-left: 10px;
    color: white;
}

.search-bar-icon {
    width: 50px;
    height: 100%;
    border: 1px solid black;
    border-top-left-radius: 100px;
    border-bottom-left-radius: 100px;

    background-color: #272727;

    display: flex;
    justify-content: center;
    align-items: center;
    padding-left: 5px;
    color: white;
}
</style>