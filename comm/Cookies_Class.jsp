

/*====================================================*/
/*  Description : Cookies Class생성(형식 JSON)             */
/*  Writer         : 캐츠                                                   */
/*  Date          : 2009-10-29                                           */
/*  Example     : var test = new Cookies                         */
/*                     test.setCookie("userName","캐츠",1)      */
/*====================================================*/
Cookies = function(){}
Cookies.prototype =
{  
  getCookieVal: function(offset)
  {
    var endstr = document.cookie.indexOf(";", offset);
    if (endstr == -1) endstr = document.cookie.length;
    return unescape(document.cookie.substring(offset, endstr));
  },

  //쿠키값 읽기
  getCookie : function(cookieName)
  {
    var arg = cookieName + "=";
    var alen = arg.length;
    var clen = document.cookie.length;
    var i = 0;
    
    while (i < clen)
    {
      var j = i + alen;
      if (document.cookie.substring(i, j) == arg) return getCookieVal (j);
      i = document.cookie.indexOf(" ", i) + 1; if (i == 0) break;
    }
    return null;  
  },

  //쿠키쓰기(만료일 지정)  만료일(expiredays) : 1 = 1일 , 365 = 365일
  setCookie: function(cookieName, value, expiredays)
  {
    var todayDate = new Date();
    todayDate.setDate( todayDate.getDate() + expiredays );
    document.cookie = cookieName + "=" + escape( value ) + "; path=/; expires=" + todayDate.toGMTString() + ";"; 
  },

  //쿠키쓰기(만료일 없음 : 창닫을시 자동으로 쿠키삭제됨)
  setCookieNoExp: function(cookieName, value)
  {
    var todayDate = new Date();
    todayDate.setDate(todayDate.getDate());
    document.cookie = cookieName + "=" + escape( value ) + "; path=/;";
  },
  
  //쿠키삭제
  removeCookie: function(cookieName)
  {
    var expireDate = new Date();

    //어제 날짜를 쿠키 소멸 날짜로 설정한다.
    expireDate.setDate( expireDate.getDate() - 1 );
    document.cookie = cookieName + "= " + "; expires=" + expireDate.toGMTString() + "; path=/";
  }
}



