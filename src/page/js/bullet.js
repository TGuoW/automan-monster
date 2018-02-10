let Bullet = function (end) {
  let cas = document.getElementById('canvas')
  this.ctx = cas.getContext('2d')
  this.img = new Image()
  this.img.src = '../../../static/imgs/Bullet.png'
  this.start = [0, 180]
  this.x = this.start[0]
  this.y = this.start[1]
  this.xSpeed = 40
  this.ySpeed = (end[1] - this.y) / end[0] * 40
  this.end = end
}

Bullet.prototype = {
  render: function () {
    this.ctx.drawImage(this.img, this.start[0], this.start[1])
    return this
  },
  nextStep: function () {
    this.x += this.xSpeed
    this.y += this.ySpeed
    if (this.x > this.end[0]) {
      this.x = this.end[0] + 0.01
    }
    if (this.x <= this.end[0]) {
      this.ctx.drawImage(this.img, this.x, this.y)
    }
  }
  // trans: function () {
  //   let browsers = ['transform', 'msTransform', 'mozTransform', 'webkitTransform', 'oTransform']
  //   browsers.forEach(function (browser) {
  //     this.img.style[browser] = 'translate(' + (this.end[0] - this.start[0]) + 'px,' + (this.end[1] - this.start[1]) + 'px)'
  //   }.bind(this))
  // }
}

export default Bullet
