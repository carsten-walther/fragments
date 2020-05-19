import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.scss',
  shadow: false
})

export class AppHome {

  @Prop() value: string

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
        <label class='align-center'>Your text</label>
        <textarea name='text' placeholder='Type text here...' onInput={event => this.handleChange(event)} value={this.value}>{this.value}</textarea>
        <div class='align-center'>
          <button onClick={event => this.handleSubmit(event)}>Shake it!</button>
          <button onClick={event => this.copyToClipboard(event)}>Copy that!</button>
        </div>
      </form>
    );
  }
}
