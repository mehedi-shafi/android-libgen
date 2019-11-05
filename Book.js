
export default class Book{
    constructor(args){
        this.title = args.title;
        this.author = args.author;
        this.year = args.year;
        this.publisher = args.publisher;
        this.edition = args.edition;
        this.language = args.language;
        this.pages = args.pages;
        this.file_type = args.file_type;
        this.time_added = args.time_added;
        this.last_modified = args.last_modified;
        this.description = args.description;
        this.torrent_url = args.torrent;
        this.direct_url = args.direct;
        this.thumb_url = args.thumbnail;
    }
}