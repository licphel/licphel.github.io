# Licphel's personal homepage

This is a static HTML site using the browser's default styles with only minimal
spacing adjustments. It does not
require a build step or a JavaScript framework.

## Content

- `public/index.html` is the page shell.
- `public/script.js` loads the content and renders hash-based routes.
- `public/data/site.json` contains the personal introduction, navigation, and
  creation date. The footer's last-edited date is generated automatically from
  resource modification times when available.
- `public/data/news.json` contains homepage news items.
- `public/data/education.json`, `public/data/awards.json`, and
  `public/data/research.json` contain the corresponding homepage sections.
- `public/data/collaborators.json` contains manually listed collaborators;
  paper authors are added automatically from `papers.json`.
- `public/data/blogs.json` and `public/data/papers.json` contain configurable
  metadata. Their article bodies live in `public/data/blogs/` and
  `public/data/papers/`.
- `public/data/projects.json` contains the project list.

External navigation links are configured in `public/data/site.json`. The Google
Scholar entry is currently a label-only placeholder; fill in its `url` when the
profile link is ready.

The homepage's Collaborators section counts authors from `papers.json`, removes
duplicates, and sorts them by collaboration count. Extra collaborators can be added to
`collaborators.json` as strings (one collaboration by default) or as objects such as
`{"name":"Name","url":"https://example.com","count":2}`.

To add a blog post or paper, add an entry to the corresponding JSON file and
create the referenced HTML body file. No template or build configuration needs
to be changed.

## Local preview

Because the site loads JSON and article files with `fetch`, serve `public/`
over HTTP instead of opening `index.html` directly:

```sh
python3 -m http.server 8000 --directory public
```

Then open <http://localhost:8000>.
