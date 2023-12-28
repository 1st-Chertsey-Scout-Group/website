const markdownIt = require("markdown-it");
const emoji = require("markdown-it-emoji/light");
const attributes = require("markdown-it-link-attributes");
const attrs = require("markdown-it-attrs");
const video = require("markdown-it-video");
const anchor = require("markdown-it-anchor");
const string = require('string');
const slugify = s => string(s).slugify().toString()

module.exports = markdownIt({
  html: true, // Enable HTML tags in source
  breaks: true, // Convert '\n' in paragraphs into <br>
  linkify: true, // Autoconvert URL-like text to links
  typographer: true, // Enable some language-neutral replacement + quotes beautification
  // quotes: ['«\xA0', '\xA0»', '‹\xA0', '\xA0›']
})
  .use(emoji)
  .use(attributes, {
    pattern: /^(https?:)?\/\//,
    attrs: {
      target: "_blank",
      rel: "noopener",
    },
  })
  .use(attrs, {
    allowedAttributes: ["id", "class"],
  })
  .use(anchor, {
    slugify,
    permalink: anchor.permalink.linkAfterHeader({
      style: 'visually-hidden',
      assistiveText: title => `Permalink to "${title}"`,
      visuallyHiddenClass: 'visually-hidden',
      wrapper: ['<div class="header-permalink">', '</div>'],
      symbol: "🔗"
    })
  })
  .use(video, {
    youtube: { width: 640, height: 390 },
    vimeo: { width: 500, height: 281 },
    vine: { width: 600, height: 600, embed: "simple" },
    prezi: { width: 550, height: 400 },
  });
