let Automan = function () {
  this.pic = document.createElement('div')
  this.nextStyle()
  this.left = 18
  this.top = 139
  this.super = false
  this.shooting = false
  this.bulletCache = []
  this.startT = 0
  this.power = 90
}

Automan.prototype = {
  render: function () {
    return this.pic
  },
  hit: function () {
    let self = this
    // if (!this.shooting && !this.super) {
    return new Promise(function (resolve, reject) {
      if (!this.super) {
        this.shootBullet()
        resolve(this.power)
      }
    }.bind(self))
    // }
  },
  shootBullet: function () {
    let self = this
    self.shooting = true
    self.nextStyle(2, 1)
    .then(_ => {
      self.nextStyle(2, 2)
    })
    .then(_ => {
      self.nextStyle(2, 3)
    })
    .then(_ => {
      self.nextStyle(1, 1)
    })
    .then(_ => {
      self.shooting = false
    })
    if (this.power < 100) {
      this.power++
    }
  },
  superMode: function () {
    this.super = true
    this.nextStyle(4, 1, 500)
    .then(this.nextStyle(4, 2, 500))
    .then(function () {

    })
  },
  nextStyle: function (type = 1, state = 1, time = 1000) {
    let self = this
    console.log(time)
    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        this.pic.className = 'aotuman aotuman' + type + '-' + state
        resolve()
      }.bind(self), time)
    })
  }
}

export default Automan
