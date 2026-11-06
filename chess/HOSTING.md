# Host Knight School at /chess/

## Upload

1. Extract the hosting ZIP on your computer.
2. Upload the entire `chess` folder into your website's public document root.
   The result must be `https://YOUR-WEBSITE/chess/index.html`, with `_next`,
   `engine`, `puzzles` and `licenses` folders inside that same `chess` folder.
3. Open `https://YOUR-WEBSITE/chess/`. Link to `/chess/` from your main website.

This is a static HTML/CSS/JavaScript/WebAssembly export. There is no Node.js
server, database server, API key or npm install required on the hosting server.
Keep the `_next` folder, including its leading underscore. Do not rename
`chess`, upload only `index.html`, or open it directly using a `file://` URL.
The `/chess` prefix is compiled into the export; another path needs a rebuild.
No existing website files need to be replaced.

## Hosting requirements

- Use HTTPS. Localhost is also supported for local testing.
- Serve `index.html` as the directory index and redirect `/chess` to `/chess/`.
- Exclude `/chess/` and its assets from any parent SPA rewrite, CMS catch-all
  rule, login redirect or HTML error-page fallback.
- Serve `.js` as JavaScript, `.css` as `text/css`, `.json` as `application/json`,
  and `.wasm` as `application/wasm`. Preserve binary files unchanged.
- Allow same-origin Web Workers and WASM. The single-threaded engine does not
  require COOP/COEP headers or cross-origin isolation.
- If your host applies a restrictive Content Security Policy, allow the
  exported Next.js inline bootstrap/theme scripts using hashes or the host's
  supported policy, same-origin scripts/assets/workers, and WebAssembly
  compilation (`wasm-unsafe-eval`). Do not disable your site's protection
  globally just to embed this app; scope any required policy to `/chess/`.
- Avoid long-lived caching for `index.html` and `puzzles/manifest.json`.
  Content-hashed `_next` files and puzzle shards may be cached long-term.

The app's internal sections use client state, not server routes. A bookmark
such as `/chess/?academy=puzzles` opens the Puzzle Academy. Do not rewrite
missing `.js`, `.wasm` or `.json` files to `index.html`.

## Embed instead of linking (optional)

Linking is recommended. If your website permits same-origin frames:

```html
<iframe src="/chess/" title="Knight School chess learning"
        style="width:100%;height:900px;border:0" allow="autoplay"></iframe>
```

Keep the full page accessible by a normal `/chess/` link, especially on phones.
Restrictive iframe sandboxing can block storage, scripts, workers or audio.
Music still respects the sound toggle and browser user-interaction rules.

## Data, privacy and updates

No player games, browser storage, credentials or account data are included.
Lessons, 686 validated pilot puzzles, the Stockfish worker/WASM, audio
synthesis and the application UI are included. Sounds need no external files.
Puzzle data is a finite pilot, not the complete Lichess database; engine checks
are bounded searches, not exhaustive proofs.

Games and progress are stored in the visitor's browser, without cloud sync.
Data from localhost does not automatically transfer to your website. Browser
storage is origin-scoped, not path-isolated: other trusted apps on the same
domain can access it. Use a separate origin if you need isolation, with a
separately built root-path export. Clearing site data removes local progress.
Take existing game/repertoire backups before moving domains; there is no
complete Puzzle Academy backup/restore interface.

To update, rebuild and upload the new package to the same `/chess/` location.
Do not delete visitors' site data. Preserve old hashed assets during a rolling
update if visitors may still have the previous version open.

## License notices

Keep `chess/licenses/` and `chess/engine/Copying.txt`, `AUTHORS`, and `SOURCE.txt`
when redistributing. The engine is Stockfish.js 17.1.0, GNU GPLv3; its exact
corresponding-source archive and build directions are linked in `SOURCE.txt`.
Lichess puzzle data is CC0 with per-puzzle source attribution.

## Rebuild from the source repository

Requires the repository's supported Node.js/npm and installed dependencies:

```powershell
npm run export:static --workspace @knight-school/web
```

Output: `apps/chess/static-export/` containing this guide and the `chess/`
upload folder. The export uses separate `.next-export` build files and leaves
the default root-path development configuration unchanged.
