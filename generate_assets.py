#!/usr/bin/env python3
"""Generate placeholder PNG images for the Expo app."""

from PIL import Image, ImageDraw, ImageFont
import os

def create_icon():
    """Create a 512x512 icon.png with Kuota branding."""
    size = (512, 512)
    # Create a white background
    img = Image.new('RGB', size, color='#ffffff')
    draw = ImageDraw.Draw(img)

    # Draw a gradient blue circle
    for i in range(256, 0, -1):
        r = max(0, min(255, i))
        g = max(0, min(255, i + 20))
        b = max(0, min(255, i + 80))
        color = f'#{r:02x}{g:02x}{b:02x}'
        bbox = [
            (256 - i, 256 - i),
            (256 + i, 256 + i)
        ]
        draw.ellipse(bbox, fill=color)

    # Add "K" text in white
    try:
        font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 200)
    except:
        font = ImageFont.load_default()

    text = "K"
    bbox = draw.textbbox((0, 0), text, font=font)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]
    position = ((512 - text_width) // 2, (512 - text_height) // 2)
    draw.text(position, text, fill='white', font=font)

    return img

def create_splash():
    """Create a 1284x2556 splash.png with Kuota branding."""
    size = (1284, 2556)
    # Create a gradient background
    img = Image.new('RGB', size)
    pixels = img.load()

    # Vertical gradient from light blue to white
    for y in range(size[1]):
        ratio = y / size[1]
        r = max(0, min(255, int(100 * (1 - ratio))))
        g = max(0, min(255, int(150 * (1 - ratio) + 255 * ratio)))
        b = max(0, min(255, int(200 * (1 - ratio) + 255 * ratio)))
        for x in range(size[0]):
            pixels[x, y] = (r, g, b)

    draw = ImageDraw.Draw(img)

    # Draw a large circle in the center
    center_x, center_y = size[0] // 2, size[1] // 3
    radius = min(size[0], size[1]) // 5

    for i in range(radius, 0, -2):
        r = max(0, min(255, 100 - i//3))
        g = max(0, min(255, 150 - i//4))
        b = max(0, min(255, 200 + i//3))
        color = f'#{r:02x}{g:02x}{b:02x}'
        bbox = [
            (center_x - i, center_y - i),
            (center_x + i, center_y + i)
        ]
        draw.ellipse(bbox, fill=color)

    # Add "Kuota" text
    try:
        font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 80)
    except:
        font = ImageFont.load_default()

    text = "Kuota"
    bbox = draw.textbbox((0, 0), text, font=font)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]

    # Position text below the circle
    text_x = (size[0] - text_width) // 2
    text_y = center_y + radius + 50
    draw.text((text_x, text_y), text, fill='white', font=font)

    # Add subtitle
    try:
        small_font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 40)
    except:
        small_font = ImageFont.load_default()

    subtitle = "Algeria"
    bbox2 = draw.textbbox((0, 0), subtitle, font=small_font)
    subtitle_width = bbox2[2] - bbox2[0]

    subtitle_x = (size[0] - subtitle_width) // 2
    subtitle_y = text_y + text_height + 30
    draw.text((subtitle_x, subtitle_y), subtitle, fill='white', font=small_font)

    return img

def main():
    # Create assets directory
    assets_dir = '/home/engine/project/assets'
    os.makedirs(assets_dir, exist_ok=True)

    # Create icon
    icon = create_icon()
    icon_path = os.path.join(assets_dir, 'icon.png')
    icon.save(icon_path, 'PNG')
    print(f'Created {icon_path} (512x512)')

    # Create splash
    splash = create_splash()
    splash_path = os.path.join(assets_dir, 'splash.png')
    splash.save(splash_path, 'PNG')
    print(f'Created {splash_path} (1284x2556)')

    print('\nAssets generated successfully!')

if __name__ == '__main__':
    main()
