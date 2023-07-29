import { createApp } from 'vue';
import App from './App.vue';
// import { defineCustomElements } from '@ionic/pwa-elements/dist';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faSearch, faTimes, faHeart as fasHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import store from './store';

library.add(faSearch)
library.add(faTimes)
library.add(fasHeart)
library.add(farHeart)

createApp(App)
    .use(store)
    .component('font-awesome-icon', FontAwesomeIcon)
    .mount('#app')

// defineCustomElements(window);