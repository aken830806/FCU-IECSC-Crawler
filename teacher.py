import requests, re, json
from bs4 import BeautifulSoup

def stripString(s):
    return re.sub(r"\s+", " ", s.strip())

def teacherFormToJson(payload):
    url = "http://www.iecs.fcu.edu.tw/wSite/ct"
    fileName = "teacher\\" + payload["xItem"] + ".json"
    res = requests.get(url, params=payload)
    bs = BeautifulSoup(res.text, "lxml")

    div = bs.find("div", {"class": "teacher"})
    tables = div.find_all("table")

    data = {}

    table = tables[1]
    d = {}
    caption = table.findPrevious("h3").text
    ths = table.find_all("th")
    tds = table.find_all("td")
    data[caption] = []
    for th, td in zip(ths, tds):
        key = stripString(th.text)
        if td.find("img", {"alt": "at"}):
            value = "@".join(td.stripped_strings)
        else:
            value = td.text
        d[key] = stripString(value)
    data[caption].append(d)

    for table in tables[2:]:
        caption = table.findPrevious("h3").text
        trs = table.find_all("tr")
        data[caption] = []
        ths = trs[0].find_all("th")
        trs = trs[1:]
        if len(ths) > 1:
            ths = ths[1:]
        for tr in trs:
            d = {}
            if table["summary"] == "發表期刊論文表格" or table["summary"] == "會議論文表格":
                for index, td in enumerate(tr.find_all("td")[1:]):
                    d[stripString(ths[index].text)] = stripString(str(td))
            else:
                for index, td in enumerate(tr.find_all("td")[1:]):
                    d[stripString(ths[index].text)] = stripString(td.text)
                
            data[caption].append(d)
            
    with open(fileName, "w", encoding="utf8") as f:
        json.dump(data, f, ensure_ascii=False)
        
t = requests.get("http://www.iecs.fcu.edu.tw/wSite/lp?ctNode=34621&mp=370201&idPath=34052_34618")
bs = BeautifulSoup(t.text, "lxml")

div = bs.find("div", {"class": "lp"})
forms = div.find_all("form", {"action": "ct"})

for form in forms:
    inputs = form.find_all("input", {"name": True, "value": True})
    payload = {}
    for input_ in inputs:
        payload[input_["name"]] = input_["value"]
    print(payload)
    teacherFormToJson(payload)