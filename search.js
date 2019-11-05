import async from 'async';

const search_path = '/search.php';
const book_info_path = '/json.php';
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
    idsResults.reverse();
    let n = idsResults.length;
    while (n--){
      var id = idsResults[n].replace(/[^0-9]/g,"");
      if (!parseInt(id))
        return false;
      ids.push(id);
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
    getIds(options, (idList) => {
        console.log(idList);
        const bookListUrl = options.mirror + book_info_path + `?ids=${idList.join(',')}&fields=*`;
        fetch(bookListUrl)
            .then((data) => data.json())
            .then((data) => {
                callback(data);
            })
            .catch((error) => {
                console.error(error);
            });
    });
}
export default Search;