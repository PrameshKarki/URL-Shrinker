//Import database
const db = require("../utils/database");

class URLShortener {
    constructor(longURL, shortURL, clicks) {
        this.longURL = longURL;
        this.shortURL = shortURL;
        this.clicks = clicks;
    }
    save() {
        return db.execute("INSERT INTO urls(longURL,shortURL,clicks) VALUES(?,?,?)", [this.longURL, this.shortURL, this.clicks]);
    }
    static fetchOne(shortURL) {
        return db.execute("SELECT * FROM urls WHERE shortURL=BINARY ? LIMIT 1", [shortURL]);
    }
    static updateClicks(ID, clicks) {
        return db.execute("UPDATE urls SET clicks=? WHERE ID=?", [clicks, ID]);
    }

}

//Export class
module.exports = URLShortener;