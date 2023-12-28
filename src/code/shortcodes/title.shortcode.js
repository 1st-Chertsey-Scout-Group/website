module.exports = function title(siteTitle, title, subtitle) {
    siteTitle = siteTitle || "1st Chertsey Scout Group";
    title = title || "";
    subtitle = subtitle || "";

    if(title == ""){
        return siteTitle;
    }

    if(subtitle == ""){
        return `${title} | ${siteTitle}`;
    }

    return `${title} ${subtitle} | ${siteTitle}`;
}