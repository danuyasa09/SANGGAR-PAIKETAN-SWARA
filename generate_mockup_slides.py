import os
import math
import textwrap
from PIL import Image, ImageDraw, ImageFont, ImageFilter

OUTPUT_DIR = r"c:\Users\Ready\OneDrive\Documents\PT.INDOAPPS SOLUSINDO\sanggar_client\public\images\mockups"
ARTIFACT_DIR = r"C:\Users\Ready\.gemini\antigravity-ide\brain\8435c619-97b2-46be-9093-821306177b19"
os.makedirs(OUTPUT_DIR, exist_ok=True)

SHOTS = {
    "hero": r"C:\Users\Ready\.gemini\antigravity-ide\brain\8435c619-97b2-46be-9093-821306177b19\real_slide1_hero_1790123480230.png",
    "founder": r"C:\Users\Ready\.gemini\antigravity-ide\brain\8435c619-97b2-46be-9093-821306177b19\real_slide2_founder_1790123517234.png",
    "programs": r"C:\Users\Ready\.gemini\antigravity-ide\brain\8435c619-97b2-46be-9093-821306177b19\real_slide3_clean_1790123710130.png",
    "mobile": r"C:\Users\Ready\.gemini\antigravity-ide\brain\8435c619-97b2-46be-9093-821306177b19\real_slide4_mobile_1790123552503.png",
}

LOGO_PATH = r"c:\Users\Ready\OneDrive\Documents\PT.INDOAPPS SOLUSINDO\sanggar_client\public\images\logo.png"

FONT_SERIF_BOLD = r"C:\Windows\Fonts\georgiab.ttf"
FONT_SERIF = r"C:\Windows\Fonts\georgia.ttf"
FONT_SANS_BOLD = r"C:\Windows\Fonts\segoeuib.ttf"
FONT_SANS = r"C:\Windows\Fonts\segoeui.ttf"

def get_font(path, size):
    try:
        return ImageFont.truetype(path, size)
    except:
        return ImageFont.load_default()

def draw_vector_check(draw, cx, cy, color=(201, 155, 83, 255)):
    # Draw a clean checkmark centered around cx, cy
    draw.line([(cx - 4, cy), (cx - 1, cy + 3)], fill=color, width=2)
    draw.line([(cx - 1, cy + 3), (cx + 5, cy - 3)], fill=color, width=2)

def create_base_canvas(width=1920, height=1080):
    base = Image.new("RGBA", (width, height), (13, 17, 23, 255))
    draw = ImageDraw.Draw(base)
    
    # Smooth vertical dark gradient
    for y in range(height):
        ratio = y / height
        r = int(14 + (22 - 14) * ratio)
        g = int(18 + (28 - 18) * ratio)
        b = int(24 + (36 - 24) * ratio)
        draw.line([(0, y), (width, y)], fill=(r, g, b, 255))
        
    # Golden ambient radial glow top-right
    glow = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    glow_draw = ImageDraw.Draw(glow)
    cx, cy = int(width * 0.85), int(height * 0.15)
    for rad in range(650, 0, -20):
        alpha = int(24 * (1 - rad / 650))
        glow_draw.ellipse([cx - rad, cy - rad, cx + rad, cy + rad], fill=(201, 155, 83, alpha))
        
    # Ambient glow bottom-left
    cx2, cy2 = int(width * 0.12), int(height * 0.88)
    for rad in range(500, 0, -25):
        alpha = int(18 * (1 - rad / 500))
        glow_draw.ellipse([cx2 - rad, cy2 - rad, cx2 + rad, cy2 + rad], fill=(184, 134, 11, alpha))

    base = Image.alpha_composite(base, glow)
    return base

