import { createStore } from 'vuex'
import { Favorites } from './PreferencesObject';

/* eslint-disable */

// Create a new store instance.
const store = createStore({
  state() {
    return {
      buttonList: [],
      filteredButtonList: [],
      audio: new Audio(),

      favoritedButtonsList: [],
      isMobile: false,

      allButtonsRef: null,
      favoritedButtonsRef: null,
    }
  },
  mutations: {
    setButtonListVars(state, buttons) {
      state.buttonList = [...buttons];
      state.filteredButtonList = [...buttons];
    },

    setFilteredButtonList(state, filteredStr) {
      state.filteredButtonList = customSort(filteredStr, state.buttonList);
    },
    resetFilteredButtonList(state) {
      state.filteredButtonList = sortAlphabetically(state.buttonList);
      for (var i = 0; i < state.filteredButtonList.length; i++) {
        state.filteredButtonList[i].matched = true;
      }
    },

    setFilteredFavoritedList(state, filteredStr) {
      state.favoritedButtonsList = customSort(filteredStr, state.favoritedButtonsList);
    },
    resetFavoritedButtonList(state) {
      state.favoritedButtonsList = sortAlphabetically(state.favoritedButtonsList);
      for (var i = 0; i < state.favoritedButtonsList.length; i++) {
        state.favoritedButtonsList[i].matched = true;
      }
    },

    playAudio(state, src) {
      state.audio.src = src;
    },
    setFavoritedList(state, favorites) {
      state.favoritedButtonsList = sortAlphabetically(favorites);
      
      Favorites.setObject(favorites);
    },
    setIsMobile(state) {
      if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        state.isMobile = true;
      } else {
        state.isMobile = false;
      }
    },
    setFavoritedButtonRef(state, ref){
      state.favoritedButtonsRef = ref;
    },
    setAllButtonsRef(state, ref){
      state.allButtonsRef = ref;
    }
  },
  actions: {
    initiateButtons(context, array){
      context.commit('setButtonListVars', array);
      context.commit('resetFilteredButtonList');
      context.commit('resetFavoritedButtonList');
    },
    resetButtons(context){
      context.commit('resetFilteredButtonList');
      context.commit('resetFavoritedButtonList');
    },
    filterButtons(context, value){
      context.commit('setFilteredButtonList', value);
      context.commit('setFilteredFavoritedList', value);
    }
  }
})

function sortAlphabetically(array) {
  const sortedArray = array.sort((a, b) => {
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();

    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });

  return sortedArray;
}

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