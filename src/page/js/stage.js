import Automan from './automan'
import Monster from './monster'

let Stage = function () {
  this.automan = new Automan()
  this.monsterArr = []

  let stage = document.getElementsByClassName('stage')[0]
  let page = document.createElement('div')
  let aotuman = document.createElement('div')
  let grass1 = document.createElement('div')
  let grass2 = document.createElement('div')
  let loading = document.createElement('div')
  let number1 = document.createElement('div')
  let number2 = document.createElement('div')
  let percent = document.createElement('div')
  page.className = 'page-0 page'
  aotuman.className = 'aotuman'
  grass1.className = 'grass1'
  grass2.className = 'grass2'
  loading.className = 'loading'
  number1.className = 'number1'
  number2.className = 'number2'
  percent.className = 'percent'
  page.appendChild(aotuman)
  page.appendChild(grass1)
  page.appendChild(grass2)
  loading.appendChild(number1)
  loading.appendChild(number2)
  loading.appendChild(percent)
  page.appendChild(loading)
  stage.appendChild(page)
}

Stage.prototype = {
  constructor: Stage,
  loading: function (already = 1, all = 1) {
    let number1DOM = document.getElementsByClassName('number1')[0]
    let number2DOM = document.getElementsByClassName('number2')[0]
    let num = Math.floor(already * 100 / all)
    let num1 = Math.floor(num / 10)
    let num2 = num % 10
    if (already / all === 1) {
      this.start()
      console.log('finished')
    } else {
      number1DOM.style.backgroundPosition = -33 * num1 + 'px 0'
      number2DOM.style.backgroundPosition = -33 * num2 + 'px 0'
    }
  },
  start: function () {
    this.monsterArr = []
    let stage = document.getElementsByClassName('stage')[0]
    if (stage.getElementsByTagName('div')[0]) {
      stage.removeChild(stage.getElementsByTagName('div')[0])
    }
    let page = document.createElement('div')
    let startIcon = document.createElement('div')
    let startBtn = document.createElement('div')
    page.className = 'page-1 page'
    startIcon.className = 'start-icon moveFromTop'
    startBtn.className = 'start-btn moveFromBottom'
    // 给开始游戏按钮绑定跳转到渲染游戏页面的方法
    startBtn.addEventListener('touchend', function () {
      this.play()
    }.bind(this))
    page.appendChild(startIcon)
    // 在icon动画结束之后startbtn进入
    setTimeout(page.appendChild.bind(page, startBtn), 700)
    stage.appendChild(page)
  },
  play: function () {
    let stage = document.getElementsByClassName('stage')[0]
    if (stage.getElementsByTagName('div')[0]) {
      stage.removeChild(stage.getElementsByTagName('div')[0])
    }

    let canvas = document.createElement('canvas')
    canvas.id = 'canvas'
    canvas.height = '370'
    canvas.width = '820'
    document.body.appendChild(canvas)

    let page = document.createElement('div')
    let grass = document.createElement('div')
    let gap = document.createElement('div')
    let topbar = document.createElement('div')
    let powerSlot = document.createElement('div')
    let powerFill = document.createElement('div')
    let monsIcon = document.createElement('div')
    let score = document.createElement('div')
    let lvl = document.createElement('div')
    let control = document.createElement('div')
    let control1 = document.createElement('div')
    let control2 = document.createElement('div')
    let control3 = document.createElement('div')
    let control4 = document.createElement('div')
    // let automan = new Automan()
    page.className = 'page-2 page'
    grass.className = 'grass'
    gap.className = 'gap'
    topbar.className = 'topbar'
    powerSlot.className = 'power-slot'
    powerFill.className = 'power-fill'
    monsIcon.className = 'mons-icon'
    score.className = 'score'
    lvl.className = 'lvl'
    control.className = 'control'
    control1.className = 'key control-1'
    control2.className = 'key control-2'
    control3.className = 'key control-3'
    control4.className = 'key control-4'
    let self = this
    control1.addEventListener('touchend', function () {
      self.automan.hit(self.killMonster.bind(self, 1))
    })
    control2.addEventListener('touchend', function () {
      self.automan.hit(self.killMonster.bind(self, 2))
    })
    control3.addEventListener('touchend', function () {
      self.automan.hit(self.killMonster.bind(self, 3))
    })
    control4.addEventListener('touchend', function () {
      // self.automan.hit(self.killMonster.bind(self, 4))
      self.automan.hit().then(data => {
        self.changePower(data)
        console.log(data)
      })
      // self.appendMonster()
    })
    page.appendChild(this.automan.render())
    page.appendChild(grass)
    page.appendChild(gap)
    topbar.appendChild(powerSlot)
    topbar.appendChild(powerFill)
    topbar.appendChild(monsIcon)
    topbar.appendChild(score)
    topbar.appendChild(lvl)
    page.appendChild(topbar)
    control.appendChild(control1)
    control.appendChild(control2)
    control.appendChild(control3)
    control.appendChild(control4)
    page.appendChild(control)
    stage.appendChild(page)
    this.monsterWalk()
  },
  monsterWalk: function () {
    let self = this
    let timer = window.requestAnimationFrame(function fn () {
      timer = window.requestAnimationFrame(fn)
      let cas = document.getElementById('canvas')
      let ctx = cas.getContext('2d')
      ctx.clearRect(0, 0, 820, 370)
      for (let o in self.monsterArr) {
        self.monsterArr[o].nextStep()
        if (self.monsterArr[o].x < 0) {
          self.end()
          window.cancelAnimationFrame(timer)
        }
      }
    })
  },
  appendMonster: function () {
    let monster = new Monster()
    this.monsterArr.push(monster.render())
    // monster.render()
    monster.nextStep()
    // window.requestAnimationFrame(monster.nextStep)
  },
  changePower: function (power) {
    let powerFillDOM = document.getElementsByClassName('power-fill')[0]
    // 针对不同浏览器添加前缀
    let browsers = ['transform', 'msTransform', 'mozTransform', 'webkitTransform', 'oTransform']
    browsers.forEach(x => {
      powerFillDOM.style[x] = 'scaleX(' + power / 100 + ')'
    })
    if (power === 100) {
      this.powerFull()
    }
  },
  powerFull: function () {
    // const SUPER_TIME = 5000
    let powerFillDOM = document.getElementsByClassName('power-fill')[0]
    let powerSlotDOM = document.getElementsByClassName('power-slot')[0]
    let page = document.getElementsByClassName('page-2')[0]
    let powerFillClassName = powerFillDOM.className
    let superStrikeDOM = document.createElement('div')
    let strikeBoardDOM = document.createElement('div')
    let superLightDOM = document.createElement('div')
    superStrikeDOM.className = 'super-strike'
    strikeBoardDOM.className = 'strike-board'
    superLightDOM.className = 'super-light'
    // strikeBoardDOM.addEventListener('touchend', function () {
    //   this.aotu.hit(this.killFirstMonster.bind(this))
    // }.bind(this))
    superStrikeDOM.addEventListener('touchend', function () {
      // 去掉闪烁
      clearInterval(this.powerInter)
      powerSlotDOM.className = 'power-slot'
      powerFillDOM.className = 'power-fill'
      superStrikeDOM.className = 'super-strike'
      // 奥特曼进入超级状态
      this.automan.superMode()
      page.appendChild(strikeBoardDOM)
      page.appendChild(superLightDOM)
      page.removeChild(superStrikeDOM)
      // 在super time结束后将各个DOM恢复
      let self = this

      function killAll () {
        if (self.killFirstMonster()) {
          self.aotu.superStrike()
          setTimeout(killAll, 100)
        } else {
          powerFillDOM.className = 'power-fill'
          page.removeChild(strikeBoardDOM)
          page.removeChild(superLightDOM)
          self.aotu.rmSuperMode(self.renderPower)
          self.setMonsterWalkInterval()
        }
      }
      clearInterval(this.monsterInterval)
      this.renderPower(0)
      // 为能量条添加动效类名
      powerFillDOM.className = powerFillClassName + ' decreace'
      setTimeout(function () {
        killAll()
      }.bind(this), 1500)
    }.bind(this))
    page.appendChild(superStrikeDOM)
    this.powerInter = setInterval(function () {
      if (powerFillDOM.className === 'power-fill') {
        powerFillDOM.className = 'full power-fill'
      } else {
        powerFillDOM.className = 'power-fill'
      }
      if (powerSlotDOM.className === 'power-slot') {
        powerSlotDOM.className = 'full power-slot'
      } else {
        powerSlotDOM.className = 'power-slot'
      }
      if (superStrikeDOM.className === 'super-strike') {
        superStrikeDOM.className = 'full super-strike'
      } else {
        superStrikeDOM.className = 'super-strike'
      }
    }, 100)
  },
  end: function () {
    let stage = document.getElementsByClassName('stage')[0]
    if (stage.getElementsByTagName('div')[0]) {
      stage.removeChild(stage.getElementsByTagName('div')[0])
      document.getElementById('canvas').remove()
    }
    let page = document.createElement('div')
    let grass = document.createElement('div')
    let aotuman = document.createElement('div')
    let scoreBoard = document.createElement('div')
    let score = document.createElement('div')
    let highestScoreDOM = document.createElement('div')
    let restart = document.createElement('div')
    let share = document.createElement('div')
    page.className = 'page-3 page'
    grass.className = 'grass moveFromBottom'
    aotuman.className = 'aotuman'
    scoreBoard.className = 'score-board'
    score.className = 'score'
    highestScoreDOM.className = 'highest-score'
    restart.className = 'restart moveFromBottom'
    share.className = 'share moveFromBottom'
    restart.addEventListener('touchend', function () {
      this.start()
    }.bind(this))
    share.addEventListener('touchend', function () {
      this.sharePage()
    }.bind(this))
    page.appendChild(aotuman)
    scoreBoard.appendChild(score)
    scoreBoard.appendChild(highestScoreDOM)
    page.appendChild(scoreBoard)
    page.appendChild(grass)
    setTimeout(function () {
      page.appendChild(restart)
      page.appendChild(share)
    }, 600)
    stage.appendChild(page)
    // this.renderScore(this.score)
    // let highestScore = Cookie.prototype.getCookie('hs')
    // if (highestScore == null || highestScore < this.score) {
    //     Cookie.prototype.setCookie('hs', this.score, '100', 'y');
    //     highestScore = this.score;
    // }
    // this.renderHighestScore(highestScore);
  }
}

export default Stage
