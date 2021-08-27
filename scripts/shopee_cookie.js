if ($request.headers['Cookie']) {
    var headerSP = $request.headers['Cookie'];
    const SPC_EC = headerSP.split('SPC_EC=')[1].split(';')[0];
    var cookie = $persistentStore.write(headerSP, "CookieSP");
    var spc_ec = $persistentStore.write(SPC_EC, "SPC_EC");
    var cstfToken = headerSP.split('csrftoken=')[1].split(';')[0];
    var csrf = $persistentStore.write(cstfToken, "CSRFTokenSP");
    
    if (!cookie || !csrf || !spc_ec) {
        $notification.post("蝦皮 Cookie 保存錯誤‼️", "", "請重新登入")
    } else {
        $notification.post("蝦皮 Cookie 保存成功🎉", "", "")
    }
} else {
    $notification.post("蝦皮 Cookie 保存失敗‼️", "", "請重新登入")
}
$done({})