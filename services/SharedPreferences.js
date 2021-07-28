import SharedPreferences from 'react-native-shared-preferences';

const SP_FILE_NAME = 'android_libgen_sp';

SharedPreferences.setName(SP_FILE_NAME);

const SP_KEY_DOWNLOAD_URL = 'libgen_download_url'
const SP_KEY_BASE_URL = 'libgen_base_url'
const SP_KEY_CDN_URL = 'libgen_cdn_url'

let getConfig = (onComplete) => {
    SharedPreferences.getItems([SP_KEY_BASE_URL, SP_KEY_DOWNLOAD_URL, SP_KEY_CDN_URL], onComplete);
}

let getItem = (key, onComplete) => {
    SharedPreferences.getItem(key, onComplete);
}

let setConfig = (key, value) => {
    console.log('Setting config for', key, value)
    SharedPreferences.setItem(key, value);
}

export {
    SP_KEY_BASE_URL,
    SP_KEY_DOWNLOAD_URL,
    SP_KEY_CDN_URL,
    getConfig,
    setConfig,
    getItem
}