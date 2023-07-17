import { createApp } from 'vue'
import App from './App.vue'
// import { defineCustomElements } from '@ionic/pwa-elements/dist';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

library.add(faSearch)


createApp(App)
    .component('font-awesome-icon', FontAwesomeIcon)
    .mount('#app')

// defineCustomElements(window);