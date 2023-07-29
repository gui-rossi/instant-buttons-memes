<template>
    <div class="search-bar">
        <div class="search-bar-icon">
            <font-awesome-icon :icon="['fas', 'search']" />
        </div>
        <input v-if="this.$store.state.isMobile" class="search-bar-input" v-model="this.auxText" :class="[this.enableClearX]" type="text" placeholder="O james eu quero uma..." name="search" @change="onChange" @input="onInput">
        <input v-else class="search-bar-input" :class="[this.enableClearX]" v-model="this.inputText" type="text" placeholder="O james eu quero uma..." name="search">
        <div v-if="this.inputText.length || this.auxText.length" class="cancel-search-icon" @click="clearSearchBar">
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
            auxText: "",
        }
    },
    computed: {
        enableClearX: function () {
            if (this.inputText.length || this.auxText.length) {
                return "sharpen-container-border";
            }
        }
    },
    watch: {
        inputText: function (value) {
            if (value == "") {
                this.$store.commit('resetFilteredButtonList');
            }
            else {
                this.$store.commit('setFilteredButtonList', value);
            }
        },
        auxText: function () {
            console.log(this.auxText);
        }
    },
    methods: {
        onInput(value) {
            if (value.inputType == 'insertCompositionText') {
                this.auxText = value.data ? value.data : "";

                this.updateStore(this.auxText);
            }
        },
        onChange(event) {
            /* 
                2 flows estão passando aqui: 
                se limpar pelo clear search bar -> limpo a variavel e re-ordeno os botoes
                se limpar pelo "ok" do teclado  -> limpo a variavel, o que significa que o componente com a funcao clearSearchBar 
                                                    vai desrenderizar cancelando a chamada da funcao

                comentar essa linha faz funcionar o primeiro flow, manter ela faz funcionar o segundo flow
            */
            this.auxText = "";
        },
        clearSearchBar() {
            this.inputText = "";
            this.auxText = "";
            this.$store.commit('resetFilteredButtonList');
        },
        updateStore: function (value) {
            if (value == "") {
                this.$store.commit('resetFilteredButtonList');
            }
            else {
                this.$store.commit('setFilteredButtonList', value);
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