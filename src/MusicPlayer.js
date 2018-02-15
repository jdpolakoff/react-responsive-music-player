import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './MusicPlayer.css'

class MusicPlayer extends Component {

  static propTypes = {
    autoplay: PropTypes.bool,
    progressColor: PropTypes.string,
    btnColor: PropTypes.string,
    playlist: PropTypes.array.isRequired,
    style: PropTypes.object,
  }

  static defaultProps = {
    autoplay: false,
    progressColor: '#ce3010',
    btnColor: '#4a4a4a',
    playlist: [],
    style: {},
  }

  constructor(props) {
    super(props)
    this.state = {
      activeMusicIndex: 0,
      leftTime: 0,
      play: this.props.autoplay || false,
      playMode: 'loop',
      progress: 0,
      volume: 1,
      playlist: []
    }
    this.modeList = ['loop', 'random', 'repeat']
  }

  componentDidMount() {
    const audioContainer = this.audioContainer
    audioContainer.addEventListener('timeupdate', this.updateProgress.bind(this))
    audioContainer.addEventListener('ended', this.end.bind(this))
    this.checkForMatch()
  }

  checkForMatch(){
    const activeMusic = this.props.playlist[this.state.activeMusicIndex]
    var playlist = this.props.playlist.map((song)=> {
      if (song.artist.length >= 2 && song.title === activeMusic.title) {
        return (
          <div>
            <h2 className="nowPlaying">{this._processArtistName(song.artist)} - {song.title}</h2>
          </div>
        )
      } else if (song.artist.length >= 2 && song.title !== activeMusic.title) {
        return (
          <div>
            <h2>{this._processArtistName(song.artist)} - {song.title}</h2>
          </div>
        )
      }
      if (song.artist.length === 1 && song.title === activeMusic.title) {
        return (
          <div>
            <h2 className="nowPlaying">{song.artist} - {song.title}</h2>
          </div>
        )
      } else if (song.artist.length === 1 && song.title !== activeMusic.title) {
        return (
          <div>
            <h2>{song.artist} - {song.title}</h2>
          </div>
        )
      }
    })
    this.setState({ playlist: playlist })
  }

  checkForRandom(randomIndex){
    const activeMusic = this.props.playlist[randomIndex]
    var playlist = this.props.playlist.map((song)=> {
      if (song.artist.length >= 2 && song.title === activeMusic.title) {
        return (
          <div>
            <h2 className="nowPlaying">{this._processArtistName(song.artist)} - {song.title}</h2>
          </div>
        )
      } else if (song.artist.length >= 2 && song.title !== activeMusic.title) {
        return (
          <div>
            <h2>{this._processArtistName(song.artist)} - {song.title}</h2>
          </div>
        )
      }
      if (song.artist.length === 1 && song.title === activeMusic.title) {
        return (
          <div>
            <h2 className="nowPlaying">{song.artist} - {song.title}</h2>
          </div>
        )
      } else if (song.artist.length === 1 && song.title !== activeMusic.title) {
        return (
          <div>
            <h2>{song.artist} - {song.title}</h2>
          </div>
        )
      }
    })
    this.setState({ playlist: playlist })
  }


checkForMatchPrev(){
  if (this.state.activeMusicIndex > 0) {
    var prevSong = this.props.playlist[this.state.activeMusicIndex - 1]
  } else {
    var prevSong = this.props.playlist[this.props.playlist.length - 1]
  }
  var playlist = this.props.playlist.map((song)=> {
    if (song.artist.length >= 2 && song.title === prevSong.title) {
      return (
        <div>
          <h2 className="nowPlaying">{this._processArtistName(song.artist)} - {song.title}</h2>
        </div>
      )
    } else if (song.artist.length >= 2 && song.title !== prevSong.title) {
      return (
        <div>
          <h2>{this._processArtistName(song.artist)} - {song.title}</h2>
        </div>
      )
    }
    if (song.artist.length === 1 && song.title === prevSong.title) {
      return (
        <div>
          <h2 className="nowPlaying">{song.artist} - {song.title}</h2>
        </div>
      )
    } else if (song.artist.length === 1 && song.title !== prevSong.title) {
      return (
        <div>
          <h2>{song.artist} - {song.title}</h2>
        </div>
      )
    }
  })
  this.setState({ playlist: playlist })
}

clearMatches(){
  var playlist = this.props.playlist.map((song)=> {
    if (song.artist.length >= 2) {
      return (
        <div>
          <h2>{this._processArtistName(song.artist)} - {song.title}</h2>
        </div>
      )
    }
    if (song.artist.length === 1) {
      return (
        <div>
          <h2>{song.artist} - {song.title}</h2>
        </div>
      )
    }
  })
  this.setState({ playlist: playlist })
}

checkForMatchNext(){
  if (this.state.activeMusicIndex === this.props.playlist.length - 1) {
    var nextSong = this.props.playlist[0]
  } else {
    var nextSong = this.props.playlist[this.state.activeMusicIndex + 1]
  }
  var playlist = this.props.playlist.map((song)=> {
    if (song.artist.length >= 2 && song.title === nextSong.title) {
      return (
        <div>
          <h2 className="nowPlaying">{this._processArtistName(song.artist)} - {song.title}</h2>
        </div>
      )
    } else if (song.artist.length >= 2 && song.title !== nextSong.title) {
      return (
        <div>
          <h2>{this._processArtistName(song.artist)} - {song.title}</h2>
        </div>
      )
    }
    if (song.artist.length === 1 && song.title === nextSong.title) {
      return (
        <div>
          <h2 className="nowPlaying">{song.artist} - {song.title}</h2>
        </div>
      )
    } else if (song.artist.length === 1 && song.title !== nextSong.title) {
      return (
        <div>
          <h2>{song.artist} - {song.title}</h2>
        </div>
      )
    }
  })
  this.setState({ playlist: playlist })
}

