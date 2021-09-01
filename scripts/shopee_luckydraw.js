const shopeeluckydrawUrl = {
    url: 'https://games.shopee.tw/luckydraw/api/v1/lucky/event/0244d69e637bbb73',
    method: "POST", 
    headers: {
        'Cookie': $prefs.valueForKey("CookieSP") + ';SPC_EC=' + $prefs.valueForKey("SPC_EC") + ';',
        'X-CSRFToken': $prefs.valueForKey("CSRFTokenSP"),
    }, // Optional.
    body: {
        "request_id": (Math.random() * 10 ** 20).toFixed(0).substring(0, 16),
        "app_id": "E9VFyxwmtgjnCR8uhL",
        "activity_code": "010ac47631cf4bb5",
        "source": 0
    },
};

$task.fetch(shopeeluckydrawUrl).then(response => {
    // response.statusCode, response.headers, response.body
    if (response.statusCode == 200) {
        let obj = JSON.parse(response.body);
        if (obj["msg"] == 'no chance') {
            $notify("今日已領過蝦皮寶箱，每日只能領一次‼️", "", "");
            $done();
        }
        else if (obj["msg"] == 'success') {
            var packagename = obj["data"]["package_name"];
            $notify("恭喜獲得蝦幣寶箱：" + packagename, "", "");
            $done();
        }
        else if (obj["msg"] == 'expired') {
            $notify("活動已過期，請嘗試更新模組或腳本，或等待作者更新", "", "");
            $done();
        }
        $done();
    }
    else {
        $notify("蝦皮 Cookie 已過期‼️", "", "請重新登入 🔓");
        $done();
    }
}, reason => {
    // reason.error
    $notify("蝦幣寶箱", "", "連線錯誤‼️")
    $done();
});
