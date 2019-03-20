import requests, re, json
from bs4 import BeautifulSoup

def classFormToJson(payload):
    url = "http://www.iecs.fcu.edu.tw/wSite/sp?xdUrl=/wSite/teacher/weekday.jsp"
    fileName = "class\\" + payload["xItem"] + ".json"

    res = requests.post(url, data=payload)
    bs = BeautifulSoup(res.text, "lxml")

    tbody = bs.find("div", {"class": "lp"}).find("tbody")
    trs = tbody.find_all("tr")
    data = []
    for index, tr in enumerate(trs):
        d = {}
        d["class"] = index + 1
        d["week"] = []
        for td in tr.find_all("td"):
            d["week"].append(list(td.stripped_strings))
        data.append(d)
    with open(fileName, "w", encoding="utf8") as f:
        json.dump(data, f, ensure_ascii=False)

t = requests.get("http://www.iecs.fcu.edu.tw/wSite/lp?ctNode=34621&mp=370201&idPath=34052_34618")
bs = BeautifulSoup(t.text, "lxml")

div = bs.find("div", {"class": "lp"})
forms = div.find_all("form", {"action": "sp?xdUrl=/wSite/teacher/weekday.jsp"})
for form in forms:
    inputs = form.find_all("input", {"name": True, "value": True})
    payload = {}
    for input_ in inputs:
        payload[input_["name"]] = input_["value"]
    print(payload)
    classFormToJson(payload)