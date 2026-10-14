"""Match seated CEO portrait silhouettes to the approved green-suit reference."""
from pathlib import Path
from PIL import Image

PHOTO_DIR = Path(__file__).resolve().parents[1] / "public/assets/photos"
ALPHA_THRESHOLD = 18

def visible_bounds(im):
    bounds = im.getchannel("A").point(lambda a: 255 if a >= ALPHA_THRESHOLD else 0).getbbox()
    if bounds is None: raise ValueError("Missing nontransparent subject")
    return bounds

def main():
    reference = Image.open(PHOTO_DIR / "hero-green-seated.webp").convert("RGBA")
    target_bounds = visible_bounds(reference)
    size = (target_bounds[2] - target_bounds[0], target_bounds[3] - target_bounds[1])
    for suit in ("navy", "gray"):
        original = Image.open(PHOTO_DIR / f"hero-{suit}-seated.webp").convert("RGBA")
        fitted = original.crop(visible_bounds(original)).resize(size, Image.Resampling.LANCZOS)
        result = Image.new("RGBA", reference.size, (0, 0, 0, 0))
        result.alpha_composite(fitted, (target_bounds[0], target_bounds[1]))
        filename = PHOTO_DIR / f"hero-{suit}-aligned.webp"
        result.save(filename, "WEBP", quality=75, method=2)
        assert result.size == reference.size
        assert visible_bounds(result) == target_bounds, suit
        print(f"{suit}: normalized to {reference.size}, visible {target_bounds}")

if __name__ == "__main__":
    main()
