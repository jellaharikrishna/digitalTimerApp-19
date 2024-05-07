import {Component} from 'react'
import './index.css'

const playIcon = 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
const pauseIcon = 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'

const initialState = {inMinutes: 25, inSeconds: 0, isTimerRunning: false}

class DigitalTimer extends Component {
  state = initialState

  componentWillUnmount() {
    this.clearTimerInterval()
  }

  clearTimerInterval = () => clearInterval(this.timerID)

  incrementTimerInterval = () => {
    const {inMinutes, inSeconds} = this.state
    const isTimerCompleted = inSeconds === inMinutes * 60

    if (isTimerCompleted) {
      this.clearTimerInterval()
      this.setState({isTimerRunning: false})
    } else {
      this.setState(prevState => ({inSeconds: prevState.inSeconds + 1}))
    }
  }

  onClickStartOrPauseBtn = () => {
    const {isTimerRunning, inMinutes, inSeconds} = this.state
    const isTimerCompleted = inSeconds === inMinutes * 60

    if (isTimerCompleted) {
      this.setState({inSeconds: 0})
    }

    if (isTimerRunning) {
      this.clearTimerInterval()
    } else {
      this.timerID = setInterval(this.incrementTimerInterval, 1000)
    }
    this.setState({isTimerRunning: !isTimerRunning})
  }

  onClickResetBtn = () => {
    this.clearTimerInterval()
    this.setState(initialState)
  }

  onClickDecrementBtn = () => {
    const {inMinutes} = this.state
    if (inMinutes > 0) {
      this.setState(prevState => ({inMinutes: prevState.inMinutes - 1}))
    }
  }

  onClickIncrementBtn = () => {
    this.setState(prevState => ({inMinutes: prevState.inMinutes + 1}))
  }

  getElapsedSecondsInTimeFormat = () => {
    const {inMinutes, inSeconds} = this.state
    const totalremainingSeconds = inMinutes * 60 - inSeconds
    const minutes = Math.floor(totalremainingSeconds / 60)
    const seconds = Math.floor(totalremainingSeconds % 60)
    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSecond = seconds > 9 ? seconds : `0${seconds}`

    return `${stringifiedMinutes}:${stringifiedSecond}`
  }

  render() {
    const {inMinutes, inSeconds, isTimerRunning} = this.state
    const status = isTimerRunning ? 'Running' : 'Paused'
    const iconImgUrl = isTimerRunning ? pauseIcon : playIcon
    const altText = isTimerRunning ? 'pause icon' : 'play icon'
    const startPause = isTimerRunning ? 'Pause' : 'Start'

    const isButtonsDisabled = inSeconds > 0

    return (
      <div className="app-container">
        <h1 className="timer-heading">Digital Timer</h1>
        <div className="timer-container">
          <div className="timer-bg-img">
            <div className="display-timer">
              <h1 className="timer">{this.getElapsedSecondsInTimeFormat()}</h1>
              <p className="status">{status}</p>
            </div>
          </div>
          <div className="timer-text-content">
            <div className="start-reset-container">
              <button
                type="button"
                className="btn-transparent"
                onClick={this.onClickStartOrPauseBtn}
              >
                <img className="icon" src={iconImgUrl} alt={altText} />
                <p className="start-reset-heading">{startPause}</p>
              </button>
              <button
                type="button"
                className="btn-transparent"
                onClick={this.onClickResetBtn}
              >
                <img
                  className="icon"
                  src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                  alt="reset icon"
                />
                <p className="start-reset-heading">Reset</p>
              </button>
            </div>
            <p className="timer-limit-heading">Set Timer Limit</p>
            <div className="plus-minus-card">
              <button
                className="plus-minus-heading"
                type="button"
                onClick={this.onClickDecrementBtn}
                disabled={isButtonsDisabled}
              >
                -
              </button>
              <p className="minutes">{inMinutes}</p>
              <button
                className="plus-minus-heading"
                type="button"
                onClick={this.onClickIncrementBtn}
                disabled={isButtonsDisabled}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
