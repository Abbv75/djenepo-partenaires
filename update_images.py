import json
import urllib.request
import urllib.parse
import re

def get_image(query):
    query_encoded = urllib.parse.quote(query)
    url = f"https://unsplash.com/napi/search/photos?query={query_encoded}&per_page=3"
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        with urllib.request.urlopen(req) as response:
            data = json.loads(response.read().decode())
            if data['results']:
                return data['results'][0]['urls']['raw']
    except Exception as e:
        print(f"Failed for {query}: {e}")
    return None

updates = {
    # ProCaR
    "3": get_image("corn field agriculture"),
    "6": get_image("african women farmer"),
    "10": get_image("greenhouse agriculture"),
    "14": get_image("rural dirt road africa"),
    "18": get_image("young black farmer"),
    "22": get_image("harvest crop africa"),
    "26": get_image("rice grain processing"),
    "30": get_image("agriculture irrigation"),
    
    # RESI-2P
    "4": get_image("dry landscape africa"),
    "7": get_image("tablet technology farmer"),
    "11": get_image("african village meeting"),
    "15": get_image("water pump africa"),
    "19": get_image("african refugee community"),
    "23": get_image("african market vegetables"),
    "27": get_image("microphone radio broadcasting")
}

with open("src/constant/blog.ts", "r", encoding="utf-8") as f:
    content = f.read()

for id_val, img_url in updates.items():
    if not img_url: continue
    
    img_url += "&ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    pattern = r"(id:\s*'" + id_val + r"',.*?image:\s*')[^']+(')"
    content = re.sub(pattern, r"\g<1>" + img_url + r"\g<2>", content, flags=re.DOTALL)

with open("src/constant/blog.ts", "w", encoding="utf-8") as f:
    f.write(content)

print("Images updated successfully.")
