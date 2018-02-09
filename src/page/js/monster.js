let Monster = function () {
  let cas = document.getElementById('canvas')
  this.ctx = cas.getContext('2d')
  // this.pic = document.createElement('div')
  this.x = 700
  this.y = Math.floor(Math.random() * 230)
  this.type = Math.ceil(Math.random() * 4)
  this.img = new Image()
  this.img.src = '../../../static/imgs/M' + this.type + '.png'
  this.status = 'walk'
  this.state = 0
  this.statePosition = [[194, 328], [0, 152], [194, 328], [195, 152]]
}

Monster.prototype = {
  render: function () {
    this.ctx.drawImage(this.img, this.statePosition[0][0], this.statePosition[0][1], 194, 176, this.x, this.y, 194, 176)
    return this
  },
  nextStep: function () {
    if (this.x % 10 === 0) {
      if (this.state > 2) {
        this.state = 0
      } else {
        this.state++
      }
    }
    this.x -= 4
    // this.ctx.clearRect(0, 0, 820, 370)
    // startPoint+=speed;
    // cxt.beginPath();
    // cxt.arc(startPoint,300,30,0,2*Math.PI,true);
    // cxt.closePath();
    // cxt.fill();
    this.ctx.drawImage(this.img, this.statePosition[this.state][0], this.statePosition[this.state][1], 194, 176, this.x, this.y, 194, 176)
    // window.requestAnimationFrame(this.nextStep.bind(this))
  }
}

export default Monster
