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
  @Prop() uuid: string = ''
  @Prop() original: string = ''
  @Prop() disabled: boolean = true

  componentDidLoad() {
    if (this.match.params.uuid) {
      this.value = this.getText(this.match.params.uuid)
    }
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

    this.original = this.value
    this.value = this.shakeWords(this.original)
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

    if (this.original) {
      this.setText(this.original)
    }

    this.value = this.value + '\n\nPowered by ' + location.protocol + '//' + location.hostname + '/' + this.uuid

    if (!navigator.clipboard) {
      alert('Sorry, copy to clipboard not available in your browser!')
    } else {
      navigator.clipboard.writeText(this.value).then(() => {
        console.info('Async: Copying to clipboard was successful!')
      }, (err) => {
        console.error('Async: Could not copy text: ', err)
      })
    }
  }

  setText(text) {
    let url = new URL(location.protocol + '//' + location.hostname + '/assets/php/storage.php')
    let params = { text: text }

    fetch(url.href, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify(params)
    }).then(data => data.json()).then((data) => {
      this.uuid = data.uuid
      console.log('request succeeded with JSON response', data)
    }).catch(function (error) {
      console.log('request failed', error)
    })
  }

  getText(uuid) {
    let text = ''

    let url = new URL(location.protocol + '//' + location.hostname + '/assets/php/storage.php')
    let params = { uuid: uuid }

    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))

    fetch(url.href, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'GET',
      body: ''
    }).then(data => data.json()).then((data) => {
      text = data.text
      console.log('request succeeded with JSON response', data)
    }).catch(function (error) {
      console.log('request failed', error)
    })

    return text
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