def draw_header(canvas, slide_num, slide_tag, slide_title):
    draw = ImageDraw.Draw(canvas)
    
    if os.path.exists(LOGO_PATH):
        try:
            logo = Image.open(LOGO_PATH).convert("RGBA")
            logo = logo.resize((56, 56), Image.Resampling.LANCZOS)
            canvas.paste(logo, (80, 42), logo)
        except Exception:
            pass

    font_brand = get_font(FONT_SERIF_BOLD, 22)
    font_sub = get_font(FONT_SANS_BOLD, 10)
    
    draw.text((150, 46), "SANGGAR PAIKETAN SWARA", font=font_brand, fill=(225, 185, 120, 255))
    draw.text((152, 74), "GAMELAN & TARI BALI  •  WEBSITE CLIENT SHOWCASE", font=font_sub, fill=(160, 165, 175, 255))

    badge_text = f"SLIDE {slide_num:02d}  |  {slide_tag.upper()}"
    font_badge = get_font(FONT_SANS_BOLD, 12)
    
    bbox = draw.textbbox((0, 0), badge_text, font=font_badge)
    bw = bbox[2] - bbox[0] + 32
    bh = 34
    bx = 1920 - 80 - bw
    by = 52
    draw.rounded_rectangle([bx, by, bx + bw, by + bh], radius=17, fill=(35, 42, 54, 255), outline=(201, 155, 83, 160), width=1)
    draw.text((bx + 16, by + 9), badge_text, font=font_badge, fill=(230, 200, 150, 255))
    
    draw.line([(80, 115), (1920 - 80, 115)], fill=(45, 52, 65, 255), width=1)
    draw.line([(80, 115), (320, 115)], fill=(201, 155, 83, 220), width=2)

def create_browser_mockup(screenshot_path, target_w=1200, target_h=720):
    screen = Image.open(screenshot_path).convert("RGBA")
    
    bar_height = 42
    border = 2
    corner_r = 14
    
    inner_w = target_w - (border * 2)
    inner_h = target_h - bar_height - border
    
    screen_ratio = screen.width / screen.height
    inner_ratio = inner_w / inner_h
    
    if screen_ratio > inner_ratio:
        crop_w = int(screen.height * inner_ratio)
        offset = (screen.width - crop_w) // 2
        screen_cropped = screen.crop((offset, 0, offset + crop_w, screen.height))
    else:
        crop_h = int(screen.width / inner_ratio)
        screen_cropped = screen.crop((0, 0, screen.width, min(screen.height, crop_h)))
        
    screen_resized = screen_cropped.resize((inner_w, inner_h), Image.Resampling.LANCZOS)
    
    browser = Image.new("RGBA", (target_w, target_h), (0, 0, 0, 0))
    bdraw = ImageDraw.Draw(browser)
    
    # Outer frame container
    bdraw.rounded_rectangle([0, 0, target_w, target_h], radius=corner_r, fill=(24, 28, 38, 255), outline=(60, 68, 85, 255), width=border)
    
    # Title bar
    bdraw.rounded_rectangle([0, 0, target_w, bar_height + 10], radius=corner_r, fill=(35, 41, 54, 255))
    bdraw.rectangle([0, bar_height - 2, target_w, bar_height], fill=(35, 41, 54, 255))
    bdraw.line([(0, bar_height), (target_w, bar_height)], fill=(50, 58, 74, 255), width=1)
    
    # Dots
    dot_y = bar_height // 2
    bdraw.ellipse([20, dot_y - 6, 32, dot_y + 6], fill=(255, 95, 86, 255))
    bdraw.ellipse([40, dot_y - 6, 52, dot_y + 6], fill=(255, 189, 46, 255))
    bdraw.ellipse([60, dot_y - 6, 72, dot_y + 6], fill=(39, 201, 63, 255))
    
    # URL bar
    url_w = int(target_w * 0.44)
    url_h = 24
    url_x = (target_w - url_w) // 2
    url_y = (bar_height - url_h) // 2
    bdraw.rounded_rectangle([url_x, url_y, url_x + url_w, url_y + url_h], radius=12, fill=(20, 24, 32, 255), outline=(48, 56, 72, 255), width=1)
    
    font_url = get_font(FONT_SANS, 11)
    url_text = "https://sanggarpaiketanswara.com"
    bdraw.text((url_x + 34, url_y + 4), url_text, font=font_url, fill=(160, 170, 185, 255))
    bdraw.ellipse([url_x + 16, url_y + 8, url_x + 23, url_y + 15], fill=(201, 155, 83, 255))
    
    # Mask screenshot bottom corners so they curve with browser frame
    inner_mask = Image.new("L", (inner_w, inner_h), 255)
    im_draw = ImageDraw.Draw(inner_mask)
    # Mask bottom corners
    im_draw.rectangle([0, 0, inner_w, inner_h - corner_r], fill=255)
    im_draw.rounded_rectangle([0, inner_h - (corner_r * 2), inner_w, inner_h], radius=corner_r - border, fill=255)
    
    browser.paste(screen_resized, (border, bar_height), inner_mask)
    
    # Outline re-applied
    bdraw.rounded_rectangle([0, 0, target_w - 1, target_h - 1], radius=corner_r, fill=None, outline=(75, 85, 105, 180), width=1)
    
    # Glow / Drop Shadow
    shadow_margin = 40
    total_w = target_w + shadow_margin * 2
    total_h = target_h + shadow_margin * 2
    shadow_img = Image.new("RGBA", (total_w, total_h), (0, 0, 0, 0))
    sdraw = ImageDraw.Draw(shadow_img)
    sdraw.rounded_rectangle([shadow_margin, shadow_margin + 12, shadow_margin + target_w, shadow_margin + target_h + 12], radius=corner_r + 4, fill=(0, 0, 0, 150))
    shadow_img = shadow_img.filter(ImageFilter.GaussianBlur(radius=24))
    
    shadow_img.paste(browser, (shadow_margin, shadow_margin), browser)
    return shadow_img

