# blog-diagrams

Pre-rendered diagrams for the CharaChorder blog (`blog` and `blog-zh-tw`).

Mermaid code blocks render differently in HackMD and on the Hexo site (different Mermaid versions), so diagrams are rendered here to PNG images and embedded in the HackMD notes as images instead.

## Usage

```sh
yarn install
yarn build                        # render every diagrams/<edition>/*.mmd to out/<edition>/*.png
yarn build zh-tw                  # render one edition
yarn build learning-stages        # render the named diagram in every edition
yarn build en/learning-stages     # render one specific diagram
```

Layout: `diagrams/en/` is for `blog`, `diagrams/zh-tw/` for `blog-zh-tw`. Both editions use the same file names for the same diagram.

Then add the PNG from `out/` to the HackMD note as an image (with alt text). `generate-posts.ts` in the blog repos downloads referenced images into `source/images/`.

## Pinned versions

`mermaid` is pinned to **11.17.2** (and forced via `resolutions`) so renders are reproducible. Both blogs embed the PNGs from this repo, so the version no longer has to match the Mermaid loaded by any theme or HackMD.

`@mermaid-js/mermaid-cli` 12.x declares `mermaid@^12`, but `resolutions` forces 11.17.2 (yarn prints an "incompatible" warning, which is expected). Mermaid 12 draws Gantt tasks differently, so keep the pin. `puppeteer` 25 is needed because older `@puppeteer/browsers` pulled in the vulnerable `extract-zip`.

Gantt diagrams use `dateFormat x` (milliseconds) with values multiplied by 1000 (e.g. `13` becomes `13000`, while durations such as `1s` stay as they are). With `dateFormat X` (seconds), Mermaid 11.16+ draws every task start at 0, so don't switch back. `axisFormat %s` still shows seconds on the axis.

When upgrading Mermaid, run `yarn build` (check the exit code, a parse error aborts the run) and compare the output with the previous PNGs.

## Notes

- Background is opaque white so images stay readable in both light and dark mode.
- Output is scaled 2x (`-s 2`) for crisp text.
- `out/` is gitignored; the `.mmd` files are the source of truth.
