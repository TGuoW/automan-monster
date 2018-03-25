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

    let highArr = this.getCookie('hs').split(' ')
    highArr.sort(function (a, b) {
      return Number(b) - Number(a)
    })
    let i = 0
    while (i < highArr.length) {
      if (value >= Number(highArr[i])) {
        break
      }
      i++
    }
    highArr.splice(i, 0, escape(value))
    if (highArr.length > 4) {
      highArr.pop()
    }

    let exp = new Date()
    exp.setTime(exp.getTime() + time)
    document.cookie = name + '=' + highArr.join(' ') + ';expires=' + exp.toGMTString()
    console.log(document.cookie)
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
