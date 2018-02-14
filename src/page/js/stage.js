import Automan from './automan'
import Monster from './monster'
import Bullet from './bullet'
import Cookie from './cookie'
import Level from './level'

let Stage = function () {
  this.automan = new Automan()
  this.level = 0
  this.levelObj = new Level()
  this.powerInter = null
  this.monsterArr = []
  this.monsterArrY = [] // 按纵坐标排序的怪兽数组
  this.bulletArr = []
  this.enterPower = false
  this.score = 0

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
    this.monsterArrY = []
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
    this.levelObj = new Level()
    this.monsterArr = []
    this.monsterArrY = []
    let stage = document.getElementsByClassName('stage')[0]
    if (stage.getElementsByTagName('div')[0]) {
      stage.removeChild(stage.getElementsByTagName('div')[0])
    }

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
      self.killOneMonster(1)
    })
    control2.addEventListener('touchend', function () {
      self.killOneMonster(2)
    })
    control3.addEventListener('touchend', function () {
      self.killOneMonster(3)
    })
    control4.addEventListener('touchend', function () {
      self.killOneMonster(4)
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

    let canvas = document.createElement('canvas')
    canvas.id = 'canvas'
    canvas.height = '370'
    canvas.width = '820'
    page.appendChild(canvas)

    stage.appendChild(page)

    // this.monsterWalk()
    self.score = 0
    self.changeGameScore(this.score)
    // 清空等级
    self.level = 0
    self.changePower(self.automan.power)
    self.renderLevel(self.level).then(_ => {
      self.levelObj.play(self.level + 1, self.appendMonster.bind(self))
      self.monsterWalk()
    })
  },
  monsterWalk: function () {
    let self = this
    let timer = window.requestAnimationFrame(function fn () {
      timer = window.requestAnimationFrame(fn)
      let cas = document.getElementById('canvas')
      let ctx = cas.getContext('2d')
      ctx.clearRect(0, 0, 820, 370)
      self.renderMonster(timer)
      if (self.bulletArr.length > 100) {
        self.bulletArr.splice(0, 100)
      }
      for (let o in self.bulletArr) { // 发射子弹
        self.bulletArr[o].nextStep()
      }
      for (let o = 0; o < self.monsterArr.length; o++) { // 怪兽移动
        if (self.monsterArr[o].x < 0) {
          self.end()
          window.cancelAnimationFrame(timer)
          break
        }
        if (self.monsterArrY[o].status !== 'died') {
          self.monsterArrY[o].nextStep()
        } else {
          self.monsterArr.splice(self.monsterArr.findIndex(element => {
            return element === self.monsterArrY[o]
          }), 1)
          self.monsterArrY.splice(o, 1)
          o--
        }
      }
    })
  },
  renderMonster: function (timer) {
    let self = this
    let monsterAlive = this.monsterArr.reduce(function (a, b) {
      return b.status === 'died' ? a : a + 1
    }, 0)
    // 如果当前生存的怪物数量为0且当前关卡的怪物已生成完
    if (monsterAlive === 0 && self.levelObj.levelClear === true) {
      // 清空怪兽移动的interval
      window.cancelAnimationFrame(timer)
      // 显示进入下一关的动画
      self.level++
      self.renderLevel(self.level).then(_ => {
        self.levelObj.play(self.level, self.appendMonster.bind(self))
        self.monsterWalk()
      })
      // 在3秒后进入下一关
      // setTimeout(this.playStart.bind(this), 3000)
    }
  },
  appendMonster: function () {
    let self = this
    let monster = new Monster().render()
    self.monsterArr.push(monster)
    let l = 0
    let r = self.monsterArrY.length - 1
    let m = Math.round((l + r) / 2)
    while (l <= r) {
      if (self.monsterArrY[m].y > monster.y) {
        r = m - 1
      } else {
        l = m + 1
      }
      m = Math.round((l + r) / 2)
    }
    self.monsterArrY.splice(m, 0, monster)
    // console.log(self.monsterArrY)
    // console.log(self.monsterArr)
    // monster.render()
    // window.requestAnimationFrame(monster.nextStep)
  },
  killOneMonster: function (type) {
    let self = this
    // self.appendMonster()
    self.killMonster(type)
    .then(data => {
      let bullet = new Bullet(self.monsterArr[data].position)
      self.bulletArr.push(bullet.render())
      self.monsterArr[data].die()
      return self.automan.hit()
    })
    .then(data => {
      self.score++
      self.changeGameScore(self.score)
      self.changePower(data)
    })
  },
  killMonster: function (type) {
    // let flag = false
    let self = this
    return new Promise(function (resolve, reject) {
      for (let i = 0; i < self.monsterArr.length; i++) {
        // 杀死第一个状态是 walk 的对应颜色的怪兽
        if (self.monsterArr[i].status === 'walk' && self.monsterArr[i].type === type) {
          self.monsterArr[i].die()
          // 渲染子弹
          resolve(i)
          // flag = true
          break
        }
      }
    })
  },
  killAll: function () {
    let self = this
    let monsterAlive = self.monsterArr.filter(function (ele) {
      return ele.status === 'walk'
    })
    self.bulletArr = []
    for (let i = 0; i < monsterAlive.length; i++) {
      let bullet = new Bullet(monsterAlive[i].position)
      self.bulletArr.push(bullet.render())
      monsterAlive[i].die()
    }
    self.score += monsterAlive.length
    self.changeGameScore(self.score)
  },
  changePower: function (power) {
    let powerFillDOM = document.getElementsByClassName('power-fill')[0]
    // 针对不同浏览器添加前缀
    let browsers = ['transform', 'msTransform', 'mozTransform', 'webkitTransform', 'oTransform']
    browsers.forEach(x => {
      powerFillDOM.style[x] = 'scaleX(' + power / 100 + ')'
    })
    if (power === 100 && !this.enterPower) {
      this.powerFull()
    }
  },
  powerFull: function () {
    // const SUPER_TIME = 5000
    let self = this
    self.enterPower = true
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
    page.appendChild(superStrikeDOM)
    self.powerInter = setInterval(function () {
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
    superStrikeDOM.addEventListener('touchend', function () {
      // 去掉闪烁
      powerSlotDOM.className = 'power-slot'
      powerFillDOM.className = 'power-fill'
      superStrikeDOM.className = 'super-strike'
      // 奥特曼进入超级状态
      self.automan.superMode().then(_ => {
        self.killAll()
      })
      page.appendChild(strikeBoardDOM)
      page.appendChild(superLightDOM)
      page.removeChild(superStrikeDOM)
      // 在super time结束后将各个DOM恢复
      setTimeout(function () {
        clearInterval(self.powerInter)
        powerFillDOM.className = 'power-fill'
        page.removeChild(strikeBoardDOM)
        page.removeChild(superLightDOM)
        self.automan.rmSuperMode()
        self.changePower(0)
        powerFillDOM.className = powerFillClassName + ' decreace'
        self.enterPower = false
      }, 2000)
      // 为能量条添加动效类名
    }.bind(this))
  },
  changeGameScore: function (num) {
    let scoreDOM = document.getElementsByClassName('score')[0]
    // 清空scoreDOM中的全部子DOM
    while (scoreDOM.hasChildNodes()) {
      scoreDOM.removeChild(scoreDOM.lastChild)
    }
    // 将 num 转换为 String
    let numArray = this.num2arr(num)
    // 在数组最前面添加一个'x'
    numArray.unshift('x')
    // 一次添加进对应的DOM
    numArray.forEach(function (number) {
      let num = document.createElement('div')
      num.className = 'NumGameScore-' + number
      scoreDOM.appendChild(num)
    })
  },
  renderLastScore: function () {
    let numArray = []
    let scoreDOM = document.getElementsByClassName('score')[0]
    while (scoreDOM.hasChildNodes()) {
      scoreDOM.removeChild(scoreDOM.lastChild)
    }
    numArray = this.num2arr(this.score)
    numArray.forEach(function (number) {
      let num = document.createElement('div')
      num.className = 'NumScore NumScore-' + number
      scoreDOM.appendChild(num)
    })
  },
  renderLevel: function (num) {
    // 清空lvlDOM里所有的子DOM
    let self = this
    return new Promise(function (resolve, reject) {
      let lvlDOM = document.getElementsByClassName('lvl')[0]
      while (lvlDOM.hasChildNodes()) {
        lvlDOM.removeChild(lvlDOM.lastChild)
      }
      let lvlArray = self.num2arr(num + 1)
      console.log(lvlArray)
      // 渲染关卡数
      lvlArray.forEach(x => {
        let lvl = document.createElement('div')
        lvl.className = 'lvl-num lvl-num-' + x
        lvlDOM.appendChild(lvl)
      })
      // show绑定了对应的animation
      lvlDOM.className = 'lvl show'
      // 在2秒后动画结束 去掉show类
      setTimeout(function () {
        lvlDOM.className = 'lvl'
        resolve()
      }, 2000)
    })
  },
  num2arr: function (num) {
    let numArray = []
    do {
      numArray.push(num % 10)
      num = Math.floor(num / 10)
    } while (num / 10 !== 0)
    return numArray.reverse()
  },
  end: function () {
    let stage = document.getElementsByClassName('stage')[0]
    if (stage.getElementsByTagName('div')[0]) {
      stage.removeChild(stage.getElementsByTagName('div')[0])
      // document.getElementById('canvas').remove()
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
    this.renderLastScore()
    let highestScore = Cookie.prototype.getCookie('hs')
    console.log(highestScore)
    if (highestScore === null || highestScore < this.score) {
      Cookie.prototype.setCookie('hs', this.score, 100, 'y')
      highestScore = this.score
    }
    this.renderHighestScore(highestScore)
  },
  renderHighestScore: function (num) {
    let numArray = []
    let highestScoreDOM = document.getElementsByClassName('highest-score')[0]
    while (highestScoreDOM.hasChildNodes()) {
      highestScoreDOM.removeChild(highestScoreDOM.lastChild)
    }
    numArray = this.num2arr(num)
    numArray.forEach(function (number) {
      let num = document.createElement('div')
      num.className = 'HighestScore HighestScore-' + number
      highestScoreDOM.appendChild(num)
    })
  },
  sharePage: function () {
    let stage = document.getElementsByClassName('stage')[0]
    if (stage.getElementsByTagName('div')[0]) {
      stage.removeChild(stage.getElementsByTagName('div')[0])
    }
    let page = document.createElement('div')
    let board = document.createElement('div')
    let aotuman = document.createElement('div')
    let grass = document.createElement('div')
    let rank1 = document.createElement('div')
    let rank2 = document.createElement('div')
    let rank3 = document.createElement('div')
    let rank4 = document.createElement('div')
    let startBtn = document.createElement('div')
    let sharebg = document.createElement('div')
    let sharetip = document.createElement('div')
    page.className = 'page-4 page'
    board.className = 'board'
    aotuman.className = 'aotuman'
    grass.className = 'grass'
    rank1.className = 'rank1 rank'
    rank2.className = 'rank2 rank'
    rank3.className = 'rank3 rank'
    rank4.className = 'rank4 rank'
    sharebg.className = 'sharebg'
    sharetip.className = 'sharetip'
    startBtn.className = 'start-btn moveFromBottom'
    startBtn.addEventListener('touchend', function () {
      this.play()
    }.bind(this))
    stage.appendChild(page)

    page.appendChild(board)
    page.appendChild(aotuman)
    page.appendChild(grass)
    page.appendChild(sharebg)
    page.appendChild(sharetip)
    board.appendChild(rank1)
    board.appendChild(rank2)
    board.appendChild(rank3)
    board.appendChild(rank4)

    setTimeout(page.appendChild.bind(page, startBtn), 1000)
    let dataJson = [{
      'headImg': 'test.jpg',
      'name': 'Zero',
      'score': '1231'
    }, {
      'headImg': 'test.jpg',
      'name': '忘了爱',
      'score': '422'
    }, {
      'headImg': 'test.jpg',
      'name': '小贞贞',
      'score': '213'
    }, {
      'headImg': 'test.jpg',
      'name': 'Chen',
      'score': '113'
    }]
    this.appendRank([rank1, rank2, rank3, rank4], dataJson)
    sharebg.addEventListener('touchend', function () {
      page.removeChild(sharebg)
      page.removeChild(sharetip)
    }.bind(this))
  },
  appendRank: function (stage, json) {
    for (let i = 0; i < 4; i++) {
      let rankImg = document.createElement('div')
      let headImg = document.createElement('div')
      let name = document.createElement('div')
      let score = document.createElement('div')
      rankImg.className = 'rank-img rank-item'
      headImg.className = 'head-img rank-item'
      name.className = 'name rank-item'
      score.className = 'score rank-item'
      stage[i].appendChild(rankImg)
      stage[i].appendChild(headImg)
      stage[i].appendChild(name)
      stage[i].appendChild(score)
      name.innerHTML = json[i].name
      let scoreArr = this.num2arr(json[i].score)
      for (let i = 0; i < scoreArr.length; i++) {
        let num = document.createElement('div')
        num.className = 'rank-score rank-score' + scoreArr[i]
        score.appendChild(num)
      }
    }
  }
}

export default Stage
