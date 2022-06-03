#!/bin/sh
pandoc \
--filter=pandoc-crossref \
--citeproc \
--bibliography=intrapreneurship-research.bib \
--csl=compile-metadata/apa.csl \
$(cat compile-metadata/thesis-structure.txt) \
--template=eisvogel \
-o report/thesis.pdf

open report/thesis.pdf