def create_phone_mockup(screenshot_path, target_h=780):
    screen = Image.open(screenshot_path).convert("RGBA")
    
    phone_w = int(target_h * 0.48)
    phone_h = target_h
    corner_r = 38
    bezel = 12
    
    inner_w = phone_w - (bezel * 2)
    inner_h = phone_h - (bezel * 2)
    
    screen_ratio = screen.width / screen.height
    inner_ratio = inner_w / inner_h
    
    if screen_ratio > inner_ratio:
        crop_w = int(screen.height * inner_ratio)
        offset = (screen.width - crop_w) // 2
        screen_cropped = screen.crop((offset, 0, offset + crop_w, screen.height))
    else:
        crop_h = int(screen.width / inner_ratio)
        screen_cropped = screen.crop((0, 0, screen.width, min(screen.height, crop_h)))
        
    screen_resized = screen_cropped.resize((inner_w, inner_h), Image.Resampling.LANCZOS)
    
    phone = Image.new("RGBA", (phone_w, phone_h), (0, 0, 0, 0))
    pdraw = ImageDraw.Draw(phone)
    
    pdraw.rounded_rectangle([0, 0, phone_w, phone_h], radius=corner_r, fill=(20, 22, 28, 255), outline=(70, 75, 88, 255), width=2)
    
    screen_mask = Image.new("L", (inner_w, inner_h), 0)
    smdraw = ImageDraw.Draw(screen_mask)
    smdraw.rounded_rectangle([0, 0, inner_w, inner_h], radius=corner_r - bezel, fill=255)
    
    phone.paste(screen_resized, (bezel, bezel), screen_mask)
    
    # Dynamic Island
    island_w = 90
    island_h = 24
    island_x = (phone_w - island_w) // 2
    island_y = bezel + 8
    pdraw.rounded_rectangle([island_x, island_y, island_x + island_w, island_y + island_h], radius=12, fill=(10, 10, 12, 255))
    
    pdraw.rounded_rectangle([bezel, bezel, bezel + inner_w, bezel + inner_h], radius=corner_r - bezel, fill=None, outline=(0, 0, 0, 120), width=1)
    
    shadow_margin = 35
    total_w = phone_w + shadow_margin * 2
    total_h = phone_h + shadow_margin * 2
    shadow_img = Image.new("RGBA", (total_w, total_h), (0, 0, 0, 0))
    sdraw = ImageDraw.Draw(shadow_img)
    sdraw.rounded_rectangle([shadow_margin, shadow_margin + 10, shadow_margin + phone_w, shadow_margin + phone_h + 10], radius=corner_r + 4, fill=(0, 0, 0, 160))
    shadow_img = shadow_img.filter(ImageFilter.GaussianBlur(radius=22))
    
    shadow_img.paste(phone, (shadow_margin, shadow_margin), phone)
    return shadow_img

