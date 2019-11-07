
export default class Book{

    constructor(args){
        this.id             = this.validate(args.id);
        this.title          = this.validate(args.title);
        this.author         = this.validate(args.author);
        this.year           = this.validate(args.year);
        this.publisher      = this.validate(args.publisher);
        this.edition        = this.validate(args.edition);
        this.language       = this.validate(args.language);
        this.pages          = this.validate(args.pages);
        this.md5            = this.validate(args.md5);
        this.file_type      = this.validate(args.extension);
        this.time_added     = this.validate(args.timeadded);
        this.last_modified  = this.validate(args.timelastmodified);
        this.description    = this.validate(args.description);
        this.torrent_url    = this.validate(args.torrent);
        this.direct_url     = this.validate(args.direct);
        this.thumb_url      = this.validate(args.coverurl);
    }

    validate = (arg) => {
        return (arg) ? arg : '';
    }
}