import './page/css/index.scss'

import Preload from './page/js/preloadImg'
import Stage from './page/js/stage'

window.onload = function () {
  let stage = new Stage()
  let preload = new Preload([
    // start page
    '../static/imgs/StartIcon.png',
    '../static/imgs/StartBtn.png',
    // game page
    '../static/imgs/Aotuman.png',
    '../static/imgs/GameGrass.png',
    '../static/imgs/Gap.png',
    '../static/imgs/Key.png',
    '../static/imgs/MonsIcon.png',
    // 'static/Monsters.png',
    '../static/imgs/M1.png',
    '../static/imgs/M2.png',
    '../static/imgs/M3.png',
    '../static/imgs/M4.png',
    '../static/imgs/PowerFill.png',
    '../static/imgs/PowerSlot.png',
    '../static/imgs/game_bg.jpg',
    '../static/imgs/Bullet.png',
    '../static/imgs/SuperLight.png',
    '../static/imgs/SuperStrike.png',
    '../static/imgs/StrikeBoard.png',
    // end page
    '../static/imgs/Grass2.png',
    '../static/imgs/Man2.png',
    '../static/imgs/ScoreBoard.png',
    '../static/imgs/NumHighest.png',
    '../static/imgs/NumScore.png',
    '../static/imgs/Restart.png',
    '../static/imgs/Share.png',
    // share page
    '../static/imgs/RankList.png',
    '../static/imgs/Rank1.png',
    '../static/imgs/Rank2.png',
    '../static/imgs/Rank3.png',
    '../static/imgs/User.png'
  ])
  preload.preload(stage.loading.bind(stage))
}
