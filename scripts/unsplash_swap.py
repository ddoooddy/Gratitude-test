#!/usr/bin/env python3
"""Replace local image paths with Unsplash URLs and add mobile-friendly attributes."""

import re

HTML_PATH = "/home/user/Gratitude-test/gratitude-stitch.html"

# Maps each local image path → Unsplash URL
# Dimensions chosen per usage: hero=1400w, about=900w, menu-cards=500w, gallery=700w
UNSPLASH = {
    # ── Hero & About ─────────────────────────────────────────────────────────
    "images/hero-interior.jpg":
        "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1400&q=80",
    "images/about-espacio.jpg":
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=900&q=80",

    # ── Menu cards — Desayunos ────────────────────────────────────────────────
    "images/menu-tostadas.svg":
        "https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=500&q=80",
    "images/menu-granola.svg":
        "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=500&q=80",
    "images/menu-pancakes.svg":
        "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=500&q=80",

    # ── Menu cards — Almuerzos ───────────────────────────────────────────────
    "images/menu-bowl-mediterraneo.svg":
        "https://images.unsplash.com/photo-1540189549336-e6e99d8f3117?w=500&q=80",
    "images/menu-tarta-hongos.svg":
        "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=500&q=80",
    "images/menu-salmon.svg":
        "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=500&q=80",

    # ── Menu cards — Café ────────────────────────────────────────────────────
    "images/menu-flatwhite.svg":
        "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500&q=80",
    "images/menu-coldbrew.svg":
        "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=500&q=80",

    # ── Menu cards — Postres ─────────────────────────────────────────────────
    "images/menu-cheesecake.svg":
        "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=500&q=80",
    "images/menu-brownie.svg":
        "https://images.unsplash.com/photo-1606313564200-e75d5e30ef07?w=500&q=80",

    # ── PDF menu card thumbnails ─────────────────────────────────────────────
    "images/pdf-lunch-menu.svg":
        "https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=400&q=80",
    "images/pdf-allday-menu.svg":
        "https://images.unsplash.com/photo-1517244683847-7456b63c5969?w=400&q=80",
    "images/pdf-menu-almuerzo.svg":
        "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=400&q=80",
    "images/pdf-menu-todoldia.svg":
        "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400&q=80",

    # ── Gallery showcase ─────────────────────────────────────────────────────
    "images/showcase-cafe.svg":
        "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=700&q=80",
    "images/showcase-plato-dia.svg":
        "https://images.unsplash.com/photo-1473093226795-af9932fe5856?w=700&q=80",
    "images/showcase-salmon.svg":
        "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=700&q=80",
    "images/showcase-pizza.svg":
        "https://images.unsplash.com/photo-1513104890138-7c749659a574?w=700&q=80",
    "images/showcase-hamburguesa.svg":
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=700&q=80",
    "images/showcase-tostadas.svg":
        "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=700&q=80",
}

with open(HTML_PATH, "r", encoding="utf-8") as f:
    html = f.read()

# 1. Replace each local src with the Unsplash URL
for local, url in UNSPLASH.items():
    old = f'src="{local}"'
    new = f'src="{url}"'
    count = html.count(old)
    if count:
        html = html.replace(old, new)
        print(f"  Replaced ({count}x): {local}")
    else:
        print(f"  NOT FOUND: {local}")

# 2. Add loading="lazy" and onerror to every <img> that doesn't already have them
#    We target <img tags and inject the attributes before the closing >
def add_img_attrs(match):
    tag = match.group(0)
    # Skip the lightbox empty src img and the Google Maps iframe (not img)
    if 'id="lightbox-img"' in tag:
        return tag
    if 'loading="lazy"' not in tag:
        tag = tag.rstrip("/>").rstrip(">").rstrip() + ' loading="lazy"'
        tag += "/>" if match.group(0).endswith("/>") else ">"
    if 'onerror=' not in tag:
        tag = tag.rstrip("/>").rstrip(">").rstrip() + " onerror=\"this.style.display='none'\""
        tag += "/>" if match.group(0).rstrip().endswith("/>") else ">"
    return tag

html = re.sub(r'<img\b[^>]+>', add_img_attrs, html)

# 3. Verify
remaining_local = sum(html.count(f'src="{k}"') for k in UNSPLASH)
remaining_base64 = html.count('src="data:image')
print(f"\nLocal image refs remaining: {remaining_local}")
print(f"Base64 src attrs remaining: {remaining_base64}")
lazy_count = html.count('loading="lazy"')
onerror_count = html.count('onerror=')
print(f"loading=lazy count: {lazy_count}")
print(f"onerror count: {onerror_count}")

with open(HTML_PATH, "w", encoding="utf-8") as f:
    f.write(html)

print(f"\nDone. HTML saved to {HTML_PATH}")
