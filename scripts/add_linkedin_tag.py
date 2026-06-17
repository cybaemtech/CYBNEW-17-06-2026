#!/usr/bin/env python3
import os
import re

# LinkedIn Insight Tag to add
linkedin_tag = '''    <!-- LinkedIn Insight Tag -->
    <script type="text/javascript"> _linkedin_partner_id = "9908953"; window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || []; window._linkedin_data_partner_ids.push(_linkedin_partner_id); </script><script type="text/javascript"> (function(l) { if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])}; window.lintrk.q=[]} var s = document.getElementsByTagName("script")[0]; var b = document.createElement("script"); b.type = "text/javascript";b.async = true; b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js"; s.parentNode.insertBefore(b, s);})(window.lintrk); </script> <noscript> <img height="1" width="1" style="display:none;" alt="" src="https://px.ads.linkedin.com/collect/?pid=9908953&fmt=gif" /> </noscript>
'''

# Pattern to find where to insert the LinkedIn tag (after the new GA script)
pattern = r'(    </script>\n\n    <!-- Old Deferred Google Analytics \(commented out\) -->)'

# Directory containing HTML files
dist_dir = r'd:\CybaemANWEB-7Apr-15-50\dist'

# Find all HTML files
html_files = []
for root, dirs, files in os.walk(dist_dir):
    for file in files:
        if file.endswith('.html'):
            html_files.append(os.path.join(root, file))

# Update each HTML file
for html_file in html_files:
    try:
        with open(html_file, 'r', encoding='utf-8') as f:
            content = f.read()

        # Check if LinkedIn tag is already present
        if '_linkedin_partner_id = "9908953"' in content:
            print(f"LinkedIn tag already present in {html_file}")
            continue

        # Replace the pattern with LinkedIn tag + original text
        new_content = re.sub(pattern, f'    </script>\n\n{linkedin_tag}\n    <!-- Old Deferred Google Analytics (commented out) -->', content)

        # Write back to file
        with open(html_file, 'w', encoding='utf-8') as f:
            f.write(new_content)

        print(f"Updated {html_file}")

    except Exception as e:
        print(f"Error updating {html_file}: {e}")

print("LinkedIn Insight Tag installation complete!")