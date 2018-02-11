let Monster = function () {
  let cas = document.getElementById('canvas')
  this.ctx = cas.getContext('2d')
  this.x = 700
  this.y = Math.floor(Math.random() * 230)
  this.type = Math.ceil(Math.random() * 4)
  this.img = new Image()
  this.img.src = '../../../static/imgs/M' + this.type + '.png'
  this.status = 'walk'
  this.state = 0
  this.area = [[194, 176], [195, 176], [194, 176], [194, 176], [194, 176], [187, 180], [188, 171], [202, 152]]
  this.statePosition = [[194, 328], [0, 152], [194, 328], [195, 152], [0, 328], [389, 0], [388, 328], [0, 0]]
}

Monster.prototype = {
  render: function () {
    this.ctx.drawImage(this.img, this.statePosition[0][0], this.statePosition[0][1], 194, 176, this.x, this.y, 194, 176)
    return this
  },
  get position () {
    return [this.x, this.y]
  },
  die: function () {
    // let self = this
    // setTimeout(function () {
    //   self.status = 'die'
    // }, 200)
    this.status = 'die'
  },
  nextStep: function () {
    if (this.status === 'walk') {
      if (this.x % 10 === 0) {
        if (this.state > 2) {
          this.state = 0
        } else {
          this.state++
        }
      }
      this.x -= 1
    } else if (this.status === 'die') {
      this.state < 4 ? this.state = 4 : this.state += 0.02
      if (this.state > 7) {
        this.status = 'died'
      }
    }
    this.ctx.drawImage(this.img, this.statePosition[Math.floor(this.state)][0], this.statePosition[Math.floor(this.state)][1], this.area[Math.floor(this.state)][0], this.area[Math.floor(this.state)][1], this.x, this.y, this.area[Math.floor(this.state)][0], this.area[Math.floor(this.state)][1])
  }
}

export default Monster
