import { Component, Prop, h } from '@stencil/core'
import { MatchResults } from '@stencil/router';

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.scss',
  shadow: false
})

export class AppHome {

  @Prop() match: MatchResults
  @Prop() value: string = ''
  @Prop() disabled: boolean = true

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
    this.disabled = this.value.split(' ').length <= 1;
  }

  copyToClipboard(event) {
    event.preventDefault()

    this.value = this.value + '\n\nPowered by ' + location.protocol + '//' + location.hostname + '/'

    if (!navigator.clipboard) {
      // okay, we have to use an workaround,
      // because navigator.clipboard is not available
      const el = document.createElement('textarea')
      el.value = this.value
      el.setAttribute('readonly', '')
      el.style.position = 'absolute'
      el.style.left = '-9999px'
      document.body.appendChild(el)
      const selected = document.getSelection().rangeCount > 0 ? document.getSelection().getRangeAt(0) : false
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
      if (selected) {
        document.getSelection().removeAllRanges()
        document.getSelection().addRange(selected)
      }
    } else {
      // we have navigator.clipboard available
      navigator.clipboard.writeText(this.value).then(() => {
        console.info('Async: Copying to clipboard was successful!')
      }, (err) => {
        console.error('Async: Could not copy text: ', err)
      })
    }
  }

  render() {
    return (
      <form>
        <label>Your text</label>
        <textarea name='text' placeholder='Type text here...' onInput={event => this.handleChange(event)} value={this.value}>{this.value}</textarea>
        <div>
          <div class='float-left'>
            <p>Enter your text.<br/>click "Shake it!".<br/>Then "Copy that!".<br/>Have fun!</p>
          </div>
          <div class='float-right'>
            <div class='align-right'>
              <button onClick={event => this.handleSubmit(event)} disabled={this.disabled}>Shake it!</button>
            </div>
            <div class='align-right'>
              <button onClick={event => this.copyToClipboard(event)} disabled={this.disabled}>Copy that!</button>
            </div>
          </div>
          <div class='clearfix'></div>
        </div>
      </form>
    );
  }
}