def build_desktop_slide(slide_num, tag, title, desc, bullets, screenshot_key, filename):
    canvas = create_base_canvas(1920, 1080)
    draw_header(canvas, slide_num, tag, title)
    
    browser_frame = create_browser_mockup(SHOTS[screenshot_key], target_w=1200, target_h=720)
    canvas.paste(browser_frame, (70, 150), browser_frame)
    
    panel_x = 1360
    panel_y = 190
    panel_w = 480
    panel_h = 680
    
    draw = ImageDraw.Draw(canvas)
    draw.rounded_rectangle([panel_x, panel_y, panel_x + panel_w, panel_y + panel_h], radius=16, fill=(20, 24, 32, 235), outline=(50, 58, 74, 255), width=1)
    draw.line([(panel_x + 32, panel_y + 1), (panel_x + 130, panel_y + 1)], fill=(201, 155, 83, 255), width=3)
    
    font_cat = get_font(FONT_SANS_BOLD, 11)
    draw.text((panel_x + 32, panel_y + 34), "— FITUR UTAMA & DESAIN —", font=font_cat, fill=(201, 155, 83, 255))
    
    font_title = get_font(FONT_SERIF_BOLD, 26)
    draw.text((panel_x + 32, panel_y + 60), title, font=font_title, fill=(255, 255, 255, 255))
    
    font_desc = get_font(FONT_SANS, 14)
    wrapped_desc = textwrap.fill(desc, width=42)
    draw.text((panel_x + 32, panel_y + 128), wrapped_desc, font=font_desc, fill=(185, 192, 205, 255), spacing=6)
    
    draw.line([(panel_x + 32, panel_y + 235), (panel_x + panel_w - 32, panel_y + 235)], fill=(40, 48, 62, 255), width=1)
    draw.text((panel_x + 32, panel_y + 255), "POIN PENTING UNTUK KLIEN:", font=get_font(FONT_SANS_BOLD, 12), fill=(225, 185, 120, 255))
    
    by = panel_y + 295
    font_b_title = get_font(FONT_SANS_BOLD, 14)
    font_b_sub = get_font(FONT_SANS, 13)
    
    for b_title, b_sub in bullets:
        # Custom drawn gold circle with vector checkmark
        draw.ellipse([panel_x + 32, by + 1, panel_x + 48, by + 17], fill=(201, 155, 83, 40), outline=(201, 155, 83, 220), width=1)
        draw_vector_check(draw, panel_x + 40, by + 9, color=(201, 155, 83, 255))
        
        draw.text((panel_x + 60, by), b_title, font=font_b_title, fill=(245, 245, 250, 255))
        wrapped_sub = textwrap.fill(b_sub, width=38)
        draw.text((panel_x + 60, by + 24), wrapped_sub, font=font_b_sub, fill=(160, 168, 182, 255), spacing=4)
        
        lines_count = len(wrapped_sub.split('\n'))
        by += 30 + (lines_count * 20) + 14

    draw.text((80, 1030), "SANGGAR PAIKETAN SWARA  •  DESA BANTAS, SELEMADEG TIMUR, TABANAN - BALI", font=get_font(FONT_SANS, 11), fill=(100, 108, 122, 255))
    draw.text((1600, 1030), "STATUS: PRODUCTION LIVE", font=get_font(FONT_SANS_BOLD, 11), fill=(46, 204, 113, 255))
    
    out_path = os.path.join(OUTPUT_DIR, filename)
    canvas.save(out_path, "PNG", quality=95)
    art_path = os.path.join(ARTIFACT_DIR, filename)
    canvas.save(art_path, "PNG", quality=95)
    print(f"Generated: {filename}")

