const app = document.querySelector("#app");
const navigation = document.querySelector("#site-nav");
const footer = document.querySelector("#site-footer");

let content;

async function readJson(path) {
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`Could not load ${path} (${response.status})`);
  }
  return response.json();
}

function element(tag, text) {
  const node = document.createElement(tag);
  if (text !== undefined) node.textContent = text;
  return node;
}

function link(label, href) {
  const node = element("a", label);
  node.href = href;
  if (/^https?:\/\//.test(href)) {
    node.target = "_blank";
    node.rel = "noopener noreferrer";
  }
  return node;
}

function appendParts(parent, item) {
  if (item.prefix) parent.append(item.prefix);
  if (item.link) parent.append(link(item.link.label, item.link.url));
  if (item.text) parent.append(item.text);
  if (item.suffix) parent.append(item.suffix);
}

function section(title, children) {
  const node = element("section");
  node.append(element("h2", title), ...children);
  return node;
}

function entryList(items) {
  const list = element("ul");
  for (const item of items) {
    const row = element("li");
    if (item.period || item.date) {
      const time = element("strong", `${item.period || item.date}: `);
      row.append(time);
    }
    appendParts(row, item);
    list.append(row);
  }
  return list;
}

function renderNavigation(site) {
  document.querySelector(".site-title").textContent = site.name;
  navigation.replaceChildren();
  for (const item of site.navigation) {
    navigation.append(link(item.label, item.url));
  }
  footer.textContent = site.footer || "";
}

function renderHome() {
  const site = content.site;
  document.title = `${site.name} — Personal Homepage`;

  const profile = element("section", undefined);
  profile.className = "profile";
  const identity = element("div");
  identity.append(element("h1", site.name));
  for (const line of site.profileLines) identity.append(element("p", line));
  profile.append(identity);

  const about = section(
    "About Me",
    site.about.map((paragraph) => element("p", paragraph)),
  );
  const education = section("Education", [entryList(site.education)]);
  const awards = section("Contests & Awards", [entryList(site.awards)]);
  const research = section("Research Experiences", [entryList(site.research)]);
  const interests = section("Interests", [element("p", site.interests)]);

  app.replaceChildren(profile, about, education, awards, research, interests);
}

function collectionMeta(item, kind) {
  const meta = element("p");
  meta.className = "meta";
  if (kind === "blog") {
    const date = element("time", item.date);
    date.dateTime = item.date;
    meta.append(date);
  } else {
    meta.append(String(item.venue ? `${item.venue} · ` : ""));
    meta.append(String(item.year));
  }
  if (item.tags?.length) {
    const tags = element("span");
    tags.className = "tags";
    for (const tag of item.tags) {
      const label = element("span", tag);
      label.className = "tag";
      tags.append(label);
    }
    meta.append(" · ", tags);
  }
  return meta;
}

function collectionList(items, kind) {
  const list = element("div");
  for (const item of items) {
    const row = element("section");
    row.className = "collection-item";
    const href = `#${kind === "blog" ? "blog" : "paper"}/${item.slug}`;
    row.append(element("h2"));
    row.querySelector("h2").append(link(item.title, href));
    row.append(collectionMeta(item, kind));
    if (item.description) row.append(element("p", item.description));
    list.append(row);
  }
  return list;
}

function renderCollection(kind) {
  const isBlog = kind === "blog";
  const items = isBlog ? content.blogs : content.papers;
  const title = isBlog ? "Blogs" : "Papers";
  const description = isBlog
    ? "Notes on algorithms, machine learning, and computer science."
    : "Paper summaries, notes, and reading lists.";
  document.title = `${title} — ${content.site.name}`;
  const heading = element("h1", title);
  const intro = element("p", description);
  const sorted = [...items].sort((a, b) =>
    isBlog ? b.date.localeCompare(a.date) : b.year - a.year,
  );
  app.replaceChildren(heading, intro, collectionList(sorted, kind));
}

function renderProjects() {
  document.title = `Projects — ${content.site.name}`;
  const list = element("div");
  for (const project of content.projects) {
    const item = element("section");
    item.className = "collection-item";
    item.append(element("h2"));
    item.querySelector("h2").append(link(project.name, project.url));
    item.append(element("p", project.description));
    if (project.tags?.length) {
      const tags = element("p");
      tags.className = "tags";
      for (const tag of project.tags) {
        const label = element("span", tag);
        label.className = "tag";
        tags.append(label);
      }
      item.append(tags);
    }
    list.append(item);
  }
  app.replaceChildren(element("h1", "Projects"), element("p", "Things I've built and worked on."), list);
}

async function renderDetail(kind, slug) {
  const items = kind === "blog" ? content.blogs : content.papers;
  const item = items.find((entry) => entry.slug === slug);
  const title = kind === "blog" ? "Blogs" : "Papers";
  if (!item) {
    renderCollection(kind);
    return;
  }

  document.title = `${item.title} — ${content.site.name}`;
  const article = element("article");
  article.append(link(`← ${title}`, `#${kind === "blog" ? "blogs" : "papers"}`));
  article.append(element("h1", item.title));
  article.append(collectionMeta(item, kind));
  if (item.description) article.append(element("p", item.description));
  if (item.pdf) article.append(link("Download PDF", item.pdf));

  const body = element("div");
  body.className = "entry-body";
  body.append(element("p", "Loading…"));
  article.append(body);
  app.replaceChildren(article);

  if (!item.content) {
    body.replaceChildren();
    return;
  }

  const response = await fetch(item.content);
  if (!response.ok) throw new Error(`Could not load ${item.content}`);
  body.innerHTML = await response.text();
}

async function renderRoute() {
  const [route, slug] = location.hash.slice(1).split("/");
  try {
    if (!route || route === "home") renderHome();
    else if (route === "blogs") renderCollection("blog");
    else if (route === "papers") renderCollection("paper");
    else if (route === "projects") renderProjects();
    else if (route === "blog" && slug) await renderDetail("blog", slug);
    else if (route === "paper" && slug) await renderDetail("paper", slug);
    else renderHome();
  } catch (error) {
    console.error(error);
    app.replaceChildren(
      element("h1", "Unable to load this page"),
      element("p", "Please check that the site is being served over HTTP and try again."),
    );
  }
}

async function start() {
  content = {
    site: await readJson("data/site.json"),
    blogs: await readJson("data/blogs.json"),
    papers: await readJson("data/papers.json"),
    projects: await readJson("data/projects.json"),
  };
  renderNavigation(content.site);
  await renderRoute();
}

window.addEventListener("hashchange", renderRoute);
start().catch((error) => {
  console.error(error);
  app.replaceChildren(element("p", "Unable to load site data."));
});
