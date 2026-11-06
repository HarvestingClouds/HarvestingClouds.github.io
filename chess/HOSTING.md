# Knight School: portable website package

This package replaces the earlier Next.js hosting ZIP. It runs the same React
application, but its production CSS and JavaScript are in an ordinary `assets`
folder, with relative URLs. It has **no `_next` folder dependency**, no Next.js
server, and no need to change your parent website's Jekyll configuration.

## Test locally on Windows

1. Extract the entire ZIP into a normal folder. Do not run files inside the ZIP.
2. Double-click **PREVIEW.cmd** in the extracted folder.
3. Keep the terminal open. It prints the local address and opens your browser
   at `http://127.0.0.1:PORT/chess/`, choosing a free port automatically.
4. Close the preview with Ctrl+C.

The launcher uses an existing Node.js installation or Python 3. It installs
nothing, needs no administrator privileges, and binds only to localhost.
If neither runtime is installed, it reports that explicitly; you can still
upload the static `chess` folder to your website without a server-side runtime.
On macOS/Linux, run `node preview.mjs` or `python3 preview.py`.

**Do not double-click `chess/index.html`.** That uses `file://`, where browser
security blocks important worker/data operations. The page now shows a clear
local-preview instruction instead of a broken, unstyled application.

## Upload to Harvesting Clouds or another website

Upload the entire **chess** folder into your public document root:

```text
YOUR EXISTING WEBSITE/
  chess/
    index.html
    assets/
      knight-school.css
      knight-school.js
    engine/
      stockfish-17.1-lite-single-03e3232.js
      stockfish-17.1-lite-single-03e3232.wasm
      Copying.txt
      AUTHORS
      SOURCE.txt
    puzzles/
      manifest.json
      catalog-....json
    licenses/
  ...all your existing website files stay unchanged...
```

Open **https://harvestingclouds.com/chess/** (or your own domain's `/chess/`).
Add a normal `/chess/` link to your existing website navigation.

Replace the old `chess/index.html` with the one from this ZIP and upload the new
`chess/assets` folder. Merely adding the new assets while keeping the OLD HTML
will not work: the old HTML still requests `_next` files. An old `_next` folder
can be removed once no previous version is in use, but is not used by this build.
Never replace your parent website's index, CNAME, theme or generator settings.

For GitHub Pages, commit the new files, wait for the Pages deployment to finish,
then hard-refresh. This package needs no `.nojekyll` marker; all required folders
are ordinary names accepted by Jekyll. If you added `.nojekyll` only for the old
chess package, this version no longer requires it. Do not remove a marker your
parent website otherwise relies on.

## Check that the upload is complete

These URLs must return the actual file with HTTP 200, not HTML or a 404:

- `/chess/assets/knight-school.css`
- `/chess/assets/knight-school.js`
- `/chess/puzzles/manifest.json`
- `/chess/engine/stockfish-17.1-lite-single-03e3232.js`
- `/chess/engine/stockfish-17.1-lite-single-03e3232.wasm`

If page source still mentions `/chess/_next/`, you are seeing the old HTML,
an incomplete upload, or a cached deployment. The new page refers to
`./assets/knight-school.css` and `./assets/knight-school.js` with version queries.
The loader displays an explicit message if JavaScript cannot be downloaded.

## Hosting requirements

- Use HTTPS for a public website. Localhost is supported for local testing.
- Serve `index.html` as the directory index; redirect `/chess` to `/chess/`.
- Exclude this folder and its assets from parent SPA/CMS catch-all rewrites,
  login redirects and HTML error-page fallbacks.
- Serve `.js` as JavaScript, `.css` as `text/css`, `.json` as `application/json`,
  and `.wasm` as `application/wasm`. Preserve binary files unchanged.
- Allow same-origin workers and WebAssembly. This single-threaded engine
  requires no COOP/COEP headers or cross-origin isolation.
- If you apply a restrictive Content Security Policy, permit the inline
  theme/loader scripts with your host's supported hashes or nonce mechanism,
  same-origin scripts/assets/workers, and WebAssembly compilation
  (`wasm-unsafe-eval`). Scope any policy change to the sub-app rather than
  weakening the whole website.
- Revalidate `index.html`, `assets/knight-school.js`, `assets/knight-school.css`
  and `puzzles/manifest.json` on updates. The index adds a content-derived
  version query to its CSS/JavaScript URLs; do not strip it.

Sections use client-side state, not server routes. The Puzzle Academy bookmark
is `/chess/?academy=puzzles`. No server-side Node/npm installation is required.
Relative asset URLs also allow serving the `chess` folder as a local server's
document root or putting the app in another normal subfolder.

## Optional iframe embedding

Linking is recommended. If your website permits same-origin frames:

```html
<iframe src="/chess/" title="Knight School chess learning"
        style="width:100%;height:900px;border:0" allow="autoplay"></iframe>
```

Keep a normal full-page link available for phones. Restrictive iframe sandboxes
can block storage, scripts, workers and audio. Audio still respects the sound
toggle and browser user-interaction requirements.

## Data, privacy and licenses

The package contains lessons, 686 validated pilot puzzles, the local Stockfish
worker/WASM, UI and synthesized sounds. It contains no personal games,
credentials or browser storage. Puzzle coverage is a finite pilot and engine
validation is bounded search, not exhaustive proof.

Progress and games stay in each visitor's browser, without cloud sync.
Localhost data does not automatically transfer to your public domain.
Storage is origin-scoped, not isolated from other apps on the same origin.
Clearing site data removes local progress. Existing game/repertoire backup
features remain available; there is no complete Puzzle Academy backup UI.

Keep `chess/licenses/` and the engine's `Copying.txt`, `AUTHORS`, and `SOURCE.txt`
when redistributing. Stockfish.js 17.1.0 uses GPLv3; its exact corresponding-source
archive and build directions are in `SOURCE.txt`. Lichess puzzle data is CC0
with source attribution preserved for each puzzle.

## Rebuild

From the source repository with dependencies installed:

```powershell
npm run typecheck:chess
npm run export:static --workspace @knight-school/web
```

Output: `apps/chess/static-export/`. The export-only Vite build bundles the
existing application into a classic production JavaScript file and extracted
CSS; it does not rebuild or replace the website implementation. Normal Next.js
development remains unchanged.
