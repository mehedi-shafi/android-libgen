import CONFIG from '../config';

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
        this.description    = this.removeTags(this.validate(args.descr));
        this.torrent_url    = this.generateTorrentDownloadUrl();
        this.direct_url     = this.generateDownloadUrl();
        this.thumb_url      = this.generateThumbNailUrl(this.validate(args.coverurl));
        this.fileSize       = this.humanReadableSize(this.validate(args.filesize));
        this.fileSizeOrig   = args.filesize;
    }

    validate = (arg) => {
        return (arg) ? arg : '';
    }

    generateThumbNailUrl = (thumbLoc) => {
        if (thumbLoc == ''){
            return CONFIG.defaultThumb;
        }
        return `${CONFIG.coverUrl}/${thumbLoc}`;
    }

    generateDownloadUrl = () => {
        if (this.md5 != ''){
            return `${CONFIG.downloadUrl}/${Math.floor(this.id / 1000) * 1000}/${this.md5.toLowerCase()}/${this.author} - ${this.title}-${this.publisher} (${this.year}).${this.file_type}`
        }
        return 404;
    }

    humanReadableSize = (size) => {
        if (size == ''){
            return '0 Bytes';
        }
        if (size % 1048576 > 0) {
            size = (size / 1048576).toFixed(2) + 'MB'
        } 
        else if (size % 1024 > 0) {
            size = (size / 1024).toFixed(2) + 'KB'
        } 
        else {
            size = size.toFixed(2) + 'Bytes'
        }
        return size;
    }

    removeTags = (text) => {
        const regex = /(<([^>]+)>)/ig;
        const result = text.replace(regex, '');
        return result;
    }

    generateTorrentDownloadUrl = () => {
        if (this.md5 != ''){
            return `${CONFIG.torrentBaseUrl}?md5=${this.md5}&oftorrent=`;
        }
        return 404;
    }
}

export const SampleBook = new Book({
    "id": "389633",
    "title": "Techniques of High Magic: A Handbook of Divination, Alchemy, and the Evocation of Spirits",
    "volumeinfo": "",
    "series": "",
    "periodical": "",
    "author": "Francis King, Stephen Skinner",
    "year": "2000",
    "edition": "",
    "publisher": "Destiny Books",
    "city": "",
    "pages": "240",
    "language": "English",
    "topic": "",
    "library": "",
    "issue": "",
    "identifier": "0892818182,9780892818181",
    "issn": "",
    "asin": "",
    "udc": "",
    "lbc": "",
    "ddc": "133.4/3",
    "lcc": "BF1611 .K555 2000",
    "doi": "",
    "googlebookid": "",
    "openlibraryid": "OL60143M",
    "commentary": "",
    "dpi": "0",
    "color": "",
    "cleaned": "",
    "orientation": "",
    "paginated": "",
    "scanned": "1",
    "bookmarked": "1",
    "searchable": "1",
    "filesize": "1838960",
    "extension": "pdf",
    "md5": "8E849F709AB71F6E1867CB1A8F1229C0",
    "generic": "",
    "visible": "",
    "locator": "8e849f709ab71f6e1867cb1a8f1229c0~0892818182,9780892818181.pdf",
    "local": "0",
    "timeadded": "2011-04-11 19:55:47",
    "timelastmodified": "2016-03-20 07:50:50",
    "coverurl": "389000/8e849f709ab71f6e1867cb1a8f1229c0-d.jpg",
    "identifierwodash": "0892818182,9780892818181",
    "tags": "",
    "pagesinfile": "185",
    "descr": "A complete beginner's guide to understanding and harnessing the mysterious forces of nature.</p><p>• Provides tools for self-initiation into the ancient and secret traditions of ceremonial magic. </p><p>• Explains various divination systems and how to perform ancient rituals that open the doorway to secret and arcane knowledge. </p><p>True magic can be defined as the art and science of using little-known or forgotten natural forces in order to achieve changes in consciousness and the physical environment. It concerns a wide body of doctrines and techniques, including the conjuring of spirits and non-human entities; the manufacture and consecration of wands, swords, talismans, and other tools of the magus; ritual divination; and the exploration of universes other than that with which we are familiar. The masters who taught others these ancient arts are gone, but  Techniques of High Magic  provides the practical and lucid instruction necessary for self-initiation into these secret traditions. </p><p>Emphasizing the ordered nature of the universe and the power of will directed by imagination, Francis King and Stephen Skinner introduce the reader to magical practices, rituals, and instruments that have been used for centuries. They explain systems of divination such as the I Ching, the Tarot, and geomancy, as well as techniques of astral projection and elementary alchemy. Their disciplined approach to magical practice includes easy formulas and diagrams that will help the initiate navigate an ancient and potent universe of gods, angels, and spirits--the world of High Magic. </p>",
    "toc": "Local Disk......Page 0<br>Techniques Of High Magic By Francis King and Stephen Skinner (A Manual Of Self-Initiation)......Page 1<br>Book Cover (Front)......Page 2<br>Book Cover (Back)......Page 3<br>Scan / Edit Notes......Page 4<br>Dedication......Page 5<br>Acknowledgments......Page 6<br>Quote......Page 7<br>1 - The Meaning of Magic......Page 8<br>2 - First Steps in Magic......Page 13<br>3 - Divination as Magic......Page 18<br>4 - Making your Geomantic Instruments......Page 22<br>5 - Geomantic Divination......Page 28<br>6 - Tattwa Vision......Page 44<br>7 - Making and Consecrating your Elemental Weapons......Page 49<br>8 - How To Make Talismans For Yourself......Page 65<br>9 - The I Ching......Page 84<br>10 - Astral Projection in Theory and Practice......Page 91<br>11 - The Magic of the Tarot Cards......Page 106<br>12 - Self Initiation......Page 118<br>13 - Invocation of the Gods......Page 131<br>14 - Evocation of Spirits......Page 143<br>Ritual Appendices......Page 153<br>Bibliography......Page 185<br>",
    "sha1": "VLSHRK7CDZUKTLF5WD2XRQCZL67ZIRJX",
    "sha256": "B73EB163B4623B67627B8AFF2BADB73D59811236D2B664B05033A85192905B60",
    "crc32": "CA6C314E",
    "edonkey": "098F87D695B9400DA8EC7A8D320A969E",
    "aich": "QSOUVRZZV3LLFSYHDRPMT24TGKL6CP7M",
    "tth": "PXLSA3EIEHI6VYZW5H3CDUGUJPGLLWUC4NSOMYQ",
    "btih": "1ba1ef43589d90394eed3243befe055e11232ee8",
    "torrent": "ZDQ6aW5mb2Q2Omxlbmd0aGkxODM4OTYwZTQ6bmFtZTMyOjhlODQ5ZjcwOWFiNzFmNmUxODY3Y2IxYThmMTIyOWMwMTI6cGllY2UgbGVuZ3RoaTE2Nzc3MjE2ZTY6cGllY2VzMjA6quR4q+IeaKmsvbD1eMBZX7+URTdlZQ=="
});

export const getSampleBookList = (count) => {
    let sampleBookList = [];
    for (let i = 0; i < count; i++){
        sampleBookList.push(SampleBook)
    }
    return sampleBookList;
}