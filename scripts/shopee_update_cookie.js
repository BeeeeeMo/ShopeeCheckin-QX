var accountInfoURL = {
  url: 'https://shopee.tw/api/v2/user/account_info?from_wallet=false&skip_address=1&need_cart=1',
  headers: {
    Cookie:
      $prefs.valueForKey('CookieSP') + ';SPC_EC=' + $prefs.valueForKey('SPC_EC') +';',
    'X-CSRFToken': $prefs.valueForKey('CSRFTokenSP'),
  },
};

var refreshURL = {
  url: 'https://mall.shopee.tw/api/v4/client/refresh',
  headers: {
    Cookie:
      'shopee_token=' + $prefs.valueForKey('ShopeeToken') + ';'
  },
};

function updateSPC_EC() {
  $httpClient.get(refreshURL, function (error, response, data) {
    if (error) {
      $notify('蝦皮簽到', '', '連線錯誤‼️');
      $done();
    } else {
      if (response.status == 200) {
        let cookie = $persistentStore.write(response.headers['Set-Cookie'].split('SPC_EC=')[1].split(';')[0], 'SPC_EC');
        if (cookie) {
          // $notify('蝦皮 Cookie 保存成功🎉', '', '');
          updateCookie();
        } else {
          $notify('蝦皮 Cookie 保存失敗‼️', '', '請重新登入');
        }
        $done();
      } else {
        $notify('蝦皮 Cookie 保存失敗‼️', '', '請重新登入');
      }
    }
  });
}

function updateCookie() {
  $httpClient.get(accountInfoURL, function (error, response, data) {
    if (error) {
      $notify('蝦皮簽到', '', '連線錯誤‼️');
      $done();
    } else {
      if (response.status == 200) {
        let cookie = $persistentStore.write(
          response.headers['Set-Cookie'],
          'CookieSP'
        );
        if (cookie) {
          $notify('蝦皮 Cookie 保存成功🎉', '', '');
        } else {
          $notify('蝦皮 Cookie 保存失敗‼️', '', '請重新登入');
        }
        $done();
      } else {
        $notify('蝦皮 Cookie 保存失敗‼️', '', '請重新登入');
      }
    }
  });
}

updateSPC_EC();
