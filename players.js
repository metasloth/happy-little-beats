// API Reference
let tag = document.createElement('script')
tag.id = 'iframe-demo'
tag.src = 'https://www.youtube.com/iframe_api'
let firstScriptTag = document.getElementsByTagName('script')[0]
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)

// Bob Ross Player
let bobPlayer
let musicPlayer
function onYouTubeIframeAPIReady () {
  musicPlayer = new YT.Player('music-player', {
    events: {
      'onReady': onMusicPlayerReady,
      'onStateChange': onMusicPlayerStateChange
    }
  })
  bobPlayer = new YT.Player('bob-player', {
    events: {
      'onReady': onBobPlayerReady,
      'onStateChange': onBobPlayerStateChange
    }
  })
}
function onBobPlayerReady (event) {
  console.log('ayy I see bob')
  document.getElementById('bob-player').style.borderColor = '#FF6D00'
}
function onBobPlayerStateChange (event) {
  changeBorderColor(event.data, 'bob-player')
}
function onMusicPlayerReady (event) {
  console.log('ayy I see music')
  document.getElementById('music-player').style.borderColor = '#FF6D00'
  musicPlayer.setVolume(17)
}
function onMusicPlayerStateChange (event) {
  changeBorderColor(event.data, 'music-player')
}

// Color Changer
function changeBorderColor (playerStatus, player) {
  var color
  if (playerStatus == -1) {
    color = '#37474F'; // unstarted = gray
  } else if (playerStatus == 0) {
    color = '#FFFF00'; // ended = yellow
  } else if (playerStatus == 1) {
    color = '#33691E'; // playing = green
  } else if (playerStatus == 2) {
    color = '#DD2C00'; // paused = red
  } else if (playerStatus == 3) {
    color = '#AA00FF'; // buffering = purple
  } else if (playerStatus == 5) {
    color = '#FF6DOO'; // video cued = orange
  }
  if (color) {
    document.getElementById(player).style.borderColor = color
  }
}

let muted = false
function muteAll () {
  if (muted) {
    bobPlayer.unMute()
    musicPlayer.unMute()
    muted = false
    document.getElementById('muteButton').innerHTML = 'mute'
  } else {
    bobPlayer.mute()
    musicPlayer.mute()
    muted = true
    document.getElementById('muteButton').innerHTML = 'unmute'
  }
}

function playPause () {
  if (bobPlayer.getPlayerState() == 1) {
    bobPlayer.pauseVideo()
    musicPlayer.pauseVideo()
    document.getElementById('playPauseButton').innerHTML = 'play'
  } else {
    bobPlayer.playVideo()
    musicPlayer.playVideo()
    document.getElementById('playPauseButton').innerHTML = 'pause'
  }
}

function mixChange (value) {
  bobPlayer.setVolume(100-value)
  musicPlayer.setVolume(value)
  document.getElementById('rangeValue').innerHTML = `${100-value}% / ${value}%`
}
