import axios from './axios'

const api = "/Button";

const GetButton = {
    fetchButtons: async () => {
        const url = `${api}/FetchButtons`;

        return await axios (url, {
            method: 'GET'
        })
    },

    fetchButtonFile: async (buttonId) => {
        const url = `${api}/FetchButtonFile/${buttonId}`;

        return await axios (url, {
            method: 'GET'
        })
    }
}

export { GetButton };