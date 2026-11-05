import re, sys
import os
D = os.path.dirname(os.path.abspath(__file__)) + '/'
OUT = os.path.dirname(D.rstrip('/')) + '/'
head = open(D+'head.html').read(); data = open(D+'data_block.js').read() + '\n' + open(D+'home_data.js').read(); tail = open(D+'tail.html').read()

i0 = head.index('<main id="top">'); i1 = head.index('</main>')
A, M, R = head[:i0], head[i0+len('<main id="top">'):i1], head[i1:]
def sec(cls_or_id):
    m = re.search(r'  <section class="%s".*?</section>\n' % cls_or_id, M, re.S); assert m, cls_or_id; return m.group(0)
hero = sec('hero'); marquee = sec('marquee'); about = sec('about" id="about'); svc = sec('svc" id="services')
ph = sec('ph" id="portfolio'); tst = sec('tst" id="testimonials'); exp = sec('exp" id="experience')
# the .tst section tag has extra attrs
work = '  <div id="work"></div>\n'

TITLE_H = "Joseph Daniel Gomez de la Mora | Portfolio"
DESC_H = "Marketing and communications leader supporting population health and health equity in Pierce County. Paid media, creative strategy, and multilingual community engagement."
TITLE_P = "Selected work | Joseph Daniel Gomez de la Mora"
DESC_P = "Campaigns, video, and print from Elevate Health, Blue Zones Project, and independent clients, each opening straight from Google Drive."

def page(kind):
    a = A
    if kind == 'portfolio':
        a = a.replace(TITLE_H, TITLE_P).replace(DESC_H, DESC_P)
        a = a.replace('href="https://josephdanny.co/"', 'href="https://josephdanny.co/portfolio"').replace('content="https://josephdanny.co/"', 'content="https://josephdanny.co/portfolio"')
        a = re.sub(r'<div class="preloader".*?</div>\n</div>\n', '', a, flags=re.S)
        a = a.replace('<body>', '<body data-page="portfolio" class="sub">')
        a = a.replace('<a class="logo" href="#top" aria-label="Joseph Gomez de la Mora, back to top">', '<a class="logo" href="/" aria-label="Joseph Gomez de la Mora, home">')
        menu = {'top': '/', 'portfolio': '#top', 'services': '/#services', 'testimonials': '/#testimonials', 'experience': '/#experience', 'contact': '#contact'}
        main = ph.replace('<h1 class="h2">Selected work</h1>', '<h1 class="h2">Selected <span class="marker">work</span></h1>') + work
    else:
        a = a.replace('<body>', '<body data-page="home">')
        a = a.replace('</head>', '<script>try{if(sessionStorage.getItem("pl"))document.documentElement.classList.add("nopl")}catch(e){}</script>\n</head>')
        menu = {'top': '#top', 'portfolio': '/portfolio', 'services': '#services', 'testimonials': '#testimonials', 'experience': '#experience', 'contact': '#contact'}
        main = hero + marquee + about + svc + tst + exp
    for k, v in menu.items():
        a, n = re.subn(r'<li><a href="[^"]*" data-sec="%s">' % k, '<li><a href="%s" data-sec="%s">' % (v, k), a); assert n == 1, k
    return a + '<main id="top">\n' + main + R + data + tail

def admin():
    t = open(D+'admin.html').read()
    m = re.search(r'let TESTIMONIALS = \[.*?\n\];\n', tail, re.S); assert m, 'TESTIMONIALS block'
    defaults = data + '\n' + m.group(0)
    assert '</script>' not in defaults
    return t.replace('/*__DEFAULTS__*/', defaults)

open(OUT + 'index.html', 'w').write(page('home'))
open(OUT + 'portfolio.html', 'w').write(page('portfolio'))
open(OUT + 'admin.html', 'w').write(admin())
print('built')
