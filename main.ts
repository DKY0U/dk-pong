enum SpriteKindLegacy {
    Player,
    Projectile,
    Food,
    Enemy
}
function drawBackground () {
    background = image.create(scene.screenWidth(), scene.screenHeight())
    netLength = 8
    netWidth = 2
    netX = scene.screenWidth() / 2 - netWidth / 2
    netY = 0
    while (netY < scene.screenHeight()) {
        background.fillRect(netX, netY, netWidth, netLength, 1)
        netY += netLength
        netY += netLength
    }
    scene.setBackgroundImage(background)
}
function updatePlayer2 () {
    if (Math.abs(ball.y - playerRight.y) > aiSpeed) {
        if (ball.y > playerRight.y) {
            playerRight.y += aiSpeed
        } else {
            playerRight.y += 0 - aiSpeed
        }
    }
}
function bounceBall () {
    if (ball.x < scene.screenWidth() / 2) {
        // Ball bounced off of left paddle. Only bounce if vx is still negative.
        if (ball.vx < 0) {
            setBallSpeed()
            // Make sure vx is positive.
            if (ball.vx < 0) {
                ball.vx = ball.vx * -1
            }
            music.baDing.play()
        }
    } else {
        // Ball bounced off of right paddle. Only bounce if vx is still positive.
        if (ball.vx > 0) {
            setBallSpeed()
            // Make sure vx is negative.
            if (ball.vx > 0) {
                ball.vx = ball.vx * -1
            }
            music.baDing.play()
        }
    }
}
function initialize () {
    playerLeft = sprites.create(img`
        . . . . . . . . . . . . . 1 1 1 
        . . . . . . . . . . . . . 1 1 1 
        . . . . . . . . . . . . . 1 1 1 
        . . . . . . . . . . . . . 1 1 1 
        . . . . . . . . . . . . . 1 1 1 
        . . . . . . . . . . . . . 1 1 1 
        . . . . . . . . . . . . . 1 1 1 
        . . . . . . . . . . . . . 1 1 1 
        . . . . . . . . . . . . . 1 1 1 
        . . . . . . . . . . . . . 1 1 1 
        . . . . . . . . . . . . . 1 1 1 
        . . . . . . . . . . . . . 1 1 1 
        . . . . . . . . . . . . . 1 1 1 
        . . . . . . . . . . . . . 1 1 1 
        . . . . . . . . . . . . . 1 1 1 
        . . . . . . . . . . . . . 1 1 1 
        `, SpriteKindLegacy.Player)
    playerLeft.setPosition(0, scene.screenHeight() / 2)
    controller.moveSprite(playerLeft, 0, 100)
    playerLeft.setFlag(SpriteFlag.StayInScreen, true)
    playerRight = sprites.create(img`
        1 1 1 . . . . . . . . . . . . . 
        1 1 1 . . . . . . . . . . . . . 
        1 1 1 . . . . . . . . . . . . . 
        1 1 1 . . . . . . . . . . . . . 
        1 1 1 . . . . . . . . . . . . . 
        1 1 1 . . . . . . . . . . . . . 
        1 1 1 . . . . . . . . . . . . . 
        1 1 1 . . . . . . . . . . . . . 
        1 1 1 . . . . . . . . . . . . . 
        1 1 1 . . . . . . . . . . . . . 
        1 1 1 . . . . . . . . . . . . . 
        1 1 1 . . . . . . . . . . . . . 
        1 1 1 . . . . . . . . . . . . . 
        1 1 1 . . . . . . . . . . . . . 
        1 1 1 . . . . . . . . . . . . . 
        1 1 1 . . . . . . . . . . . . . 
        `, SpriteKindLegacy.Player)
    playerRight.setPosition(scene.screenWidth(), scene.screenHeight() / 2)
    aiSpeed = 1
    info.player1.setScore(0)
    info.player2.setScore(0)
    playerRight.setFlag(SpriteFlag.StayInScreen, true)
    ball = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . 1 1 . . . . . . . 
        . . . . . . 1 1 1 1 . . . . . . 
        . . . . . 1 1 1 1 1 1 . . . . . 
        . . . . . 1 1 1 1 1 1 . . . . . 
        . . . . . . 1 1 1 1 . . . . . . 
        . . . . . . . 1 1 . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKindLegacy.Enemy)
    ball.setFlag(SpriteFlag.BounceOnWall, true)
    needsReset = 1
    maxScore = 5
    screenMargin = 10
}
function runCountdown () {
    if (countdown > 0) {
        ball.say("" + countdown)
        countdown += -1
        nextCountdown = game.runtime() + 1000
    } else if (countdown == 0) {
        ball.say("시작!!", 1000)
        countdown += -1
        nextCountdown = game.runtime() + 1000
    } else {
        inCountdown = 0
        setBallSpeed()
    }
}
function setBallSpeed () {
    ballVx = randint(25, 100)
    ballVy = 100 - ballVx
    if (Math.percentChance(50)) {
        ballVx = ballVx * -1
    }
    if (Math.percentChance(50)) {
        ballVy = ballVy * -1
    }
    ball.setVelocity(ballVx, ballVy)
}
function resetBall () {
    ball.setPosition(scene.screenWidth() / 2, scene.screenHeight() / 2)
    ball.setVelocity(0, 0)
}
function testBall () {
    if (ball.overlapsWith(playerLeft) || ball.overlapsWith(playerRight)) {
        bounceBall()
    } else {
        // Ball is past Player 2
        if (ball.x > scene.screenWidth() - screenMargin) {
            info.player1.changeScoreBy(1)
            needsReset = 1
            if (info.player1.score() >= maxScore) {
                game.over(true, effects.bubbles)
            } else {
                music.powerUp.play()
            }
        }
        // Ball is past Player 1
        if (ball.x < screenMargin) {
            info.player2.changeScoreBy(1)
            needsReset = 1
            if (info.player2.score() >= maxScore) {
                game.over(false, effects.splatter)
            } else {
                music.powerDown.play()
            }
        }
    }
}
function music2 () {
    music.playTone(330, music.beat(BeatFraction.Half))
    music.playTone(349, music.beat(BeatFraction.Half))
    music.playTone(392, music.beat(BeatFraction.Half))
    music.playTone(523, music.beat(BeatFraction.Double))
    music.playTone(294, music.beat(BeatFraction.Half))
    music.playTone(330, music.beat(BeatFraction.Half))
}
function startRound () {
    resetBall()
    runCountdown()
}
let ballVy = 0
let ballVx = 0
let inCountdown = 0
let nextCountdown = 0
let countdown = 0
let screenMargin = 0
let maxScore = 0
let needsReset = 0
let playerLeft: Sprite = null
let aiSpeed = 0
let playerRight: Sprite = null
let ball: Sprite = null
let netY = 0
let netX = 0
let netWidth = 0
let netLength = 0
let background: Image = null
namespace projectImages {
    //% fixedInstance
    export const pongItroBg_160x120 = image.ofBuffer(hex`e4a07700bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcbbbbbbbbbbbbbbbbbbbbbbbbcbdbbbbbbbbbbbbcbcccbccbccccccccccbccccccccccccccbbbbbbbbbbdddd0dbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcccccbccbcccccccccbccccccccccccccccbbbbbbbbbdbdd0dbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcbbbbbbbbbbbbbbccbccccbccccccccccccccccccccccbcbbbbbbbbbbbbdbdd0dbbbbbbbbbbbbcbbbbbbbbbbbbbbbbbcbbbbbbbbbbbbbbbbbbbbbbbbcbbbbbbbbbbbbbbccbbcccbcbccccccccccccccbbccbbbbbbbbbbbbbbbbdbdd0dbbbbbbbbbbbbbbbcbbbbbbbbbbbbbbcbbcbbbbbbbbbbbbbbbbbbbbbcbbbbbbbbbcbbbbcbcbbccbcbccccccccccccccbbbbbbbbbbbbbbbbbbbbbbdd0dbbbbbbbbbbbbbbbbcbbcbbbbbbbbbbcbbcbbbbbbbbbbbbbbbbbbbbbcbbbbbbbbbbbbbbccccbbcbcbcccbccccccbcbcdbbbbbbbbbbbbbbbbbbbbbdd0dbbbbbbbbbbbbbbbbbbcbbcbbbbbcbbbbbcbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcbcbbcbcbccccccccccbbbbbbbbbbbbbbbbbbbcbbbbbbdd0dbbbbbbbbbbbbbbbbbbcbccbcbbbbbbbbbcbbbbbbbbbbbbbbbbbbbbbcbbbbbdbbbbbbbbbbbcbbcbcbccccccccbcbbbbbbbbbbbbbbbbcbbcbbbbbbdd0dbbbbbbbbbbbbbbbbbbbbccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbccbbbbbbdbbbbbbbcbbbbbccccccccccccbbbbbbbcbbbbbbbbbbccbcbbbbbbdd0dbbbbbbbbbbbbbbbcbcbbbbcbccbbbbbbbbbbbbbbbbbbbbbbbbbbbbccbbbbbbbbbbebbbcbbbbbcbccccccccccbbcbcbbcbbbbbbbbbbbcbcbbbbbbdb0dbbbbbbbbbbbccbcbbbbbbbbbcbebbbbbbcbbbbbbbbbbbbbbbbbbbbccbbbbbbbbbbbbbbbbbbbbbbcbccccccccbbcbccbcbbbbbbbbbbccbcbbbbbbdb0dbdbbbbcbbcbbcbcbbcbbbbbbbbebbbbbbbbbbbbbbbbbbbbbbbbbbbccbbbbbbbbccbbbbbbbbdbbbbbccccccccbbccccbcbbbbbbbbccccbcbbbbbbdb0ddbddbbbbbcbbbccbbcbbcbbcbdbbbbbbbcbbbbbbbbbbbbbcbbbbbbccbbbbbbccccbcbbbbbbdbbbbbccccccccbbcccccbbbbbbbbbccccbcbbbbbbdb0ddbddddbbbbbbbbcbbcbbcbbcddbbbbbebcbdbbbbbbbbbbbcbbbbbbcbbbbbcbccccbcbbbbbbdbbdbbccccccccccccccccbbbbbbbbccdbccbbbbbbdb0dbbdbddddbdbbbbbcbcbbccbbd4bbbbbebcbbbbbbbbbbbbbcbbbbbbcbbbbbccccccdcbbbbbbdbbdbbccccccccccccccccccccbbcc1b11bbbbbbbbbb0dbbbbbbddddbbccbcbcbbbcddd4ddbbbbbcbbbbbbbbbbbbbcbbbbbbcbbbcbccccccbcbbbbbbdbbdbbccccccccccccccccccccccbcd133cdbcbbbbbb0dbbbbbbbcddddbbccbebbbc445544bbbbbcbbbbbbbbbbbbbcbbbbbbcbbcccccccccbcbbbbbbdbbdbbcccccccccccccccccccccc1b4344cdccbbbbbb0dbbbbbbccbbddddbbebbbcc5455d5bbbebcbbbbbbbbbbbbbcbbbbbbcbecccccccccbcbbbbbbdbbdbbccccccccccccccccccccccdd4444cdccbbbbbb0dbbbbbbccbbdbddbbcbbbcc5d55d5bbbbbcbbbbbbbbbbbbbcbbbbbbcbccccccccccccbbbbbbdbddbbccccccccccccccccccccbc414444cdbcbcbbbb0bbbbbcbccbbccbbbbbbcbbc5d5445ebbeccbbbbbbbbbbbbbcbbbbbbcbccfcccccccbcbbbbbbdbddbbccccccccccccccccccccdc445455cdccccbbbb0bbbbbcbbcbbcbbbbbbbcbdc5555d5ebeeccbbbbbbbbbbbbbcbbbbbbcbccffccccbcbbbbbbbbdbddbbccccccccccccccccccccdb445555cdccccbbbb0bbbbbcbbcbbcccccbbbcbdc554545edecccbbbbbbbbbbbbbcbbbbbbcbfcffccbbbbbbbbbbbbdbddcbcccccccccccccccccccc3b445577cdccccbbbb0bbbbbcbbccbcccbcbbcce4b554545e4ecccbbbbbbbbbbbbbcbbbbbbcbffffbcbbbbbbbbbbbbdbddbbcccccccccccccccccccc4d547577cdccccbbbb0bbbbbcbbbcbcccbcbbbccde555545edeeccbbbbbbbbbbbbbcbbbbbbcbffcfbbcbbcbbbbbbbbdbddbbcccccccccccccccccccc4d547777cdccccbbbb0bbbbbcbcccbcccebbbeccbe5d44d4ebeeccbbbbbbbbbbbbbcbbbbbbcbfcbfbbcbbcbbbbbbbbddddcbccccccccccccccccccbc43557766cdccccccbb0bbbbbcccccccbcbbbebccec5444d4eeeeccbbbbbbbbbbbbbcbbbbcbccccbcbbcbccbcbbbbbbdbddcbccccccccccccccccccbc44756766cdcccccccb0bbbbbbccbcccbccbebbcccc444544eeeeccbbbbbbbbbbbbbcbbcccbccccbbcbccccccbbbbbbdbddcbcfccccccccccccccccdc44756666cdcccccccc0bbbbbccbcbcebcebebbccbc444444beeebcbbbbbbbbbbbbbccbbccbccccbbcbcccbccbbbbbbbbddcbcfccccccccccccccccdc447566b6cdcccccccc0cbbbbbbbbcccbecbecbecbcdd44ddeeeebcbbbbbbbbbbbbbccbbccbccccbbcbbccbccbbbbbb7bddcbcfffccc7ccccccccccdc547766bacdcccccccc0cbbbbccbccbcbbcbbcbccecebddbeeebebebbbbbbbbbbcbbcccbccbccccbbcbbcbbccbbbbbb7bdbfbffffcfc7ccccccccccdc5467a6bacdcccccccc0bbbbbccccccececebceccecbebdeebceebcbbbbbbbbbbccccfcbccbccccbccbbcbbcbbcbbbb77bbfbff7cc7c7cccccccccc3c5467a61bcbcccccccc0bbbbbccccbbcecccbcbccccecbbececeebcbbbbbbbbcbccccffbbcbccccbccbbcbcbbccbbbbb7bbfbff7cc7c7cccccccccc3b5467a6d1ccbcccccbc0bbbccbcccbcbbeebeccccececcecceceebebbbbbbccffcfcccfcdcbcccccccccbbcbbcbbc7bc7bbfbff7cccc7cccccccccc3b5467b6cdbcbbcbcccc0bbbbbcbcbbcebceecccccececccccecebbcbbbbbbfcffffcccfcbcbcccccccccbbcbbbdbc77b7bbfccf7c7cc7cccccccccc3b54673acbbbbbcbcccc0bbbbdbbcbcccbcceeccccececccccecebbebbbbcbfffcffcfcfcbcccccccccccbccdbddbbc7b7bdffcf7c7cc7cccccccccc4b7467dacbbbbbcbcccc0bbbbbcbbccccccceeccccececccceeceebebbbbfcffffcfffcfccccccccccccbbccdbddbdc7b7bdffcc7c7cc7cccccccccc4b7467dabbbbbbcbcccc0cbbcbccbbebcceeccccccbeccccceeceebebdccfffffcfffcccccccccccccccbcccbbddcb77b7cbffcc7cccc7cccccccccc4b7467dabbbbbbcbcccc0cbbcbccbcebceeecccccceeccecceeceebbcbffffffcfffffccccccccccccccbcccbbbdcb7cb7cbcfcc7cccc7cccccccccc4b7467dabbbbbbcbcccc0cbbbbccbcebeeeeccccccbeceecceeceecbfcffffffcffcffcccccfccccccccbcbcbbbdcccc77fccfef7cccc7cccccccccc4b54673abdbbbbcbcccc0cbbcbccecbeccbececccceeceecceeeeeceffffffffffffffcfccfcfcccccbcbbbccbbbcccc7bcccfbf7cccc7cccccccccc3b5467a6b1bbdbcbcccc0cbbcbcceceebceececcccbececccceeeefcffffffffffffffcfecfcffccccdcbdbccdcbbccbbbfccfccccccc7cccccccccc3b5467a61dbbbbcccccc0ccccbcceeeeecbecbcccceececccceeeeffffffffffffffffcfecfcffccccbcdbdbcbcccc7bcbfcffffcccccccccccccccc3c5467a61abdcccccccc0ccbcbcbbbecceebceccccbbcecccceeceffffffffffffffffcfeefcfffcccbcdbbbcbcccc7c77ffffffffccccccccccccccdc5467a6babdcbcccccc0cbbccecbbeeeeeccecccceccecccceefeffffffffffffffffcfeefcffffcccccccccbcccc7c77fcffffffffffccccccccccdc547766bacdcccccccc0cbbcbceeeeeebcccecccceecccccccefcffffffffffffffffeeeecfccccccccccbccbcccc777cfcccccfcccffffcfccccccdc447766b6cdcccccccc0cbbcccceceebecccecccceeccccccceffffffffffffffffcfebebccbbcbccccccbccbcccc777cecbbcccc7cffffffccccccdc44756666cdcccccccc0cbbccbcececbececccccceececcccccffffffffffcfffffecbbebccbbbbccccccbccbcccc7cecbecbcfcccccfffffffffccbc44756766cdcccccccc0ccbccbbeeccbbcbcccccceeccccccceffffffffffeefeffbcbbeb6cb6bbccccccccccccccecbcbbfccccc7777ffffffffffcc43557766cdcccccccc0cbbccbcbbceeecccccceceeccccccfeffffffffeebbfeffbbbbbb6bb6bbccccccccccccccecbecdefcbccc777ffffffffffcc4d547777cdcccccccc0ccbccbcebcebbcecccceeebccccccfeffffffefeebbcecfbbbbbbbbb6bbccccccccccccccbc77eebbfb7cc77cffffffffffcf4d547577cdcccccccc0ccbccbeeececbeccccceeeeccccccfeffffffeeeebbcecfbbbbbbbbb6bbcccccccccccccc7e77bbbdff7ccc7cffffffffffcf3b445577cdcccccccc0ccbceebebcccecccccceeeeccccccfcffffffeeeeeecebcbdbdbdbbb6bbcccccccccbcccc7e7bddcbff7ccc7cffffffffffcf1c445555cdcccccccc0ccbebbccbccceccccccbeeeccccccfcfcfcffbeeeeebebbddbbbbdbb6bbccccccccbdcccc7e77cdeffc7fc77cffffffffccccdc435455cbcccccccc0ccbbbecbecceeccccccbceeccccccccccfccfbbeeebdebbbdddbddbb6bbccccccbcbdcccc7eb7ebebfc7fc77cffffffffcccccc414454cbcccccccc0cbcecebbbcceccbcccceeeeceecccccccccecbbbbdddebbbdddbdbbb6bbccccccbcbdcccc7e77ddcbff7fc77cffffffffccccccdd4444cbcccccccc0ccbcceeebcceccecccceceeceeeccccccccecbbdbdddbbbbdddddbbb6bbccccccbcddcbcc7e77ddfcff777777ffffffffcccccc1c4d44cbcccccccc0cbcccebeeecbececccceeeeceecccccccccbcbbbbddbbccbddbbd6bcccbccccccbcddcbccecebcefcff7777c7ffccffcccccccccc1133cbcccccccc0ccbccceeecceecccccceeeeceecccccfcccbebbbebdedcebdcecccfcccbccccccbbddcbcceceeeefcffffffffcfccccccccccccccdc11cbcccccccc0cccbccccecccecccccceeccceeceeccccccbebbeebdebceccfecccccbccccfcccdbddbbcc7c77feffcffeffffccccccccccccccccccbbcccccccccc0ccccceebecccccccccceeccceecccccbcbbbebbebbdebcffcffccccccccccfccfdddbbbcf7c77ffffcffeffcfcccccccccccccccccccccccccccccc0cccccbceccceccccccceeccccecccccfbbcbebbebbdeecfffcfccccccccccfccfdddbbbfc7fc7ffffffffcfcccccccccccccccccccccccccccccccc0cccccbceccececcccccccceecececccffffbebbbbbdfecfffcfccccccccccffbcdbbbbbfccffcffffff7c77cccccccccccccccccccccccccccccccc0cccccccebecceccccccccceecccecfcffffefbbdbebfeffffcfccccccccfcccccbcbcbbcc7fccffffff7c77cccccccccccccccccccccccccccccccc0cccbbcceceececccccceececccfccccfffcffbebbeeffffffcfccccccfccfcccccccccccc7fccffffffcccccccccccccccccccccccccccccccccccc0cccebccbcebccccccccceeecccccccecccbfcefebceffffffcfffffffffcfcccccccccccc7ffcffffffcfcccccccccccccccccccccccccccccccccc0bcccccceeebcecccccecccecccccccccccbfcffeeffffffffcfffcffcffcccccccccccccc7ffcffffffcfcccccccccccccccccccccccccccccccccc0bcccccceceececccccccccecfecccccccccccfffffffffffffcffccfccfcfcccccccfccfccf77ffffffcfcccccccccccccccccccccccccccccccccc0bccccccbceeccccccecccceecccceccfcffccffffffffffffffcffccfccccccfcfffffcff7f77ffffffcfcccccccccccccccccccccccccccccccccc0bcbccccbceeccccecececcbeeecceeeceffffffffffffffffcffcffccccccbccbffffffcfcfffffffffcfccccccccccccccccccccccccccccccccbc0bccecccbceecccccceceeeceecccceceefccffcffffffffffccfcfcccbbcbbcccccffffcfffffffffffcfccccccccccccccccccccccccccccccccbc0bccbcccbeccccccecbceeceeecccceceeeefffcffffffffffccccccbbbbbbccbccccbccfcffffffffff7c7777ccccccccccccccccccccccccccccbb0bcccccceececcccececccccceccccccbeeefcfffffffffffffcccbbcbdbbdbcbbbccbbbccffffffffff777777ccccccccccccccccccccccccccccbb0dccbceeeecccccceceeecec1bcbcfccbeeeceffffffffffffcfbcbccbbcbbbcbdbccbbbccffffffffffcfc7ccccccccccccccccccccccccbcccccbc0dccccccceccccccccecccceddcdccfcbeeecefcffffffffffccbbcbcbccbbbcbbbbbbbbbbcbffffffffcfc7cccccccccccccccccccccccccbbcbbbc0dcbccccccceccccccceccbc1dbdecfcebbeebeeffffffffffbcbbcbccccbcbcbbbbbbbbbbebeeeefeffcfc7cccccccccccccccceccbccbcbbcbbccb0bbbcccceececcccccceccbc11b1eecebebeeebbfbffffffcfcbccbccccccccbbbbbbbbbdbebeeeeeeffcfccccccccccccffcfccecebebebbbcbcccc0cbbcccccccccccccbccccbc11b1cceceebeeebeebffffffccbbccbccbccccccbcbbbbbbdbbbee77ebffcfccccccccccfcffcfccccbbbbbebbcccccc0cbbcbccccccccccceccccdb11b1cccceebeeebeebeeffcfbcbbbbccbbccccccbcbbbbbbdb7b7777edffcf7cccccccccffffcfccccbbbbbbbbcccccc0cbbbbcccccccccccceccedd11d1cccceebebeeeebeeffcfbbccbbccbbccccccccbbbbbbdb7777beebfecc7cccccccfcffffcfccccbbeebbbebccbcc0cbbbbcccccccccccccccc1d11b1cececcebeebeedeeeecfbbbbbbcbbcccccccccbcbbbbdb7d77beebfeccc7ccccccffffffcfccccbeebbbbbbbcbcc0cbcbdcbccccccccceccbc11ddb1ceeeceeeeebeedeeeebfcbccccbcccccccccccccbbbbdb7d7bbbebfeccc7c7ccccffffffcccccceeebbbbebbcbcc0cecbbbbcccccccccecebc1111b1cececceeeebeebeeeebccbccccccccccccccccccbbbbbb7d7dbdbbee7cc777ccfcffffffccccccbebbbbbbdbcdcc0cccbcbbbbcccccccccebc11d1d1ceceeceeeebeebeeeebccbcccccccccccccccfccbcbbbb7d77ddbbeb7c7c7cccfcffffffffccccbcbbbbbbbdbdcc0ceccebbbdcbccccccecdc11b1b1ccecefeeeebeebeeeecbccbbbbcbcccffcffffcfbcbbdb77b7ddbdeb7c7c7cccffffffffffcfccbcbbbbbbbbbdcc0ccceebbdbbbceccccccdc11d1b1ececefeeeebeebeeeebbbbbbbbcbccfcffccccffcccccc7bd7ddbdeb7c777cfcffffffcffffcccbebbbbbbbbbdcc0cccccbbddddbbccccccbc1111b1cccecfeeeebeebeeeebbbbbbbbcbccfccfccccccccffffffcfbbbbeb7c777cfcffffffcfcfffccbcbbbbbbbbddcc0ccccbbedbddbbceccecbe11ddb1fcceeceeeebeebeecebbbbbbbbccccccccccccccccffffffccccdccb7c777cffffffffcfffccccbcbbbbbebddbbd0cccecebdebbbbceccccbe1d11b1ccceeceeeebeebeecec6bbbbbbccccccccccccccccfcffcf77cccffe777777ffffffffcffcccccbcbbbbbbdbdbbd0ccebceeccbbebecccecce1d11b1cccbeceeebbeebeecebcbbbbbbcbbbccccccccccccfcff7f7cccfffc7777c7ffffffffffccccccbcbbbbbbdbdbbd0ccebceeccbeebeeecccebbd11b1fcceeceeeeeeebeececcbbbbbbbbbbeeeccfccccccfcff7f7fccfffcccfcfcffffffffffccccccbcbbbbbbbbddbb0cccbccecccceececcceeebe11b1cccceceeeebeebeececcbbbbbbebbbeeeecfccccccfcffcf7fccfffcffffcfffffffffffccccccbcbbbbbbbbbdcb0cccbceeccccececccbcecbe11b1cecceceeeebeebeececcbbbbebbeeebbeecfccccbcfcff7fcccffcffffffcffffffffffffcccccbcbbbbbbbbbbcb0cccccebccccccccccbcbbbe1db1ceceebebeebeebeececcbcbbbbebeebbeecbccccbcfcff7fc7cffcffffffffffffffffffccccccbcbbbbbbbbbbcb0cccbccbccccecccecbbeece1dcdecceecbbeebebbeeccccbcbbbbebeebedbbbccccbbfcff7ff7cffcffcfcffcffffffffffccccccbcbbbbbbbbbbcb0cbbbcbbbbbbbbbbbbececceddcbccceecbebbbcbbeeccccccbbbbebeebbddbbccccbcccffcfffffccffcf7ffcffffffffffccccccccbbbbbbbbbbcb0cbcbbbbbbccbbcbccceecccbeccceeeeeeceeeebbeeccccccbcbbebbebbbdbbcbccbcccffcfccfffcffcf7cffffffffffffccccccccbbbbbbbbbbcb0cbbcbbecccccececcceeeceeeccceecffffffefbeeeccccccbcbbfeecbbbdbbccccbcccff7f77cfccff7f77ffffffffffcfccccccccbbbbbbbbbbcb0cbcccebccccecebcccebcfeeecccefcfffffffeefeeccccccbbcbccbcbbbdbbccccbcccff7fc7cfccff7fc7ffffffffffffccccccccbbbbbbbbbbcb0cccccbbcecceebbecececceebecceffffffffffeeeeccccccccbcbcbbbbbdbbcbccbcccffcfc7cfccff7ff7fffffffffffccfccccccbbbbbbbbbbcc0ccbccbbcbcceeeeeeeeeeceeeccc7ffffffffefeeeeccccfcbcbbbbbbbbbbdbcbccbcbcff7fccccccfcffc7fffffffffffcccccccccbebbbbbbcbbb0cccbbebceceeeeeeceebceeeeecfeffffffefeeeeeecffcccbbbbbbbbbbbbbbcbccbcbcff7fccccccfc7cc7ccfffffffffcccccccccbebbbbbbbdbb0cccbbbbcccecececceeeeeeeecffeffffffeeeeeeeeffccccbbbbbbbbbbbbbbcbccbcbcff7fc7cccccc777777ffffffffffccccccccbcbebbbbbebb0cccbbebcccceeceecbeeeeeeeccfcffffffeeeeeeeefecfbcbbbbbbbbdbbbbbcbccbcbcffcf77ccccccccccc7ffffffffffccccccccbcbcebbbbbbb0cbcbbbbcccceeeccceeeebbeeecfcffffefeeeeeeeefecfbcbbbbbbbbbbbbbbcbccbcbcffcf7cccccccccccfcffffffffcfccccccccbccbbbbbbbbb0cbcbbbbccccceccbceeebbebeccfcffffefeeeeeeeeeecfbcbbbbbbbbbbbbbbcbccbcbcffcfccc7cccc777777ffffffffcfccccccccbcbbbbbbbbbb0bbcbbebccccccecbceeeebeeeccffffffeceeebeeeeeeffbcbbbbbbbbbebbbbcbccbcbcffcfccc7cccc7c7777ffffffffccccccccccbcbbbbbbbbbb0bbbbceecccccececceebbbeeeccffffffeceebbeeeeeeffbcbbbbbbeebebbbbcbccbcbcfccf77c7ccccccffffffffffffffccccccccbccbbbbbbbbb0cbbbbbccceccceeceeebeeeebccffffffeeeebbebeeeefebbbbbbebeebecbbbbbccbcbcfc7f77ccccccccffffffffffffffcccccccccccccccccccc0cbcbcccccccccebcceeeebbebcccfccfcbeebdbebeeeefebcbdbbebeebbbbbbbbccbcbbfc7f7cccccccccfcffffffffffffcfcccccccccccccccccc0cbcbcccccccccecceecebbbeeccccccffbeebddbdeecccebbbbbbeeeebbbbbbbbccbcbcfc7fccc7cccc7cf7ffffffffffffcfcccccccccccccccccc0cbcbcebccccececceecbbbbbeccccccffbbbdddbbbbbcbbbbbbbbecbebbcbbbbbccbcbbfc7cc7c7fffc7cf7ffffffffffffcccccccccccccccccccc0cbccecbcceceeccceecbebbebceccccecbbbbbbbeccbbbbbbbbbbecbebbcbbbbbccbcbbfc7c77c7ccccccc7ccffffcfffffcccccccccccccccccccc0ccbbccccceceececcecbbbbeececcccbcbdbbebbeb8bbbbbbbbbbebbbbbcbbbbbccbcbbfc7cc7cccfccc77c77cccfcccccfcccccccccccccccccccc0cbbcccbccecebceccecebeeeeccfcccbebdeeebbeb8bbbbbbbbbbbbebdbbbbbbbccbbbbfccccccccccccc7777cccccccccccccccccccccccccccccc0cbcbeccccbceeccceccbecececcccccbebdebebbebdbebbbbbbbbbbbbdebbbbbbccbbbbfccccccccccccc777ccccccccccccccccccccccccccccccc0cbcbbcccccccbccecbeeececcccccccbeddbbbbbbbbbbbbbbbbdbbbbbdbbbbbcbccbbbbfccccccccccc7c777cccccccccccccccccbbcccccccccccc0cbbcbcccceceeccccccebeeeebcfcccbcdddbddbbbbbbbbbbbbddbbbbdbbbbbcbbcbbbbffcccccccccc7cc77cccccccccccccccbcddcdcccccccccc0cbccbcccccceecccccebbbecebcccfceeddbbbdbbbbbbbbbbbbdbbdbbdbbbbbcbbcbbbbffcccccccccccccc7ccccccccccccccc3b54bdcccccccccc0cbbbbcbccccccebeeeebbbbceccfcffecdbebbbbbbbbbbbbbbbdbbdbbdebbbbcbbcbbbbfccccccccccccccc7ccccccccccccccc4d74d5cccccccccc0ccbbbcccccccccceeeebbebccccfcffecdbebdbbbbbbbbbbbbbbbbbebdebbbbcbbcbbbbcccccccccccc777777cccccccccccccc4366d6cbcccccccc0cbbbbcccbccccccecbeeebbceccfcfcccddbbdbbbbbbbbbbbbbbbebbbbbbbbbcbbcbbbbcccccccccccc777777ccccccccccccbc736676cbcccccccb0cbbbbccccccccccccbbbbbbceccccffecddbbdbbdbbbbbbbbbbcbbcbbbbbbbbcbbcbbdbcccccccccccccccc77ccccccccccccbcb4a666cdcccccccb0cbccbcbcccccccceceebbbccecccccfecdddbdbbdbbbdbbbbbbcbccbbbbbdbbcbbcdbddcccc7cccccccccccccccccccccccccdc64aa6acdcccccccc0cbbbbbcccccccbceebeeebbceccccccecdddbdbbdbbbdbbbbcbbbbbbbbdbbbbccbbdbddccccccccccccccccccccccccccccccdc64ba6acdcccccccc0cbbcbbcccccceccecbbeebbebccccccecdbddddbdebddedbbeebebbbbbbbbbbccbbdbddcccccccccccccccccccccccccccccc3c644a6acdccccccbc0bbbcbccccccccccecbeebeebeccccccccbeddddbdcbdbbdeeeebebbdbbbbbbbbcbbddddcccc7cccccccccccccccccccccccccbbb4766bc9ccccccbb0bbbcbccccbbccccccbebeeecccccecbccccdbddbdcbdcbdeeeebedbbdbbbbbbbbddddbdccccccccccccccccccccccccbccbccbc74b66bc9ccccccbc0bbccccccccccccccceecbbeccccccccccccccecbbcbbfddebeebeddbdbbbbbbbbddddbdcccc77ccccccccccccccccccbcbbccdb4a446ac9ccccccbc0bbbcccccccbcccceccebeecceccceccccfccfecbecbffdbbdeebeddbbbbbcbbbbddddbdcccccccccccccccccccccccbbbbbccdb4a446abdbbccccbb0bbbcccccccbccccccebbcbececccccccccceceebecbffdcbdeeeecbbbcbccbcddddddbdccccccccccccccccccccccccbbbbbbbbbbbb6abbbbbbbbbb0bbbcccbccccccccccbbeeebccceecccccbeeeeebccbffdcddebeecbccccccdbddddddbdcccc7cccccccccccccbcbcccccbcbbbbadab9abbbbbbbbbb0bcbccbcccbcccccecebcbebcceceecccebeeecebccbffdfddbdeebcccccbcdbddddddbdcccc77ccccccccccccbbbbcbccccbbbbadaad6bbbbbbbbbb0bcbcbccccbbbbccccbbbbbbccccecccc7eceeeebccbffbfddbdebbcccccbeddddddddbdccccccccccccccccbccccccccccccccc1b6bddbbbbbbbbbb0bcbcbccbbbbcbbcccbbbbbcccecccccc7bceebebcebffbfddddebccbbecbbbbddbbbdbbecccccccccccccccccccccccccccccccbc11ddccbbbbbbbb0bbcccccbbbbbbccbcbbbbbcccbcccccc7eebecebccbfcbfddddebcecccbccccccccecbeebee7eccccccccbbccccccccccccccccccccddcbbbbbbbbb0bbbccccbbbcccccccbcebecceccecccc7eebbcbbccbfcbfddddebbcccccccccccccccbeebee77ebbbbebbbbccbcccccccccccccccccdbcbbbbbbbbb0bbbcbbcbcbbccbbeccbbbeecbcc7ccccebebbcebccbccccddddbdbeccccccccccccccbeebeeeeebbbbebbbbccbcccccccccccccccccdbcdbbbbbbbb0bbbcbbbbcbbcbbbbcccbbcecbebbccccebcbbcebcedccccdcddbdbbccccccccccccccbbebeeeeebbbbbbbbbccbeccccccccccccccccdccdbbbbbbbb0bbbbbccbbcccbcccbccbbccccebbdceccbcebcebcedccccdcddddbbbccccbccccccccbbebeeeeeebbbbbbbbccbcccccccccccccccccdccdbbbbbbbb0bbbbbbbbbbccbccccccbbcb9bb9b6ccceecbececccbccccdcddbdbdbbccccccccccccbebbee77ecbbebbbbbccecccccccccccccccccdcbdbbbbbbbb0bcbbbcbbccbccccccccebcc69d6b6ccc7eebecbccbbccccbcdddbbdbbcbbbccccccccbbebee77bcbbebbbbbccbcccccccccccccccccbcddbbbbbbbb0bbbbbcbbbbbccbccbccecbb66d9cbcccceebbcecbebccccccdddddddbcbbccbccccccbcbbee77ecbbbbbbbbccbcccccccccccccccccccddbcbbbbbb0bbbbbcbcbbcccbccbcebcbc66bbebcccecbbececbbbccccccdbddddbbbbbccbccccccbccbeeecccbbbbbbbbccbcccccccccccccccccccddbcbbbbbb0bbbbbbbccccccccbbcbbc6b666bebccc7eeebccccbbccccccdcddddbbbdbccbccccccbccbcee7ccbbbbbbbbcbbcccccccccccccccccccddbbdbbbbb0bbbbbbbbcccbcccbbcbbc9b966bbbccceeceeeebcbbccccccdcdddddbbdbcbbccccccbbbbcec7ccbbbbbbbbcbeccbccccccccccccccccdbbbdbbbbb0bbbbbbbbbbccccbbbbbbb9bb6bcc9cce7eeebcbbbbdccccccbcdddddddbbbcbccccccbcbbcec7ccbbbbbbbbcbcccbccccccccccccccccdbbbdbbbbb0bbbbbbbcbbbccbbbbbccb9cb69b79ccceeebbbbbbbbccccccccddddddbdbbbdcbccccbbbbceccccbcbbbbbbcbcccbcccccccccccccccc1cbbbbbbbb0bbbbbbbbbbcbbbbbbbbccbcb99bcbccceeeeeebbcbbccccccccdbddddddbbbdcbccccbcbbceccccbcbbbbbbcbbccbccccccccccccccccbbbcbbbbbd0bbbbbbbbbbbbbcbbbcbccbc6d69ebcccebceebbbebbccccccccdcddddddbbbdcbccccbcbbceccccccbbbbbbcbbccbccccccccccccccccbbbbbbbbbb0dbbbbbbbbbbbbcbbcbcccdcbb99ccccebbceceebbbbccccccccccddddddbddbcbccccbcbbcbccccccbbbbbbcbbcbbccccccccccccccccbbbbbbbbbb0bbbbbbbbbbbbbbbbbbcccbb96b9cccccbbebcebcbbbccccccccccdbddddbddbcbccccbbbbceccccccbebbbbcbccccccccccccccccccccbbbbbbbbbb0bbbbbbbbbbbbbbcbcbccc6bdbcdbccccbbcbbebcebbccccccccccdcdddddddbcbccccbcbbcbccccccbcbbbbcbccccccccccccccccccbcbbbbbbbbbb0bbbbbbbbbbbbbbbbbbcbb6bcbcbbbccbbbcbbbbccbbccccccccccbcddddddddcbcccbbcbbccccccccbcbbbbcbcccbccccccccccccbcbcbbbbbbbbbb0bbbbbbbbbbbbbbbbbbbbbbbbcbb7bcccbbcbbbbccbbccccccccccccdddbddddcbccccbcbbccccccccbcbbbbbbcccbccccccccccccbbbcbbbbbbbbdb0dbbbbbbbbbbbbbbbbbbbcbbbbcb7bccbbbbebbecbbbccccccccccccddbdddddcbccccbcbbccccccccbcbbbbbbcccbccccccccccccbbbbbbbbdbddbb0dbbbbbbbbbbbbbbbbbbbcbbbcbbbbccbebcbbbbbbbdccccccccccccdbddbbddcbccccbbbbcbccccccbcbbbbbbcccbccccccccccccccbbbbbbddbdbb0dbbbbbbbbbbbbbbbbbbcccbcccbbbccbbbcbebbbbbdccccccccccccdcddddddcdccccccbbceccccccccbbbbbbccbbccccccccccccbcbbbbbbddbdbb0dbbbbbdbbbbbbbbbbbbbbbbbccbbbccbbccebbbbbbdcbccccccccccbcddddddcdccccbbbbcbccccccccbbbbbbccbbccccccccccccbbbbbbbbddddbb0dbbbbbbbbbbbbbbbbbbbbbcbcbbbbcbbbbcebbbcbbbcbccccccccccccddddddcdccbcbcbbcbccccccccbbbbbbccbbccccccccccccbbbbbbbbddddbd0bbbbbdbbbbbbbbbbbbbbbbbbcbbdbcbbbbbbdbdbbdbcbcccccccccceeddddddcdccbcbbbbcbccccccccbbbbbbccbcccccccccccbcbbbbbbbbdddddd0b`);
}
music.setVolume(200)
scene.setBackgroundImage(projectImages.pongItroBg_160x120)
music2()
game.showLongText("아타리 [Pong]. A버튼을 누르세요.", DialogLayout.Bottom)
drawBackground()
initialize()
startRound()
game.onUpdate(function () {
    if (inCountdown == 0) {
        if (needsReset == 1) {
            needsReset = 0
            inCountdown = 1
            countdown = 3
            startRound()
        }
        testBall()
        // Only move AI player if ball is moving toward AI.
        if (ball.vx > 0) {
            updatePlayer2()
        }
    } else {
        if (game.runtime() >= nextCountdown) {
            runCountdown()
        }
    }
})

