let Level = function () {
  this.index = 0 // 当前生成怪兽的指针
  this.levelClear = false // 当前关卡的怪兽是否全部添加
  this.level = [ // 关卡每个怪兽生成的间隔时间
    [3031, 2028, 1623, 112, 1823, 1291, 1103, 823, 231, 1212, 112, 1130, 124, 1503, 623, 412, 123, 1102],
    [2589, 1732, 1230, 279, 1323, 188, 1523, 991, 803, 523, 1720, 981, 643, 536, 186, 805, 267, 708, 36, 1024, 509, 276, 233, 960],
    [2657, 1608, 1404, 118, 188, 1523, 991, 803, 523, 1045, 803, 523, 981, 643, 536, 186, 805, 834, 187, 219, 814, 216, 595, 44, 1092, 94, 322, 17, 826],
    [2603, 1642, 1333, 159, 703, 423, 881, 543, 436, 286, 705, 734, 87, 319, 423, 169, 812, 288, 730, 276, 714, 1162, 417, 37, 361, 619, 313, 363, 119, 887, 40, 34, 153, 583],
    [2691, 1531, 1148, 59, 745, 159, 703, 423, 881, 543, 436, 286, 705, 734, 87, 319, 423, 169, 812, 288, 730, 276, 714, 1162, 417, 37, 361, 619, 313, 363, 225, 119, 279, 729, 234, 736, 76, 991, 235, 112, 249, 380]
  ]
}

Level.prototype = {
  play: function (level, appendMonster) {
    if (this.level.length < level) {
      this.appendLevel(level)
    }
    this.index = 0
    this.levelClear = false
    let total = this.level[level - 1].reduce((x, y) => x + y)
    let magn = total / (4500 + 3500 * (level + 2))
    this.level[level - 1] = this.level[level - 1].map(x => Math.floor(x / magn))
    this.wrapTimeout(level, appendMonster)
  },
  wrapTimeout (level, appendMonster) {
    if (this.index < this.level[level - 1].length) {
      // if (appendMonster()) {
      appendMonster()
      let waitTime = this.level[level - 1][this.index++] + Math.floor(Math.random() * 100) - 50
      setTimeout(this.wrapTimeout.bind(this, level, appendMonster), waitTime)
      // }
    } else {
      this.levelClear = true
    }
  },
  appendLevel: function (level) {
      // 取当前level前2和前5进行组合
    let levelNow = this.level[level - 2]
    let levelBefore = this.level[level - 5]
    let levelNew = []
      // length = levelNow.length - levelBefore;
    for (var i = 0; i < levelNow.length; i++) {
          // 在新的数组中压入前2的一个元素
      levelNew.push(levelNow[i])
          // 如果前5还有元素
      if (levelBefore[i]) {
              // 前5对应位置的元素减去前2的取绝对值压入新数组
        levelNew.push(Math.abs(levelNow[i] - levelBefore[i]))
      }
    }
      // 在整个level数组中压入新的level数组
    this.level.push(levelNew)
  }
}

export default Level
