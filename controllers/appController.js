//Export shortID 
const url = require("url");
const shortID = require("shortid");


//Import models
const URL = require("../models/URLShortener");
const { userInfo } = require("os");

exports.getIndex = (req, res, next) => {
    res.render("index.ejs", {
        pageTitle: "Welcome to URL Shrinker",
        url: undefined
    })
}

exports.postShrinkUrl = (req, res, next) => {
    const body = JSON.parse(JSON.stringify(req.body));
    const longURL = body.url;
    const shortURL = shortID.generate();
    //Set initial click 0
    const clicks = 0;
    const newURL = new URL(longURL, shortURL, clicks);

    let formattedURL = url.format({
        protocol: req.protocol,
        host: req.get("host"),
        pathname: shortURL
    })
    newURL.save().then(() => {
        res.render("index.ejs", {
            pageTitle: "Welcome to URL Shrinker",
            url: {
                longURL: longURL,
                shortURL: formattedURL
            }
        })

    }).catch(err => {
        console.log(err);
    })
}

exports.getRedirectUrl = (req, res, next) => {
    const urlID = req.params.urlID;
    URL.fetchOne(urlID).then(([data]) => {
        if (data.length > 0) {
            let urlInfo = { ...data[0] };
            urlInfo.clicks += 1;
            URL.updateClicks(urlInfo.ID, urlInfo.clicks)
            res.redirect(urlInfo.longURL);
        } else {
            res.render("404.ejs", {
                pageTitle: "URL not found!"
            })
        }

    }).catch(err => {
        console.log(err);
    })
}