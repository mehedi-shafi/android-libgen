const baseUrl = `http://gen.lib.rus.ec`;
const bookInfoUrl = `${baseUrl}/json.php`;
const cdnIP = `http://93.174.95.29`;
const downloadUrl = `http://31.42.184.140/main`;
const coverUrl = `${cdnIP}/covers`;
const defaultThumb = `https://i.ibb.co/Fhnv4RR/splash.jpg`;
const torrentBaseUrl = `${baseUrl}/book/index.php`;

let makeConfig = (baseUrl, cdnIP, downloadUrl) => {
    return {
        baseUrl: baseUrl,
        bookInfoUrl: `${baseUrl}/json.php`,
        cdnIP: cdnIP,
        downloadUrl: downloadUrl,
        coverUrl: `${cdnIP}/covers`,
        defaultThumb: `https://i.ibb.co/Fhnv4RR/splash.jpg`,
        torrentBaseUrl: `${baseUrl}/book/index.php`,
    }
}

let getDefault = () => {

    return {
        baseUrl: `http://gen.lib.rus.ec`,
        bookInfoUrl: `${baseUrl}/json.php`,
        cdnIP: `http://93.174.95.29`,
        downloadUrl: `http://31.42.184.140/main`,
        coverUrl: `${cdnIP}/covers`,
        defaultThumb: `https://i.ibb.co/Fhnv4RR/splash.jpg`,
        torrentBaseUrl: `${baseUrl}/book/index.php`,
    }
}

export {
    getDefault,
    makeConfig
}
export default CONFIG = getDefault();