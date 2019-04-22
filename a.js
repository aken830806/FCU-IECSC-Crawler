function s(s) {
    return s.trim().replace(/\s+/g, " ");
}

function a(e, tit) {
    var d = [];
    var spans = e.querySelectorAll(":scope table span");
    for (var i = 1; i <= spans.length - 2; i += 3) {
        var o = {}
        o[tit] = s(spans[i].textContent) + s(spans[i + 1].textContent);
        d.push(o);
    }
    return d;
}

function b(e) {
    var trs = e.querySelectorAll(":scope table tr");
    var d = [];
    var tit = [];
    trs[0].querySelectorAll(":scope td").forEach(element => {
        tit.push(s(element.textContent));
    });
    for (var i = 1; i < trs.length; i++) {
        var o = {}
        trs[i].querySelectorAll(":scope td").forEach((ee, ii) => {
            o[tit[ii]] = s(ee.textContent);
        });
        d.push(o);
    }
    return d;
}

function c(e, tit) {
    var trs = e.querySelectorAll(":scope table tr");
    var d = [];
    for (var i = 0; i < trs.length; i++) {
        var o = {};
        o[tit] = s(trs[i].querySelector(":scope td:nth-child(2) div").innerHTML);
        d.push(o);
    }
    return d;
}

function d(e) {
    var trs = e.querySelectorAll(":scope table tr");
    var d = [];
    var tit = s(trs[0].textContent);
    for (var i = 1; i < trs.length; i++) {
        var o = {};
        o[tit] = s(trs[i].querySelector(":scope td:nth-child(2) div").innerHTML);
        d.push(o);
    }
    return d;
}

var data = {};
var tables = [];
var key = ["教師姓名", "職稱", "學年度"];
var method = prompt();
data["基本資料"] = [{}];
document.querySelector("div.cp > h3").textContent.split(" ").forEach((e, i) => {
    data["基本資料"][0][key[i]] = e;
});
document.querySelectorAll("div.cp table").forEach(ee => {
    if (ee.querySelectorAll(":scope table").length == 1) {
        tables.push(ee);
    }
});
tables.forEach((e, i) => {
    var tit = e.querySelector("span").textContent;
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