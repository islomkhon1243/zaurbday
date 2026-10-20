from pathlib import Path
from PIL import Image

root = Path(__file__).parent / 'dist'
names = ['zaur-portrait-v2', 'night-drive-v3', 'tea-v3', 'garage', 'survivor', 'coop', 'north']
total_before = total_after = 0
for name in names:
    source = root / 'assets' / (name + '.png')
    target = source.with_suffix('.webp')
    with Image.open(source) as im:
        im.save(target, 'WEBP', quality=88, method=6)
    total_before += source.stat().st_size
    total_after += target.stat().st_size
for name in ['index.html', 'portfolio.js']:
    p = root / name
    text = p.read_text(encoding='utf-8')
    for image_name in names:
        text = text.replace(image_name + '.png', image_name + '.webp')
    text = text.replace('assets/${key}.png', 'assets/${key}.webp')
    p.write_text(text, encoding='utf-8')
print(f'Generated image delivery: {total_before:,} -> {total_after:,} bytes; originals retained.')
