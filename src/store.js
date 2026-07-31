import { createStore } from 'vuex'
import { Favorites } from './PreferencesObject';
import { AdMob } from '@capacitor-community/admob';

/* eslint-disable */
const store = createStore({
  state() {
    return {
      buttonList: [],
      filteredButtonList: [],
      audioConfig: { audio: new Audio(), buttonClicked: null },

      favoritedButtonsList: [],
      isMobile: false,

      allButtonsRef: null,
      favoritedButtonsRef: null,

      cachedAudioId: "",

      nextInterstitialAd: Math.floor(Math.random() * (12 - 9 + 1)) + 9, // Random int between 5 and 8
    }
  },
  getters: {
    buttonList: (state) => state.buttonList,
    filteredButtonList: (state) => state.filteredButtonList,
    audioConfig: (state) => state.audioConfig,
    favoritedButtonsList: (state) => state.favoritedButtonsList,
    isMobile: (state) => state.isMobile,
    allButtonsRef: (state) => state.allButtonsRef,
    favoritedButtonsRef: (state) => state.favoritedButtonsRef,
    cachedAudioId: (state) => state.cachedAudioId,
    nextInterstitialAd: (state) => state.nextInterstitialAd,
    isAudioPlaying: (state) => {
      return state.audioConfig.buttonClicked !== null && state.audioConfig.buttonClicked.playing !== null;
    },
    activeClickedButton: (state) => state.audioConfig.buttonClicked
  },
  mutations: {
    resetInterstitialAdCounter(state) {
      state.nextInterstitialAd = Math.floor(Math.random() * (28 - 22 + 1)) + 22 // Random int between 22 and 28
    },
    decrementInterstitialAdCounter(state) {
      state.nextInterstitialAd--;
    },

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

    setButtonClicked(state, buttonInfos) {
      if (state.audioConfig.buttonClicked) {
        state.audioConfig.buttonClicked.playing = null;
      }
      
      state.audioConfig.buttonClicked = buttonInfos.button;
      state.audioConfig.buttonClicked.playing = buttonInfos.color;
    },
    setAudio(state, src) {
      state.audioConfig.audio.src = src;
    },
    playAudio(state) {
      state.audioConfig.audio.removeEventListener('ended', () => {});

      state.audioConfig.audio.addEventListener('ended', function () {
        state.audioConfig.buttonClicked.playing = null;
      });

      state.audioConfig.audio.play().catch(err => console.error('Play blocked:', err.name, err.message));
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
    setFavoritedButtonRef(state, ref) {
      state.favoritedButtonsRef = ref;
    },
    setAllButtonsRef(state, ref) {
      state.allButtonsRef = ref;
    },
    saveFileToCache(state, fileId){
      state.cachedAudio = fileId;
    },
  },
  actions: {
    cacheAudio(context, fileId){
      context.commit('saveFileToCache', fileId);
    },
    initiateButtons(context, array) {
      context.commit('setButtonListVars', array);
      context.commit('resetFilteredButtonList');
      context.commit('resetFavoritedButtonList');
    },
    resetButtons(context) {
      context.commit('resetFilteredButtonList');
      context.commit('resetFavoritedButtonList');
    },
    filterButtons(context, value) {
      context.commit('setFilteredButtonList', value);
      context.commit('setFilteredFavoritedList', value);
    },
    playAudio(context, audioAndButtonInfos) {
      context.commit('setButtonClicked', audioAndButtonInfos.buttonInfos);
      context.commit('setAudio', audioAndButtonInfos.audio);
      context.commit('playAudio');
    },
    async playInterstitialAd(context) {
      context.commit('resetInterstitialAdCounter');

      try{
        await AdMob.prepareInterstitial({
          adId: process.env.VUE_APP_ADMOB_INTERSTITIAL_ID,
          isTesting: process.env.VUE_APP_ADMOB_TESTING === 'true',
        });
        
        await AdMob.showInterstitial();
      } catch (error){
        console.log(error?.message)
      }
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