import { Preferences } from '@capacitor/preferences';

const Favorites = {
    getObject: async function () {
        const ret = await Preferences.get({ key: 'botoes_memes_favoritos' });
        if (ret.value){
            return JSON.parse(ret.value);
        } else {
            return [];
        }
    },
    setObject: async function (favoritedButtons) {
        await Preferences.set({
            key: 'botoes_memes_favoritos',
            value: JSON.stringify(favoritedButtons)
        });
    }
}


export { Favorites };