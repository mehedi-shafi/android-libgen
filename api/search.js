import async from 'async';

import CONFIG from '../config';
const search_path = '/search.php';

const ID_REGEX = /ID\:[^0-9]+[0-9]+[^0-9]/g;
const RESULT_REGEX = /[0-9]+\ files\ found/i;

let currentPageNo = 1;

let urlBuilder = (options) => {
    if (!options.mirror)
        return new Error('No mirror provided to search function');

    else if (!options.query)
        return new Error('No search query given');

    else if (options.query.length < 4)
        return new Error('Search query must be at least four characters');

    if (!options.count || !parseInt(options.count))
        options.count = 10;

    const sort = options.sort_by || 'def';

    const column = options.search_in || 'def';

    const sortmode = (options.reverse ? 'DESC' : 'ASC');

    if ('pageNo' in options){
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
    try{
        idsResults.reverse();
        let n = idsResults.length;
        while (n--){
            var id = idsResults[n].replace(/[^0-9]/g,"");
            if (!parseInt(id))
                return false;
            ids.push(id);
        }
    }catch(err){
        return false;
        console.log(err);
    }
    return ids;
}

const getIds = (options, callback) => {
    currentPageNo = 1;
    let searchIds = [];
    async.until(
        () => {return searchIds.length >= options.count; },
        (callback) => {
            currentPageNo = Math.floor((searchIds.length / 25) + 1);
            let query = urlBuilder(options);
            fetch(query)
                .then((data) => data.text())
                .then((data) => {
                    let newIds = extractIds(data);
                    if (!newIds){
                        return callback(new Error('Failed to parse the incoming response'));
                    }
                    searchIds = searchIds.concat(newIds);
                    return callback(null);
                })
                .catch((error) => {
                    console.error(error);
                });
        },
        (error) => {
            if (error){
                callback(error);
            }
            callback(searchIds);
        }
    );
}

let Search = (options, callback) => {    
    console.log(`Running search for ${options.query}`);
    getIds(options, (idList) => {
        if (idList && idList.length > 0){
        const bookListUrl = CONFIG.bookInfoUrl + `?ids=${idList.join(',')}&fields=*`;
        fetch(bookListUrl)
            .then((data) => data.json())
            .then((data) => {
                callback(data);
            })
            .catch((error) => {
                console.error(error);
                callback([], 'No book found');
            });
        }
        else{
            callback([], 'No book found');
        }
    });
}
export default Search;