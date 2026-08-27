#!/bin/sh
# index.html is the source of truth (it is what gets pasted into WordPress).
# preview.html loads the same logic from events-component.js, generated here.
# Re-run this after editing the <script> block in index.html.
set -e
cd "$(dirname "$0")"
{
  echo "/* GENERATED FILE — do not edit."
  echo "   Source: events/index.html <script> block. Regenerate with ./extract-js.sh */"
  awk '/^<script>$/{flag=1;next} /^<\/script>$/{flag=0} flag' index.html
} > events-component.js
echo "Wrote events-component.js ($(wc -l < events-component.js) lines)"
