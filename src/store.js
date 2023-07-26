import { createStore } from 'vuex'

// Create a new store instance.
const store = createStore({
  state () {
    return {
      buttonList: [],
      filteredButtonList: [],
    }
  },
  mutations: {
    setButtonListVars (state, buttons) {
      state.buttonList = buttons;
      state.filteredButtonList = buttons;
    },
    setFilteredButtonList (state, filteredStr) {
      state.filteredButtonList = state.buttonList.filter(b => b.name.includes(filteredStr))
    },
    resetFilteredButtonList (state) {
      state.filteredButtonList = state.buttonList; 
    }
  }
})

export default store;