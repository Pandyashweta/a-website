import os
import numpy as np
from PIL import Image, ImageDraw

def generate_favicons():
    source_path = 'assets/Group 1.png'
    if not os.path.exists(source_path):
        print(f"Error: {source_path} not found")
        return

    # Load source image
    src_img = Image.open(source_path).convert('RGBA')
    arr = np.array(src_img)
    r, g, b, a = arr[:, :, 0], arr[:, :, 1], arr[:, :, 2], arr[:, :, 3]

    # Find artwork mask (dark pixels)
    dark_mask = (a > 50) & ((r < 200) | (g < 200) | (b < 200))
    y_coords, x_coords = np.where(dark_mask)

    if len(y_coords) == 0:
        print("Error: No artwork found in image")
        return

    min_x, max_x = x_coords.min(), x_coords.max()
    min_y, max_y = y_coords.min(), y_coords.max()

    # Crop tight artwork
    tight_crop = src_img.crop((min_x, min_y, max_x + 1, max_y + 1))
    crop_w, crop_h = tight_crop.size

    # Calculate Optical Centroid vs Geometric Center inside the crop
    crop_arr = np.array(tight_crop)
    cr, cg, cb, ca = crop_arr[:,:,0], crop_arr[:,:,1], crop_arr[:,:,2], crop_arr[:,:,3]
    crop_mask = (ca > 50) & ((cr < 200) | (cg < 200) | (cb < 200))
    cy_coords, cx_coords = np.where(crop_mask)

    grayscale = 255.0 - (0.299 * cr + 0.587 * cg + 0.114 * cb)
    weights = grayscale[crop_mask]
    
    optical_cx = np.average(cx_coords, weights=weights)
    optical_cy = np.average(cy_coords, weights=weights)
    geom_cx = crop_w / 2.0
    geom_cy = crop_h / 2.0

    # Blended optical center offset from top-left of tight crop
    target_offset_x = 0.6 * optical_cx + 0.4 * geom_cx
    target_offset_y = 0.6 * optical_cy + 0.4 * geom_cy

    print(f"Tight crop size: {crop_w}x{crop_h}")
    print(f"Crop optical offset: ({target_offset_x:.2f}, {target_offset_y:.2f})")

    # Master Canvas Size (1024x1024)
    master_size = 1024
    safe_margin_ratio = 0.14 # 14% padding
    usable_size = int(master_size * (1 - 2 * safe_margin_ratio)) # ~737px

    # Scale factor to fit inside usable_size preserving aspect ratio
    scale = min(usable_size / crop_w, usable_size / crop_h)
    new_w = int(round(crop_w * scale))
    new_h = int(round(crop_h * scale))

    # Resize artwork with Lanczos resampling
    resized_artwork = tight_crop.resize((new_w, new_h), Image.Resampling.LANCZOS)

    # Scale the target offset accordingly
    scaled_offset_x = target_offset_x * scale
    scaled_offset_y = target_offset_y * scale

    # Position artwork on master canvas so its optical center is at (master_size/2, master_size/2)
    paste_x = int(round((master_size / 2.0) - scaled_offset_x))
    paste_y = int(round((master_size / 2.0) - scaled_offset_y))

    # 1. Create Dark Background Favicon Master (Matching site theme #0A0A0B with white "S")
    master_dark = Image.new('RGBA', (master_size, master_size), (0, 0, 0, 0))
    
    # Draw rounded squircle background
    draw_dark = ImageDraw.Draw(master_dark)
    squircle_margin = 32
    draw_dark.rounded_rectangle(
        [squircle_margin, squircle_margin, master_size - squircle_margin, master_size - squircle_margin],
        radius=200,
        fill=(10, 10, 11, 255), # #0A0A0B
        outline=(34, 34, 40, 255), # #222228 border
        width=12
    )

    # Convert dark logo pixels to crisp white for contrast against dark background
    artwork_white = Image.new('RGBA', (new_w, new_h), (255, 255, 255, 255))
    # Use original artwork alpha as mask
    artwork_alpha = resized_artwork.split()[3]
    master_dark.paste(artwork_white, (paste_x, paste_y), artwork_alpha)

    # 2. Create Transparent Master (Original Black Logo, Optically Centered)
    master_transparent = Image.new('RGBA', (master_size, master_size), (0, 0, 0, 0))
    master_transparent.paste(resized_artwork, (paste_x, paste_y), resized_artwork)

    # Save destinations
    public_dir = 'public'
    os.makedirs(public_dir, exist_ok=True)

    # Export sizes
    sizes = {
        'favicon-16x16.png': (16, 16),
        'favicon-32x32.png': (32, 32),
        'favicon-48x48.png': (48, 48),
        'apple-touch-icon.png': (180, 180),
        'android-chrome-192x192.png': (192, 192),
        'android-chrome-512x512.png': (512, 512),
        'favicon.png': (32, 32),
    }

    for filename, (w, h) in sizes.items():
        out_path = os.path.join(public_dir, filename)
        resized = master_dark.resize((w, h), Image.Resampling.LANCZOS)
        resized.save(out_path, 'PNG', optimize=True)
        print(f"Generated: {out_path} ({w}x{h})")

    # Generate multi-resolution ICO file
    ico_path = os.path.join(public_dir, 'favicon.ico')
    ico_sizes = [(16, 16), (32, 32), (48, 48)]
    ico_images = [master_dark.resize((w, h), Image.Resampling.LANCZOS) for w, h in ico_sizes]
    ico_images[0].save(ico_path, format='ICO', sizes=ico_sizes)
    print(f"Generated: {ico_path} (16x16, 32x32, 48x48)")

    # Generate favicon-transparent variant in assets
    transparent_32 = master_transparent.resize((32, 32), Image.Resampling.LANCZOS)
    transparent_32.save(os.path.join(public_dir, 'favicon-transparent.png'), 'PNG')
    print("Generated: favicon-transparent.png")

if __name__ == '__main__':
    generate_favicons()
