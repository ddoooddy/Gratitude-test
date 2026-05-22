#!/usr/bin/env python3
"""Extract base64 images from HTML, save as files, and update src paths."""

import re
import base64
import os
import sys
from io import BytesIO

try:
    from PIL import Image
    HAS_PIL = True
except ImportError:
    HAS_PIL = False
    print("PIL not available — JPEGs won't be compressed")

HTML_PATH = "/home/user/Gratitude-test/gratitude-stitch.html"
IMAGES_DIR = "/home/user/Gratitude-test/images"
os.makedirs(IMAGES_DIR, exist_ok=True)

# Descriptive name mapping based on alt text / id / context
# We'll match by position (line context) — using alt text as primary key
NAME_MAP = {
    "Interior de Gratitude": "hero-interior",
    "Gratitude — nuestro espacio": "about-espacio",
    "Tostadas Gratitude": "menu-tostadas",
    "Bowl de Granola": "menu-granola",
    "Pancakes de Avena": "menu-pancakes",
    "Bowl Mediterráneo": "menu-bowl-mediterraneo",
    "Tarta de Hongos": "menu-tarta-hongos",
    "Salmón Gratitude": "menu-salmon",
    "Flat White": "menu-flatwhite",
    "Cold Brew": "menu-coldbrew",
    "Cheesecake": "menu-cheesecake",
    "Brownie": "menu-brownie",
    "Lunch Menu": "pdf-lunch-menu",
    "All Day Menu": "pdf-allday-menu",
    "Menú Almuerzo": "pdf-menu-almuerzo",
    "Menú Todo el Día": "pdf-menu-todoldia",
    "Café especial": "showcase-cafe",
    "Plato del día": "showcase-plato-dia",
    "Salmón": "showcase-salmon",
    "Pizza artesanal": "showcase-pizza",
    "Hamburguesa gourmet": "showcase-hamburguesa",
    "Tostadas": "showcase-tostadas",
}

with open(HTML_PATH, "r", encoding="utf-8") as f:
    html = f.read()

# Pattern to match <img ... src="data:image/TYPE;base64,DATA" ...>
# Captures: everything before src=, the type, the base64 data, everything after
IMG_PATTERN = re.compile(
    r'(<img\b[^>]*?)\bsrc="data:image/(jpeg|png|gif|webp|svg\+xml);base64,([A-Za-z0-9+/=\s]+?)"([^>]*?>)',
    re.DOTALL
)

def get_alt_text(before, after):
    """Extract alt attribute from surrounding img tag fragments."""
    combined = before + after
    m = re.search(r'\balt="([^"]*)"', combined)
    return m.group(1) if m else ""

def get_img_id(before, after):
    """Extract id attribute."""
    combined = before + after
    m = re.search(r'\bid="([^"]*)"', combined)
    return m.group(1) if m else ""

def save_jpeg(data_bytes, name):
    """Save JPEG, compressing to <300KB if needed."""
    path = os.path.join(IMAGES_DIR, f"{name}.jpg")
    if HAS_PIL:
        img = Image.open(BytesIO(data_bytes))
        if img.mode in ("RGBA", "P"):
            img = img.convert("RGB")
        quality = 85
        buf = BytesIO()
        img.save(buf, format="JPEG", quality=quality, optimize=True)
        # Reduce quality until under 300KB
        while buf.tell() > 300 * 1024 and quality > 30:
            quality -= 10
            buf = BytesIO()
            img.save(buf, format="JPEG", quality=quality, optimize=True)
        with open(path, "wb") as f:
            f.write(buf.getvalue())
        print(f"  Saved JPEG ({buf.tell()//1024}KB, q={quality}): {name}.jpg")
    else:
        with open(path, "wb") as f:
            f.write(data_bytes)
        print(f"  Saved JPEG ({len(data_bytes)//1024}KB, uncompressed): {name}.jpg")
    return f"images/{name}.jpg"

def save_svg(data_bytes, name):
    """Save SVG file."""
    path = os.path.join(IMAGES_DIR, f"{name}.svg")
    with open(path, "wb") as f:
        f.write(data_bytes)
    print(f"  Saved SVG ({len(data_bytes)}B): {name}.svg")
    return f"images/{name}.svg"

def save_png(data_bytes, name):
    """Save PNG, compressing if needed."""
    path = os.path.join(IMAGES_DIR, f"{name}.png")
    if HAS_PIL and len(data_bytes) > 300 * 1024:
        img = Image.open(BytesIO(data_bytes))
        buf = BytesIO()
        img.save(buf, format="PNG", optimize=True)
        data_bytes = buf.getvalue()
    with open(path, "wb") as f:
        f.write(data_bytes)
    print(f"  Saved PNG ({len(data_bytes)//1024}KB): {name}.png")
    return f"images/{name}.png"

name_counts = {}
replacements = []

for m in IMG_PATTERN.finditer(html):
    before, img_type, b64_data, after = m.group(1), m.group(2), m.group(3), m.group(4)
    alt = get_alt_text(before, after)
    img_id = get_img_id(before, after)

    # Determine base name
    base_name = NAME_MAP.get(alt)
    if not base_name:
        base_name = img_id if img_id else f"image-{len(replacements)+1}"

    # Handle duplicates
    if base_name in name_counts:
        name_counts[base_name] += 1
        unique_name = f"{base_name}-{name_counts[base_name]}"
    else:
        name_counts[base_name] = 1
        unique_name = base_name

    # Decode base64 (strip whitespace)
    b64_clean = b64_data.replace("\n", "").replace(" ", "").strip()
    try:
        data_bytes = base64.b64decode(b64_clean)
    except Exception as e:
        print(f"  ERROR decoding {unique_name}: {e}")
        continue

    # Save by type
    if img_type == "jpeg":
        rel_path = save_jpeg(data_bytes, unique_name)
        ext = "jpg"
    elif img_type == "svg+xml":
        rel_path = save_svg(data_bytes, unique_name)
        ext = "svg"
    elif img_type == "png":
        rel_path = save_png(data_bytes, unique_name)
        ext = "png"
    else:
        path = os.path.join(IMAGES_DIR, f"{unique_name}.{img_type}")
        with open(path, "wb") as f:
            f.write(data_bytes)
        rel_path = f"images/{unique_name}.{img_type}"
        print(f"  Saved {img_type} ({len(data_bytes)//1024}KB): {unique_name}.{img_type}")

    replacements.append((m.start(), m.end(), m.group(0), before, after, img_type, rel_path))

print(f"\nTotal images extracted: {len(replacements)}")

# Rebuild HTML with replacements (process in reverse to preserve offsets)
new_html = html
for start, end, original, before, after, img_type, rel_path in replacements:
    new_tag = f'{before}src="{rel_path}"{after}'
    new_html = new_html.replace(original, new_tag, 1)

# Verify no base64 images remain
remaining = len(re.findall(r'src="data:image/', new_html))
print(f"Remaining base64 src attributes: {remaining}")

with open(HTML_PATH, "w", encoding="utf-8") as f:
    f.write(new_html)

print(f"HTML updated: {HTML_PATH}")
print(f"Images saved to: {IMAGES_DIR}")
