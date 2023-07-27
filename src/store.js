import { createStore } from 'vuex'

// Create a new store instance.
const store = createStore({
  state () {
    return {
      buttonList: [],
      filteredButtonList: [],
      audio: new Audio(),
    }
  },
  mutations: {
    setButtonListVars (state, buttons) {
      state.buttonList = buttons;
      state.filteredButtonList = buttons;
    },
    setFilteredButtonList (state, filteredStr) {
      state.filteredButtonList = state.buttonList.filter(b => b.name.toLowerCase().includes(filteredStr.toLowerCase()))
    },
    resetFilteredButtonList (state) {
      state.filteredButtonList = state.buttonList; 
    },
    playAudio (state, src) {
      state.audio.src = src; 
    }
  }
})

export default store;