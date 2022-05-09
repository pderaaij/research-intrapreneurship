#!/bin/sh
pandoc \
--filter=pandoc-crossref \
--citeproc \
--bibliography=intrapreneurship-research.bib \
--csl=compile-metadata/apa.csl \
$(cat compile-metadata/thesis-structure.txt) \
--toc \
--top-level-division=chapter \
-o report/thesis.docx

open report/thesis.docx