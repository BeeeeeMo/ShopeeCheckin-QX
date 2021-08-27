function updateSPC_EC() {
  const headers = {
    Cookie: 'shopee_token=' + $prefs.valueForKey('ShopeeToken') + ';'
  };

  const refreshURL = {
      url: "https://mall.shopee.tw/api/v4/client/refresh",
      method: "GET",
      headers: headers,
  };

  $task.fetch(refreshURL).then(response => {
    // response.statusCode, response.headers, response.body
    if (response.statusCode == 200) {
          let cookie = $prefs.setValueForKey(response.headers['Set-Cookie'].split('SPC_EC=')[1].split(';')[0], 'SPC_EC');
          if (cookie) {
            // $notify('蝦皮 Cookie 保存成功🎉', '', '');
            updateCookie();
          } else {
            $notify('蝦皮 Cookie 保存失敗‼️', '', '請重新登入');
          }
          $done();
        } else {
          $notify('蝦皮簽到', '', '連線錯誤‼️');
          $done();
        }
    }, reason => {
        // reason.error
        $notify('蝦皮簽到', '', '連線錯誤‼️');
        $done();
    });
  // $httpClient.get(refreshURL, function (error, response, data) {
  //   if (error) {
  //     $notify('蝦皮簽到', '', '連線錯誤‼️');
  //     $done();
  //   } else {
  //     if (response.status == 200) {
  //       let cookie = $persistentStore.write(response.headers['Set-Cookie'].split('SPC_EC=')[1].split(';')[0], 'SPC_EC');
  //       if (cookie) {
  //         // $notify('蝦皮 Cookie 保存成功🎉', '', '');
  //         updateCookie();
  //       } else {
  //         $notify('蝦皮 Cookie 保存失敗‼️', '', '請重新登入');
  //       }
  //       $done();
  //     } else {
  //       $notify('蝦皮 Cookie 保存失敗‼️', '', '請重新登入');
  //     }
  //   }
  // });
}

function updateCookie() {

  const headers = {
    Cookie:
    $prefs.valueForKey('CookieSP') + ';SPC_EC=' + $prefs.valueForKey('SPC_EC') +';',
  'X-CSRFToken': $prefs.valueForKey('CSRFTokenSP'),
  };

  const accountInfoURL = {
      url: 'https://shopee.tw/api/v2/user/account_info?from_wallet=false&skip_address=1&need_cart=1',
      method: "GET",
      headers: headers,
  };

  $task.fetch(accountInfoURL).then(response => {
    // response.statusCode, response.headers, response.body
    if (response.statusCode == 200) {
      let cookie = $prefs.setValueForKey(
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
      $notify('蝦皮簽到', '', '連線錯誤‼️');
      $done();
    }
  }, reason => {
    // reason.error
    $notify('蝦皮簽到', '', '連線錯誤‼️');
    $done();
  });
  

  // $httpClient.get(accountInfoURL, function (error, response, data) {
  //   if (error) {
  //     $notify('蝦皮簽到', '', '連線錯誤‼️');
  //     $done();
  //   } else {
  //     if (response.status == 200) {
  //       let cookie = $persistentStore.write(
  //         response.headers['Set-Cookie'],
  //         'CookieSP'
  //       );
  //       if (cookie) {
  //         $notify('蝦皮 Cookie 保存成功🎉', '', '');
  //       } else {
  //         $notify('蝦皮 Cookie 保存失敗‼️', '', '請重新登入');
  //       }
  //       $done();
  //     } else {
  //       $notify('蝦皮 Cookie 保存失敗‼️', '', '請重新登入');
  //     }
  //   }
  // });
}

updateSPC_EC();
