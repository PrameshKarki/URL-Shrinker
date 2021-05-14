exports.getIndex = (req, res, next) => {
    res.render("index.ejs", {
        pageTitle: "Welcome to URL Shrinker"
    })
}