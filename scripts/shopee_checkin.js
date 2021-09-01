const shopeeUrl = {
    url: 'https://shopee.tw/mkt/coins/api/v2/checkin',
    method: "POST", // Optional, default GET.
    headers:{
        'Cookie': $prefs.valueForKey("CookieSP") + ';SPC_EC=' + $prefs.valueForKey("SPC_EC") + ';',
        'X-CSRFToken': $prefs.valueForKey("CSRFTokenSP"),
    }// Optional.
};

$task.fetch(shopeeUrl).then(response => {
    // response.statusCode, response.headers, response.body
    if (response.statusCode == 200) {
        let obj = JSON.parse(response.body);
        if (obj["data"]["success"]) {
            var user = obj["data"]["username"];
            var coins = obj["data"]["increase_coins"];
            var checkinday = obj["data"]["check_in_day"];
            $notify("蝦皮 " + user + " 已連續簽到 " + checkinday + " 天", "", "今日已領取 " + coins + "💰💰💰");
            $done();
        }
        $done();
    } else {
        $notify("蝦皮 Cookie 已過期‼️", "", "請重新登入 🔓");
        $done();
    }
}, reason => {
    // reason.error
    $notify("蝦皮簽到", "", "連線錯誤‼️")
    $done();
});