def build_mobile_slide(slide_num, tag, title, desc, screenshot_key, filename):
    canvas = create_base_canvas(1920, 1080)
    draw_header(canvas, slide_num, tag, title)
    
    phone_frame = create_phone_mockup(SHOTS[screenshot_key], target_h=780)
    canvas.paste(phone_frame, (220, 150), phone_frame)
    
    panel_x = 760
    panel_y = 185
    panel_w = 1040
    panel_h = 715
    
    draw = ImageDraw.Draw(canvas)
    draw.rounded_rectangle([panel_x, panel_y, panel_x + panel_w, panel_y + panel_h], radius=18, fill=(20, 24, 32, 235), outline=(50, 58, 74, 255), width=1)
    draw.line([(panel_x + 40, panel_y + 1), (panel_x + 160, panel_y + 1)], fill=(201, 155, 83, 255), width=3)
    
    font_cat = get_font(FONT_SANS_BOLD, 12)
    draw.text((panel_x + 40, panel_y + 36), "— MOBILE FIRST & ULTRA-RESPONSIVE —", font=font_cat, fill=(201, 155, 83, 255))
    
    font_title = get_font(FONT_SERIF_BOLD, 30)
    draw.text((panel_x + 40, panel_y + 68), title, font=font_title, fill=(255, 255, 255, 255))
    
    font_desc = get_font(FONT_SANS, 15)
    wrapped_desc = textwrap.fill(desc, width=82)
    draw.text((panel_x + 40, panel_y + 132), wrapped_desc, font=font_desc, fill=(185, 192, 205, 255), spacing=6)
    
    draw.line([(panel_x + 40, panel_y + 215), (panel_x + panel_w - 40, panel_y + 215)], fill=(40, 48, 62, 255), width=1)
    
    cards = [
        ("01", "Desain 100% Responsif & Ergonomis", "Layout beradaptasi sempurna di berbagai ukuran layar smartphone (iPhone & Android) tanpa patahan teks atau horizontal scroll."),
        ("02", "Dual Language Switcher (ID/EN)", "Akses instan perpindahan bahasa di header mempermudah wisatawan mancanegara maupun tamu lokal."),
        ("03", "Tombol Aksi Cepat & Ramah Jari", "Tombol Jelajahi Program & Reservasi Kunjungan berukuran besar dan mudah ditekan menggunakan satu tangan."),
        ("04", "Performa Cepat & Hemat Data", "Dioptimasi menggunakan Vite modern sehingga loading instan bahkan di area jaringan mobile pedesaan.")
    ]
    
    card_w = 460
    card_h = 185
    
    for i, (num, c_title, c_text) in enumerate(cards):
        row = i // 2
        col = i % 2
        cx = panel_x + 40 + (col * (card_w + 30))
        cy = panel_y + 245 + (row * (card_h + 25))
        
        # Card background
        draw.rounded_rectangle([cx, cy, cx + card_w, cy + card_h], radius=12, fill=(28, 33, 44, 255), outline=(50, 58, 75, 200), width=1)
        
        # Gold badge number
        draw.rounded_rectangle([cx + 18, cy + 18, cx + 52, cy + 44], radius=6, fill=(201, 155, 83, 40), outline=(201, 155, 83, 200), width=1)
        draw.text((cx + 26, cy + 22), num, font=get_font(FONT_SANS_BOLD, 14), fill=(225, 185, 120, 255))
        
        draw.text((cx + 64, cy + 22), c_title, font=get_font(FONT_SANS_BOLD, 15), fill=(240, 243, 248, 255))
        
        wrapped_card_text = textwrap.fill(c_text, width=44)
        draw.text((cx + 20, cy + 62), wrapped_card_text, font=get_font(FONT_SANS, 13), fill=(160, 168, 182, 255), spacing=4)

    draw.text((80, 1030), "SANGGAR PAIKETAN SWARA  •  DESA BANTAS, SELEMADEG TIMUR, TABANAN - BALI", font=get_font(FONT_SANS, 11), fill=(100, 108, 122, 255))
    draw.text((1600, 1030), "COMPATIBILITY: IOS & ANDROID", font=get_font(FONT_SANS_BOLD, 11), fill=(46, 204, 113, 255))

    out_path = os.path.join(OUTPUT_DIR, filename)
    canvas.save(out_path, "PNG", quality=95)
    art_path = os.path.join(ARTIFACT_DIR, filename)
    canvas.save(art_path, "PNG", quality=95)
    print(f"Generated: {filename}")

