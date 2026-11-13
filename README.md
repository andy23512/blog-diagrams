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

`mermaid` is pinned to **11.10.1** (and forced via `resolutions`) to match the version loaded by `hexo-theme-next` in `blog` (`_vendors.yml`). Newer Mermaid (12.x) positions Gantt tasks differently with `dateFormat X`: every start is drawn at 0. If the theme's Mermaid version changes, update the pin here and re-check the output.

## Notes

- Background is opaque white so images stay readable in both light and dark mode.
- Output is scaled 2x (`-s 2`) for crisp text.
- `out/` is gitignored; the `.mmd` files are the source of truth.
