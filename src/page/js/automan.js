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
    if (self.shooting && !self.super) {
      self.nextStyle(2, 1)
      .then(_ => {
        return self.nextStyle(2, 2)
      })
      .then(_ => {
        return self.nextStyle(2, 3)
      })
      .then(_ => {
        return self.nextStyle(1, 1)
      })
      .then(_ => {
        self.shooting = false
      })
    }
    if (this.power < 100) {
      this.power++
    }
  },
  superMode: function () {
    this.super = true
    this.nextStyle(4, 1, 500)
    .then(_ => {
      return this.nextStyle(4, 2, 500)
    })
    .then(function () {

    })
  },
  rmSuperMode: function () {
    this.super = false
    this.power = 0
    this.nextStyle()
  },
  nextStyle: function (type = 1, state = 1, time = 50) {
    let self = this
    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        this.pic.className = 'aotuman aotuman' + type + '-' + state
        resolve()
      }.bind(self), time)
    })
  }
}

export default Automan
