function s(s) {
    return s.trim().replace(/\s+/g, " ");
}

function a(e) {
    var trs = e.querySelectorAll(":scope tr");
    var d = [];
    var tit = [];
    trs[0].querySelectorAll(":scope th").forEach(element => {
        tit.push(s(element.textContent));
    });
    for (var i = 1; i < trs.length; i++) {
        var o = {};
        var tds = trs[i].querySelectorAll(":scope td");
        for (var j = 1; j < tds.length; j++) {
            o[tit[j]] = s(tds[j].textContent);
        }
        d.push(o);
    }
    return d;
}

function b(e) {
    var trs = e.querySelectorAll(":scope tr");
    var d = [];
    var tit = [];
    trs[0].querySelectorAll(":scope th").forEach(element => {
        tit.push(s(element.textContent));
    });
    for (var i = 1; i < trs.length; i++) {
        var o = {};
        var tds = trs[i].querySelectorAll(":scope td");
        for (var j = 1; j < tds.length; j++) {
            o[tit[j-1]] = s(tds[j].innerHTML);
        }
        d.push(o);
    }
    return d;
}

function c(e, tit) {
    var trs = e.querySelectorAll(":scope tr");
    var d = [];
    for (var i = 0; i < trs.length; i++) {
        var o = {};
        o[tit] = s(trs[i].textContent);
        d.push(o);
    }
    return d;
}

var data = {};
var tables = document.querySelectorAll("div.cp table");
var key = ["教師姓名", "職稱", "學年度"];
var method = prompt();
data["基本資料"] = [{}];
document.querySelector("div.cp > h3").textContent.split(" ").forEach((e, i) => {
    data["基本資料"][0][key[i]] = e;
});
tables.forEach((e, i) => {
    var tit = s(e.previousElementSibling.textContent);
    switch (method[i]) {
        case "a":
            res = a(e, tit);
            break;
        case "b":
            res = b(e);
            break;
        case "c":
            res = c(e, tit);
            break;
        case "d":
            res = d(e);
            break;
        default:
            break;
    }
    data[tit] = res;
});
copy(window.location.href.match(/xItem=(.+?)&/)[1] + ".json");