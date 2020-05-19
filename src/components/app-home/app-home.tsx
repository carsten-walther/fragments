import { Component, Prop, State, h } from '@stencil/core'
import Shake from 'shake.js'


@Component({
  tag: 'app-home',
  styleUrl: 'app-home.scss',
  shadow: false
})

export class AppHome {

  @Prop() value: string = ''
  @Prop() disabled: boolean = true

  @State() shakeEvent: Shake = null

  componentWillLoad() {
    // https://github.com/alexgibson/shake.js
    this.shakeEvent = new Shake({
      //threshold: 15, // optional shake strength threshold
      //timeout: 1000 // optional, determines the frequency of event generation
    }).start()

    window.addEventListener('shake', this.shakeEventDidOccur, false);
  }

  shakeEventDidOccur() {
    alert('shake!')
  }

  shakeWords(words) {
    let array = words.split(' ')
    let currentIndex = array.length
    let temporaryValue = null
    let randomIndex = null

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex -= 1
      // And swap it with the current element.
      temporaryValue = array[currentIndex]
      array[currentIndex] = array[randomIndex]
      array[randomIndex] = temporaryValue
    }

    return array.join(' ')
  }

  handleSubmit(event) {
    event.preventDefault()
    this.value = this.shakeWords(this.value)
  }

  handleChange(event) {
    event.preventDefault()
    this.value = event.target.value;
    this.disabled = true
    if (this.value.split(' ').length > 1) {
      this.disabled = false
    }
  }

  copyToClipboard(event) {
    event.preventDefault()

    if (!navigator.clipboard) {
      alert(this.value)
      return;
    }

    navigator.clipboard.writeText(this.value).then(() => {
      console.log('Async: Copying to clipboard was successful!')
    }, (err) => {
      console.error('Async: Could not copy text: ', err)
    })
  }

  render() {
    return (
      <form>
        <label>Your text</label>
        <textarea name='text' placeholder='Type text here...' onInput={event => this.handleChange(event)} value={this.value}>{this.value}</textarea>
        <div class='align-right'>
          <button onClick={event => this.handleSubmit(event)} disabled={this.disabled}>Shake it!</button>
        </div>
        <div class='align-right'>
          <button onClick={event => this.copyToClipboard(event)} disabled={this.disabled}>Copy that!</button>
        </div>
      </form>
    );
  }
}
