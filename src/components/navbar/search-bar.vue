<template>
    <div class="search-bar">
        <div class="search-bar-icon">
            <font-awesome-icon :icon="['fas', 'search']" />
        </div>
        <input v-if="this.$store.state.isMobile" @keypress="onKeyPressSearch" class="search-bar-input"
            v-model="this.inputTextMobile" :class="[this.enableClearX]" type="text" placeholder="O james eu quero uma..."
            name="search" @input="onInputSearch">
        <input v-else class="search-bar-input" :class="[this.enableClearX]" v-model="this.inputText" type="text"
            placeholder="O james eu quero uma..." name="search">
        <div v-if="this.inputText.length || this.inputTextMobile.length" class="cancel-search-icon" @click="clearSearchBar">
            <font-awesome-icon :icon="['fas', 'times']" />
        </div>
    </div>
</template>

<script>

/* eslint-disable */
export default {
    name: 'search-bar',
    data: function () {
        return {
            inputText: "",
            inputTextMobile: "",

            pressedEnter: 0,
        }
    },
    computed: {
        enableClearX: function () {
            if (this.inputText.length || this.inputTextMobile.length) {
                return "sharpen-container-border";
            }
        }
    },
    watch: {
        inputText: function (value) {
            this.updateStore(value);
        },
        inputTextMobile: function (value) {
            this.updateStore(value);
        }
    },
    methods: {
        onInputSearch(event) {
            this.inputTextMobile = event.target.value;

            this.$store.state.allButtonsRef.scrollTo({
                top: 0,
                behavior: "smooth"
            });
            this.$store.state.favoritedButtonsRef.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        },
        clearSearchBar() {
            this.inputText = "";
            this.inputTextMobile = "";
            this.$store.commit('resetFilteredButtonList');
        },
        updateStore: function (value) {
            if (value == "") {
                this.$store.dispatch('resetButtons');
            }
            else {
                this.$store.dispatch('filterButtons', value);
            }
        },
    }
}
</script>

<style>
.cancel-search-icon {
    height: 100%;
    width: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: x-large;
    color: white;
    background-color: black;
    border-bottom-right-radius: 100px;
    border-top-right-radius: 100px;
    border: 1px solid black;
    position: relative;
    cursor: pointer;
    padding-left: 7px;
    padding-right: 10px;
}

.cancel-search-icon::before {
    content: "";
    position: absolute;
    left: 0;
    top: 50%;
    /* Adjust the positioning to place the left border halfway vertically */
    transform: translateY(-50%);
    height: 30px;
    /* Half of the square's height, adjust as needed */
    width: 1px;
    /* Adjust the width of the border as desired */
    background-color: white;
    /* Set the color of the border */
}

.search-bar {
    width: 70%;
    height: 55%;
    display: flex;
    align-items: center;
}

.sharpen-container-border {
    border-bottom-right-radius: 0px !important;
    border-top-right-radius: 0px !important;
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
    padding-right: 10px;
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