  componentWillUnmount() {
    const audioContainer = this.audioContainer
    audioContainer.removeEventListener('timeupdate', this.updateProgress.bind(this))
    audioContainer.removeEventListener('ended', this.end.bind(this))
  }


  updateProgress() {
    const duration = this.audioContainer.duration
    const currentTime = this.audioContainer.currentTime
    const progress = currentTime / duration
    this.setState({
      progress: progress,
      leftTime: duration - currentTime
    })
  }

  end() {
    this.handleNext()
  }

  handleAdjustProgress(e) {
    const progressContainer = this.progressContainer
    const progress = (e.clientX - progressContainer.getBoundingClientRect().left) / progressContainer.clientWidth
    const currentTime = this.audioContainer.duration * progress
    this.audioContainer.currentTime = currentTime
    this.setState({
      play: true,
      progress: progress
    }, () => {
      this.audioContainer.play()
    })
  }

  handleAdjustVolume(e) {
    const volumeContainer = this.volumeContainer
    let volume = (e.clientX - volumeContainer.getBoundingClientRect().left) / volumeContainer.clientWidth
    volume = volume < 0 ? 0 : volume
    this.audioContainer.volume = volume
    this.setState({
      volume: volume
    })
  }

  handleToggle() {
    this.state.play ? this.audioContainer.pause() : this.audioContainer.play()
    this.setState({ play: !this.state.play })
    if (this.state.play !== false){
      this.clearMatches()
    } else {
      this.checkForMatch()
    }
  }

  handlePrev() {
    const { playMode, activeMusicIndex } = this.state
    if (playMode === 'repeat') {
      this._playMusic(activeMusicIndex)
      this.checkForMatch()
    } else if (playMode === 'loop') {
      const total = this.props.playlist.length
      const index = activeMusicIndex > 0 ? activeMusicIndex - 1 : total - 1
      this._playMusic(index)
      this.checkForMatchPrev()
    } else if (playMode === 'random') {
      let randomIndex = Math.floor(Math.random() * this.props.playlist.length)
      while (randomIndex === activeMusicIndex) {
        randomIndex = Math.floor(Math.random() * this.props.playlist.length)
      }
      this._playMusic(randomIndex)
      this.checkForRandom(randomIndex)
    } else {
      this.setState({ play: false })
    }
  }

