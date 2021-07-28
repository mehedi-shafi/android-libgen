import async from 'async';
import axios from 'axios';

const search_path = '/search.php';

const ID_REGEX = /ID\:[^0-9]+[0-9]+[^0-9]/g;
const RESULT_REGEX = /[0-9]+\ files\ found/i;

let currentPageNo = 1;

let urlBuilder = (options) => {
    if (!options.mirror)
        throw new Error('No mirror provided to search function');

    else if (!options.query)
        throw new Error('No search query given');

    else if (options.query.length < 4)
        throw new Error('Search query must be at least four characters');

    if (!options.count || !parseInt(options.count))
        options.count = 10;

    const sort = options.sort_by || 'def';

    const column = options.search_in || 'def';

    const sortmode = (options.reverse ? 'DESC' : 'ASC');

    if ('pageNo' in options) {
        currentPageNo = options.pageNo;
    }

    return options.mirror +
        search_path +
        '?&req=' + encodeURIComponent(options.query) +
        '&view=detailed' +
        '&column=' + column +
        '&sort=' + sort +
        '&sortmode=' + sortmode +
        '&page=' + currentPageNo;
}

let extractIds = (html) => {
    let ids = [];
    const idsResults = html.match(ID_REGEX);
    // reverse the order of the results because we walk through them
    // backwards with while(n--)
    try {
        idsResults.reverse();
        let n = idsResults.length;
        while (n--) {
            var id = idsResults[n].replace(/[^0-9]/g, "");
            if (!parseInt(id))
                return false;
            ids.push(id);
        }
    } catch (err) {
        return false;
        console.log(err);
    }
    return ids;
}

let getIds = (options, searchIds) => {
    currentPageNo = 1;

    currentPageNo = Math.floor((searchIds.length / 25) + 1);
    let query = urlBuilder(options);

    return axios.get(query)
        .then((response) => {
            let newIds = false;
            try{
                newIds = extractIds(response.data);
            }catch(error){
                console.error(error);
            }
            if (!newIds){
                return searchIds;
            }
            searchIds = searchIds.concat(newIds);
            if (searchIds.length >= options.count){
                return searchIds;
            }
            return getIds(options, searchIds);
        })
        .catch((error) => {
            return error
        })
}


let Search = (config, options, callback) => {
    console.log(`Running search for ${options.query}`);

    getIds(options, [])
        .then((searchIds) => {
            const bookListUrl = config.bookInfoUrl + `?ids=${searchIds.join(',')}&fields=*`;
    
            axios.get(bookListUrl)
                .then((response) => {
                    callback(response.data, false);
                })
                .catch((error) => {
                    console.log(error.message);
                    callback([], error);
                });
        })
        .catch((error) => {
            console.error(error);
        })
}


export default Search;