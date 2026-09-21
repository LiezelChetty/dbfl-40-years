# DBFL 40 Years and Website Editor Concept

This repository contains:

- an immersive DBFL 40 Years anniversary experience (`index.html`)
- a future-facing DBFL website concept (`dbfl.html`)
- public About, What We Do, Projects, News and article templates
- a browser-based content editor demonstration (`admin.html`)

## Run locally

Open the folder through a local web server, for example:

```bash
python3 -m http.server 4173
```

Then visit `http://localhost:4173`.

## Editor demonstration

The editor stores demo changes in the browser's `localStorage`. It intentionally does not write to the live DBFL website. A production version would replace the local storage layer with authenticated WordPress REST API calls and use the WordPress Media Library for uploads.

Suggested production controls include role-based access, revisions, scheduled publishing, image optimisation, moderation and audit logs.
