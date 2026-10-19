# src — the authored source that is version-controlled with the site

This folder is **not** the site. Nothing here is served as a page; `robots.txt` disallows it and
`check_site.py` skips it. The published HTML is what the builders write *outside* it.

What lives here now:

    src/layouts/console.html   the console chrome in one place: <head>, theme script, fonts,
                               site.css + motion.css, the masthead, the footer
    src/nav.json               the masthead list, in the order it should appear

Both are read by the generators, which live one level up in the working copy at `tools/`:

    python3 tools/build_posts.py      posts/*.md -> /posts/*.html, /writing.html, feed.xml, sitemap.xml
    python3 tools/build_archives.py   the published pages -> /archive/console · line · pixel

`build_posts.py` no longer copies the chrome out of a published page. It fills this template:

    {{TITLE}} {{DESCRIPTION}} {{URL}} {{OG_TYPE}} {{OG_TITLE}} {{OG_DESCRIPTION}}
    {{ROBOTS}} {{HEAD_EXTRA}} {{NAV}} {{CONTENT}}

so a new post, a new writing index, and (next) a whole new tab all inherit the same head,
the same masthead and the same footer. Editing `src/nav.json` and re-running the builders
changes the navigation on every generated page at once — that is the whole point of the
folder. Adding a page is: one nav entry in `nav.json`, one source file, one rebuild.

`index.html` is deliberately **not** generated: it is the reading edition, written by hand with
`assets/note.css`. The console layout is for the console edition, which is what posts, the
research pages and the data-dense tabs use.