  handleNext() {
    const { playMode, activeMusicIndex } = this.state
    if (playMode === 'repeat') {
      this._playMusic(activeMusicIndex)
      this.checkForMatch()
    } else if (playMode === 'loop') {
      const total = this.props.playlist.length
      const index = activeMusicIndex < total - 1 ? activeMusicIndex + 1 : 0
      this._playMusic(index)
      this.checkForMatchNext()
    } else if (playMode === 'random') {
      let randomIndex = Math.floor(Math.random() * this.props.playlist.length)
      while (randomIndex === activeMusicIndex) {
        randomIndex = Math.floor(Math.random() * this.props.playlist.length)
      }
      this._playMusic(randomIndex)
      this.checkForRandom(randomIndex)
    } else {
      this.setState({ play: false })
    }
  }

  handleChangePlayMode() {
    let index = this.modeList.indexOf(this.state.playMode)
    index = (index + 1) % this.modeList.length
    this.setState({ playMode: this.modeList[index] })
  }

  _playMusic(index) {
    this.setState({
      activeMusicIndex: index,
      leftTime: 0,
      play: true,
      progress: 0
    }, () => {
      this.audioContainer.currentTime = 0
      this.audioContainer.play()
    })
    this.checkForMatch()
  }

  _formatTime(time) {
    if (isNaN(time) || time === 0) {
      return
    }
    const mins = Math.floor(time / 60)
    const secs = (time % 60).toFixed()
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`
  }

  _processArtistName(artistList) {
    return artistList.join(' / ')
  }

  render() {
    const { progressColor, btnColor, playlist } = this.props
    const { activeMusicIndex, playMode } = this.state
    const activeMusic = playlist[activeMusicIndex]
    const playModeClass = playMode === 'loop' ? 'refresh' : playMode === 'random' ? 'random' : 'repeat'
    const btnStyle = { color: btnColor }
    const progressStyle = { width: `${this.state.progress * 100}%`, backgroundColor: progressColor }

    return (
      <div>
      <div className="player-container" style={this.props.style}>
        <audio
          autoPlay={this.state.play}
          preload="auto"
          ref={ref => { this.audioContainer = ref }}
          src={activeMusic.url}
        />
        <div className="info-and-control">
          <div className="music-info">
            <h2 className="title">{activeMusic.title}</h2>
            <h3 className="artist">{this._processArtistName(activeMusic.artist)}</h3>
          </div>
          <div className="time-and-volume">
            <div className="left-time">-{this._formatTime(this.state.leftTime)}</div>
            <div className="volume-container">
              <div className="volume-icon">
                <i className="icon fa fa-volume-up"></i>
              </div>
              <div className="volume-wrapper">
                <div
                  className="progress-container"
                  onClick={this.handleAdjustVolume.bind(this)}
                  ref={ref => { this.volumeContainer = ref }}
                >
                  <div className="progress" style={{ width: `${this.state.volume * 100}%` }}></div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="progress-container"
            onClick={this.handleAdjustProgress.bind(this)}
            ref={(ref) => { this.progressContainer = ref }}
          >
            <div className="progress" style={progressStyle}></div>
          </div>
          <div className="control-container">
          <div className="mode-control">
              <i className={`icon fa fa-${playModeClass}`} style={btnStyle} onClick={this.handleChangePlayMode.bind(this)}></i>
            </div>
            <div className="controls">
              <i className="icon fa fa-step-backward" style={btnStyle} onClick={this.handlePrev.bind(this)}></i>
              <i className={`icon fa fa-${this.state.play ? 'pause' : 'play'}`} style={btnStyle} onClick={this.handleToggle.bind(this)}></i>
              <i className="icon fa fa-step-forward" style={btnStyle} onClick={this.handleNext.bind(this)}></i>
            </div>
          </div>
        </div>
        <div className="cover-container">
          <div className="cover" style={{ backgroundImage: `url(${activeMusic.cover})` }}></div>
        </div>
        </div>
        <div className="playlist">
          {this.state.playlist}
        </div>
      </div>
    )
  }
}

export default MusicPlayer
