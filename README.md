# Licphel's personal homepage

This is a static HTML site using the browser's default styles with only minimal
spacing adjustments. It does not
require a build step or a JavaScript framework.

## Content

- `public/index.html` is the page shell.
- `public/script.js` loads the content and renders hash-based routes.
- `public/data/site.json` contains the personal introduction and navigation.
- `public/data/blogs.json` and `public/data/papers.json` contain configurable
  metadata. Their article bodies live in `public/data/blogs/` and
  `public/data/papers/`.
- `public/data/projects.json` contains the project list.

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
