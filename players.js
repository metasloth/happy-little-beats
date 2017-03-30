
// Let the API take control of the players
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

// These functions are basicaly a heartbeat to make sure the API
// is working during developement
function onBobPlayerReady (event) {
  console.log('ayy I see bob')
  document.getElementById('bob-player').style.borderColor = 'white'
}
function onBobPlayerStateChange (event) {
  changeBorderColor(event.data, 'bob-player')
}
function onMusicPlayerReady (event) {
  console.log('ayy I see music')
  document.getElementById('music-player').style.borderColor = 'white'
  musicPlayer.setVolume(20)
}
function onMusicPlayerStateChange (event) {
  changeBorderColor(event.data, 'music-player')
}

// Color Changer
function changeBorderColor (playerStatus, player) {
  var color
  if (playerStatus == -1) {
    color = 'white'; // unstarted = gray
  } else if (playerStatus == 0) {
    color = 'white'; // ended = yellow
  } else if (playerStatus == 1) {
    color = 'black'; // playing = black
  } else if (playerStatus == 2) {
    color = 'white'; // paused = red
  } else if (playerStatus == 3) {
    color = 'white'; // buffering = purple
  } else if (playerStatus == 5) {
    color = 'white'; // video cued = orange
  }
  if (color) {
    document.getElementById(player).style.borderColor = color
  }
}

// Master mute button functionality
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

// Master play/pause button functionality
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

// Volume mixing
let masterVolume = 100
let mixVolume = 20
function volumeChange (value) {
  masterVolume = value
  updateVolumes()
  document.getElementById('volume').innerHTML = `${masterVolume}%`
}
function mixChange (value) {
  mixVolume = value
  updateVolumes()
  document.getElementById('mix').innerHTML = `${100-value}% / ${value}%`
}
function updateVolumes() {
  bobPlayer.setVolume( (100-mixVolume) * (masterVolume * 0.01) )
  musicPlayer.setVolume( mixVolume * (masterVolume * 0.01))
}

