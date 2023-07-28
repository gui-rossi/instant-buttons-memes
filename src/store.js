import { createStore } from 'vuex'
import { Favorites } from './PreferencesObject';

/* eslint-disable */

// Create a new store instance.
const store = createStore({
  state () {
    return {
      buttonList: [],
      filteredButtonList: [],
      audio: new Audio(),

      favoritedButtonsList: null
    }
  },
  mutations: {
    setButtonListVars (state, buttons) {
      state.buttonList = buttons;
      state.filteredButtonList = buttons;
    },
    setFilteredButtonList (state, filteredStr) {
      state.filteredButtonList = customSort(filteredStr, state.filteredButtonList);
    },
    resetFilteredButtonList (state) {
      state.filteredButtonList = state.buttonList;
      for(var i = 0; i < state.filteredButtonList.length; i++){
        state.filteredButtonList[i].matched = true;
      }
    },
    playAudio (state, src) {
      state.audio.src = src; 
    },
    setFavoritedList (state, favorites) {
      state.favoritedButtonsList = favorites;

      Favorites.setObject(favorites);
    }
  },
})

function customSort(substring, arr) {
  return arr.slice().sort((s1, s2) => comparator(substring, s1, s2));
}

function comparator(substring, s1, s2) {
  const containsS1 = s1.name.toLowerCase().includes(substring.toLowerCase());
  const containsS2 = s2.name.toLowerCase().includes(substring.toLowerCase());

  s1.matched = containsS1;
  s2.matched = containsS2;

  if (containsS1 && !containsS2) {
    return -1; // s1 comes first
  } else if (!containsS1 && containsS2) {
    return 1; // s2 comes first
  } else {
    return 0;
  }
}

export default store;