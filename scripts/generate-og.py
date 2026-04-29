#!/usr/bin/env python3
"""
KANSO WAY — OG Image Generator
Generates og-image.jpg (1200x630) for social sharing
Run: python scripts/generate-og.py
Requires: pip install Pillow
"""

from PIL import Image, ImageDraw, ImageFont
import os

W, H = 1200, 630
BG = (14, 14, 13)
GOLD = (200, 184, 154)
TEXT = (232, 228, 220)
MUTED = (138, 134, 126)
BORDER = (42, 42, 40)

img = Image.new("RGB", (W, H), BG)
draw = ImageDraw.Draw(img)

# Border
draw.rectangle([24, 24, W-24, H-24], outline=BORDER, width=1)

# Decorative Chakana center symbol (simplified)
cx, cy = W//2, H//2 - 20
size = 90
pts = [
    (cx - size//3, cy - size//2),
    (cx + size//3, cy - size//2),
    (cx + size//3, cy - size//6),
    (cx + size//2, cy - size//6),
    (cx + size//2, cy + size//6),
    (cx + size//3, cy + size//6),
    (cx + size//3, cy + size//2),
    (cx - size//3, cy + size//2),
    (cx - size//3, cy + size//6),
    (cx - size//2, cy + size//6),
    (cx - size//2, cy - size//6),
    (cx - size//3, cy - size//6),
]
draw.polygon(pts, outline=GOLD, width=2)

# Label (overline)
try:
    font_sm = ImageFont.truetype("/usr/share/fonts/truetype/liberation/LiberationMono-Regular.ttf", 14)
    font_title = ImageFont.truetype("/usr/share/fonts/truetype/liberation/LiberationSerif-Regular.ttf", 64)
    font_sub = ImageFont.truetype("/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf", 18)
except:
    font_sm = ImageFont.load_default()
    font_title = font_sm
    font_sub = font_sm

label = "THE WORLD WAY COLLECTION"
lw = draw.textlength(label, font=font_sm)
draw.text(((W - lw)//2, cy - size//2 - 60), label, font=font_sm, fill=GOLD)

# Main title
title = "KANSO WAY"
tw = draw.textlength(title, font=font_title)
draw.text(((W - tw)//2, cy + size//2 + 30), title, font=font_title, fill=TEXT)

# Subtitle
sub = "The Luxury of Focus."
sw = draw.textlength(sub, font=font_sub)
draw.text(((W - sw)//2, cy + size//2 + 110), sub, font=font_sub, fill=MUTED)

# Domain
domain = "kansoway.com"
dw = draw.textlength(domain, font=font_sm)
draw.text(((W - dw)//2, H - 60), domain, font=font_sm, fill=MUTED)

# Save
out_path = os.path.join(os.path.dirname(__file__), "../public/images/og-image.jpg")
img.save(out_path, "JPEG", quality=92)
print(f"OG image saved → {out_path}")
