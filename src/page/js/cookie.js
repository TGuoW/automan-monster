let Cookie = function () {}

Cookie.prototype = {
  setCookie: function (name, value, time = 30, scale = 'd') {
    let scales = ['ms', 's', 'min', 'd', 'mon', 'y']
    let length = [1000, 60, 60, 24, 12]

    for (let i = 0; i < scales.length; i++) {
      if (scales[i] !== scale) {
        time *= length[i]
      } else {
        break
      }
    }

    let exp = new Date()
    exp.setTime(exp.getTime() + time)
    document.cookie = name + '=' + escape(value) + ';expires=' + exp.toGMTString()
  },

  getCookie: function (name) {
    let reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
    let arr = document.cookie.match(reg)
    if (arr[2]) {
      return unescape(arr[2])
    } else {
      return null
    }
  },

  delCookie: function (name) {
    var exp = new Date()
    exp.setTime(exp.getTime() - 1)
    var cval = this.getCookie(name)
    if (cval != null) {
      document.cookie = name + '=' + cval + ';expires=' + exp.toGMTString()
    }
  }
}

export default Cookie
