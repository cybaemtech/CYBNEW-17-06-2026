from pathlib import Path
import re

pattern = re.compile(r'(?s)<!-- Deferred Google Analytics -->\s*<script>.*?</script>')
replacement = '''    <!-- New Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-NHQ9K2Z6NB"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag() { dataLayer.push(arguments); }
      gtag('js', new Date());
      gtag('config', 'G-NHQ9K2Z6NB', {
        'send_page_view': true,
        'enhanced_measurement': true
      });
      gtag('config', 'G-H9RF346Q2X', {
        'send_page_view': true,
        'enhanced_measurement': true
      });
    </script>

    <!-- Old Deferred Google Analytics (commented out) -->
    <!--
    <script>
      window.addEventListener('load', function() {
        var s = document.createElement('script');
        s.src = 'https://www.googletagmanager.com/gtag/js?id=G-62M35J2JF9';
        s.async = true;
        document.head.appendChild(s);
        s.onload = function() {
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-62M35J2JF9');
        };
      });
    </script>
    -->'''

dist_path = Path(r'd:\CybaemANWEB-7Apr-15-50\dist')
for path in dist_path.rglob('*.html'):
    text = path.read_text(encoding='utf-8')
    new_text = pattern.sub(replacement, text)
    if new_text != text:
        path.write_text(new_text, encoding='utf-8')
        print(f'Updated {path}')