def build_master_showcase(filename):
    canvas = create_base_canvas(1920, 1080)
    draw_header(canvas, 5, "MASTER SHOWCASE", "Multi-Device Presentation")
    
    browser_frame = create_browser_mockup(SHOTS["hero"], target_w=1120, target_h=660)
    canvas.paste(browser_frame, (80, 210), browser_frame)
    
    phone_frame = create_phone_mockup(SHOTS["mobile"], target_h=700)
    canvas.paste(phone_frame, (1080, 240), phone_frame)
    
    draw = ImageDraw.Draw(canvas)
    
    info_x = 1380
    info_y = 190
    info_w = 460
    info_h = 360
    
    draw.rounded_rectangle([info_x, info_y, info_x + info_w, info_y + info_h], radius=16, fill=(20, 24, 32, 235), outline=(50, 58, 74, 255), width=1)
    draw.line([(info_x + 30, info_y + 1), (info_x + 120, info_y + 1)], fill=(201, 155, 83, 255), width=3)
    
    draw.text((info_x + 30, info_y + 26), "— ALL-IN-ONE SOLUTION —", font=get_font(FONT_SANS_BOLD, 11), fill=(201, 155, 83, 255))
    draw.text((info_x + 30, info_y + 54), "Website Resmi Sanggar\nPaiketan Swara", font=get_font(FONT_SERIF_BOLD, 22), fill=(255, 255, 255, 255), spacing=6)
    
    desc = "Solusi platform digital terintegrasi untuk pelestarian seni gamelan & tari Bali di Desa Bantas. Tampil anggun di layar desktop, laptop, tablet, maupun smartphone."
    wrapped = textwrap.fill(desc, width=38)
    draw.text((info_x + 30, info_y + 130), wrapped, font=get_font(FONT_SANS, 13), fill=(185, 192, 205, 255), spacing=5)
    
    draw.line([(info_x + 30, info_y + 225), (info_x + info_w - 30, info_y + 225)], fill=(40, 48, 62, 255), width=1)
    
    # Bullet points with vector checkmark
    draw.ellipse([info_x + 30, info_y + 242, info_x + 46, info_y + 258], fill=(201, 155, 83, 40), outline=(201, 155, 83, 200), width=1)
    draw_vector_check(draw, info_x + 38, info_y + 250, color=(201, 155, 83, 255))
    draw.text((info_x + 56, info_y + 242), "Siap Dipresentasikan ke Klien", font=get_font(FONT_SANS_BOLD, 13), fill=(225, 185, 120, 255))
    
    draw.ellipse([info_x + 30, info_y + 276, info_x + 46, info_y + 292], fill=(46, 204, 113, 30), outline=(46, 204, 113, 200), width=1)
    draw_vector_check(draw, info_x + 38, info_y + 284, color=(46, 204, 113, 255))
    draw.text((info_x + 56, info_y + 276), "100% Tangkapan Layar Asli Sistem Aktif", font=get_font(FONT_SANS, 12), fill=(200, 210, 225, 255))

    draw.ellipse([info_x + 30, info_y + 310, info_x + 46, info_y + 326], fill=(201, 155, 83, 40), outline=(201, 155, 83, 200), width=1)
    draw_vector_check(draw, info_x + 38, info_y + 318, color=(201, 155, 83, 255))
    draw.text((info_x + 56, info_y + 310), "Desain Autentik Budaya Desa Bantas", font=get_font(FONT_SANS, 12), fill=(200, 210, 225, 255))
    
    draw.text((80, 1030), "SANGGAR PAIKETAN SWARA  •  DESA BANTAS, SELEMADEG TIMUR, TABANAN - BALI", font=get_font(FONT_SANS, 11), fill=(100, 108, 122, 255))
    draw.text((1600, 1030), "STATUS: READY FOR CLIENT", font=get_font(FONT_SANS_BOLD, 11), fill=(46, 204, 113, 255))

    out_path = os.path.join(OUTPUT_DIR, filename)
    canvas.save(out_path, "PNG", quality=95)
    art_path = os.path.join(ARTIFACT_DIR, filename)
    canvas.save(art_path, "PNG", quality=95)
    print(f"Generated: {filename}")

