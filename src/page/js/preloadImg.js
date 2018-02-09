let Preload = function (imgArr) {
  this.imgArr = imgArr
  this.preImages = []
}

Preload.prototype = {
  constructor: Preload,
  preload: function (done) {
    for (let i = 0; i < this.imgArr.length; i++) {
      this.preImages[i] = new Image()
      this.preImages[i].src = this.imgArr[i]
      this.preImages[i].isLoad = false
      this.preImages[i].onload = function () {
        this.preImages[i].isLoad = true
        this.isPreloadFinished(done)
      }.bind(this)
    }
  },
  isPreloadFinished: function (done) {
    let preImagesFinished = this.preImages.filter(img => {
      return img.isLoad
    })
    if (preImagesFinished.length === this.preImages.length) {
      done()
    } else {
      done(preImagesFinished.length, this.preImages.length)
    }
  }
}

export default Preload
