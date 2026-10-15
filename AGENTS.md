# Project rules
- Site media URLs, monochrome logos and font download specifications are centralized in `src/lib/site-media.ts`; use asset pointers to keep binary media out of source control.
- Global typography and background roles live in `src/styles.css`; page shells are transparent so the continuous background remains visible.
- Secondary editorial headings use `AdaptiveTitle` to measure the wide face after font loading and fall back to the condensed face when it cannot fit; primary headings remain condensed.