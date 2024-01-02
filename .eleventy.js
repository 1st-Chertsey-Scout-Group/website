const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const markdownLibrary = require("./src/code/markdownLibrary");

const titleShortcode = require("./src/code/shortcodes/title.shortcode");
const jsonFilter = require("./src/code/filters/json.filter");
const {
  transformYear,
  transformDay,
  transformMonth,
  all,
} = require("./src/code/news/transform");
const monthFilter = require("./src/code/filters/month.filter");
const padFilter = require("./src/code/filters/pad.filter");
const parentKeyFilter = require("./src/code/filters/parent-key.filter");
const pageKeyFilter = require("./src/code/filters/page-key.filter");
const dayOrdinalFilter = require("./src/code/filters/day-ordinal.filter");
const dateFilter = require("./src/code/filters/date.filter");
const extractExcerptShortcode = require("./src/code/shortcodes/extract-excerpt.shortcode");
const readingTime = require('eleventy-plugin-reading-time');

module.exports = function (config) {


  // Global data
  config.addGlobalData("websiteUrl", "https://1stchertseyscoutgroup.com");


  // Markdown engine with its plugins
  config.setLibrary("md", markdownLibrary);
  config.addPlugin(eleventyNavigationPlugin);
  config.addPlugin(readingTime);

  config.addPassthroughCopy({
    "src/public/": "./",
    "src/site/admin/config.yml": "./admin/config.yml",
    "src/site/content/_assets": "./assets",
    "node_modules/bootstrap/dist/js/bootstrap.bundle.min.js":
      "assets/js/bootstrap.bundle.min.js",
    "node_modules/jquery/dist/jquery.min.js": "assets/js/jquery.min.js",
  });

  config.setBrowserSyncConfig({
    files: "./dist/assets/css/*.css",
  });

  config.addFilter("dateFormat", dateFilter);
  config.addFilter("month", monthFilter);
  config.addFilter("dayOrdinal", dayOrdinalFilter);
  config.addShortcode("pageTitle", titleShortcode);
  config.addShortcode("excerpt", extractExcerptShortcode);
  config.addFilter("json", jsonFilter);
  config.addFilter("pad", padFilter);
  config.addFilter("parentKey", parentKeyFilter);
  config.addFilter("pageKey", pageKeyFilter);
  config.addShortcode("year", () => `${new Date().getFullYear()}`);

  config.addFilter("lowercase", function(value){
    return value.toLowerCase();
  })

  config.addFilter("limit", function (arr, limit) {
    return arr.slice(0, limit);
  });

  config.addFilter("parentNavigation", function (nodes = [], key = "") {
    let pages = [];
    for(let entry of nodes) {
      if(entry.data && entry.data.eleventyNavigation) {
        let nav = entry.data.eleventyNavigation;
        if(!key && !nav.key || nav.key === key) {
          pages.push(Object.assign({}, nav, {
            url: nav.url || entry.data.page.url,
            pluginType: "eleventy-navigation"
          }, key ? { parentKey: key } : {}));
        }
      }
    }
  
    return pages.sort(function(a, b) {
      return (a.order || 0) - (b.order || 0);
    }).map(function(entry) {
      if(!entry.title) {
        entry.title = entry.key;
      }
      
      return entry;
    })[0];
  });

  config.addFilter("findRelated", function (arr, key, tags) {
    let found = [];
    if (tags) {
      tags = tags.map(t => t.toLowerCase());

      arr.forEach((element) => {
        if (
          element.data.eleventyNavigation.key != key && 
          element.data.tags.length > 0 &&
          element.data.tags.some(v=> tags.indexOf(v.toLowerCase()) !== -1)
        ) {
          found.push(element);
        }
      });
    }

    return found;
  });

  config.addCollection("newsYear", (collection) => {
    return transformYear(
      collection.getFilteredByGlob("./src/site/content/news/**/*.md")
    );
  });

  config.addCollection("newsMonth", (collection) => {
    return transformMonth(
      collection.getFilteredByGlob("./src/site/content/news/**/*.md")
    );
  });

  config.addCollection("newsDay", (collection) => {
    return transformDay(
      collection.getFilteredByGlob("./src/site/content/news/**/*.md")
    );
  });

  config.addCollection("news", (collection) => {
    return collection.getFilteredByGlob("./src/site/content/news/**/*.md");
  });

  return {
    dir: {
      input: "src/site",
      output: "dist",
      layouts: "_layouts/",
    },
  };
};