if __name__ == "__main__":
    build_desktop_slide(
        slide_num=1,
        tag="BERANDA & HERO SECTION",
        title="Hero Section & Identitas Utama",
        desc="Halaman pembuka langsung memikat pengunjung dengan perpaduan tipografi budaya Bali, logo resmi Sanggar Paiketan Swara, dan potret kegiatan seni gamelan.",
        bullets=[
            ("Branding Resmi & Elegan", "Logo resmi sanggar terpasang proporsional dengan nuansa warna emas gelap khas seni tradisi."),
            ("Call-to-Action (CTA) Jelas", "Tombol 'Jelajahi Program' & 'Reservasi Kunjungan' mempermudah konversi tamu dan pelajar."),
            ("Navigasi Lengkap & Intuitif", "Menu navbar terstruktur dengan indikator aktif dan pilihan bahasa ID/EN.")
        ],
        screenshot_key="hero",
        filename="slide_1_hero_beranda.png"
    )

    build_desktop_slide(
        slide_num=2,
        tag="PROFIL & SAMBUTAN PENDIRI",
        title="Profil Pendiri & Filosofi Sanggar",
        desc="Bagian pengantar yang menampilkan foto resmi berbingkai emas Bapak I Ketut Suweta, S.Sn. beserta visi mulia pelestarian tradisi di tengah gempuran era digital.",
        bullets=[
            ("Bingkai Foto Eksklusif", "Foto Pendiri & Pembina sanggar diletakkan secara terhormat dengan badge sambutan resmi."),
            ("Misi Sosial & Karakter", "Menyajikan narasi inspiratif pengalihan anak-anak dari gadget menuju wadah kesenian positif."),
            ("Desain Bersih & Berwibawa", "Kombinasi warna krem hangat dan cokelat kayu mencerminkan kehangatan masyarakat Desa Bantas.")
        ],
        screenshot_key="founder",
        filename="slide_2_profil_pendiri.png"
    )

    build_desktop_slide(
        slide_num=3,
        tag="PROGRAM & EDU-WISATA",
        title="Paket Edu-Wisata Seni Budaya",
        desc="Menyajikan paket kunjungan edukasi seni gamelan dan tari Bali untuk kelompok sekolah, keluarga, maupun wisatawan nusantara dan mancanegara.",
        bullets=[
            ("Informasi Kuota & Durasi", "Badge ringkas durasi 60-90 menit dan kelompok 10-30 peserta memudahkan perencanaan kunjungan."),
            ("Rincian Rangkaian Kegiatan", "Checklist teratur mencakup sambutan, demonstrasi, latihan interaktif, hingga dokumentasi."),
            ("Foto Dokumentasi Asli", "Menampilkan penari dan penabuh sanggar berbusana adat Bali yang autentik.")
        ],
        screenshot_key="programs",
        filename="slide_3_paket_eduwisata.png"
    )

    build_mobile_slide(
        slide_num=4,
        tag="TAMPILAN MOBILE RESPONSIVE",
        title="Responsif Sempurna di Smartphone",
        desc="Lebih dari 70% wisatawan mengakses informasi melalui smartphone. Website Sanggar Paiketan Swara telah dirancang secara mobile-first untuk pengalaman akses yang cepat, nyaman, dan mulus.",
        screenshot_key="mobile",
        filename="slide_4_tampilan_mobile.png"
    )

    build_master_showcase("slide_5_master_showcase.png")
    print("All slides regenerated with polished vector icons!")
