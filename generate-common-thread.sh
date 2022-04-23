#!/bin/sh
pandoc \
--citeproc \
--bibliography=intrapreneurship-research.bib \
--csl=compile-metadata/apa.csl \
common-thread/index.md \
--toc \
--top-level-division=chapter \
-o report/common-thread.docx

open report/common-thread.docx