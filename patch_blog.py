import re

with open("src/constant/blog.ts", "r", encoding="utf-8") as f:
    content = f.read()

imports = """import logo from '../assets/logo-djenepo.jpg';
import procar_corn from '../assets/blog/procar_corn.png';
import procar_greenhouse from '../assets/blog/procar_greenhouse.png';
import procar_market from '../assets/blog/procar_market.png';
import procar_young_farmer from '../assets/blog/procar_young_farmer.png';
import resi_resilience from '../assets/blog/resi_resilience.png';
import resi_tablet from '../assets/blog/resi_tablet.png';
import resi_water from '../assets/blog/resi_water.png';
import resi_radio from '../assets/blog/resi_radio.png';"""

content = re.sub(r"import logo from '\.\./assets/logo-djenepo\.jpg';", imports, content)

mapping = {
    "3": "procar_corn",
    "22": "procar_corn",
    "10": "procar_greenhouse",
    "30": "procar_greenhouse",
    "14": "procar_market",
    "26": "procar_market",
    "6": "procar_young_farmer",
    "18": "procar_young_farmer",
    "4": "resi_resilience",
    "11": "resi_resilience",
    "7": "resi_tablet",
    "15": "resi_water",
    "23": "resi_water",
    "19": "resi_radio",
    "27": "resi_radio",
}

for id_val, img_var in mapping.items():
    pattern = r"(id:\s*'" + id_val + r"',.*?image:\s*)'[^']+'"
    content = re.sub(pattern, r"\g<1>" + img_var, content, flags=re.DOTALL)

with open("src/constant/blog.ts", "w", encoding="utf-8") as f:
    f.write(content)
print("Blog updated with new images.")
