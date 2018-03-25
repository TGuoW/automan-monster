import './page/css/index.scss'

import Preload from './page/js/preloadImg'
import Stage from './page/js/stage'

window.onload = function () {
  let stage = new Stage()
  let preload = new Preload([
    // start page
    'http://39.108.221.165/static/automan/imgs/StartIcon.png',
    'http://39.108.221.165/static/automan/imgs/StartBtn.png',
    // game page
    'http://39.108.221.165/static/automan/imgs/Aotuman.png',
    'http://39.108.221.165/static/automan/imgs/GameGrass.png',
    'http://39.108.221.165/static/automan/imgs/Gap.png',
    'http://39.108.221.165/static/automan/imgs/Key.png',
    'http://39.108.221.165/static/automan/imgs/MonsIcon.png',
    // 'static/Monsters.png',
    'http://39.108.221.165/static/automan/imgs/M1.png',
    'http://39.108.221.165/static/automan/imgs/M2.png',
    'http://39.108.221.165/static/automan/imgs/M3.png',
    'http://39.108.221.165/static/automan/imgs/M4.png',
    'http://39.108.221.165/static/automan/imgs/PowerFill.png',
    'http://39.108.221.165/static/automan/imgs/PowerSlot.png',
    'http://39.108.221.165/static/automan/imgs/game_bg.jpg',
    'http://39.108.221.165/static/automan/imgs/Bullet.png',
    'http://39.108.221.165/static/automan/imgs/SuperLight.png',
    'http://39.108.221.165/static/automan/imgs/SuperStrike.png',
    'http://39.108.221.165/static/automan/imgs/StrikeBoard.png',
    // end page
    'http://39.108.221.165/static/automan/imgs/Grass2.png',
    'http://39.108.221.165/static/automan/imgs/Man2.png',
    'http://39.108.221.165/static/automan/imgs/ScoreBoard.png',
    'http://39.108.221.165/static/automan/imgs/NumHighest.png',
    'http://39.108.221.165/static/automan/imgs/NumScore.png',
    'http://39.108.221.165/static/automan/imgs/Restart.png',
    'http://39.108.221.165/static/automan/imgs/Share.png',
    // share page
    'http://39.108.221.165/static/automan/imgs/RankList.png',
    'http://39.108.221.165/static/automan/imgs/Rank1.png',
    'http://39.108.221.165/static/automan/imgs/Rank2.png',
    'http://39.108.221.165/static/automan/imgs/Rank3.png',
    'http://39.108.221.165/static/automan/imgs/User.png'
  ])
  preload.preload(stage.loading.bind(stage))
}
