import { Component, Prop, h } from '@stencil/core';


@Component({
  tag: 'app-root',
  styleUrl: 'app-root.scss',
  shadow: false
})

export class AppRoot {

  @Prop() requestPermission: boolean = false

  componentWillLoad() {
    if (typeof DeviceOrientationEvent.requestPermission === 'function') {
      this.requestPermission = true
    } else {
      this.requestPermission = false
    }
  }

  requestOrientationPermission() {
    DeviceOrientationEvent.requestPermission()
      .then(response => {
        if (response === 'granted') {
          this.requestPermission = false
          window.addEventListener('deviceorientation', () => {
            // do something with e
          })
        }
      })
      .catch(console.error)
  }

  render() {
    return (
      <div class='container'>
        <header>
          <h1>Fragments</h1>
        </header>
        <main>
          <div class='align-center' style={{
            'display': this.requestPermission ? 'block' : 'none'
          }}>
            <button onClick={() => this.requestOrientationPermission()}>Request orientation permission</button>
          </div>
          <div class='align-center' style={{
            'display': !this.requestPermission ? 'block' : 'none'
          }}>
            <stencil-router>
              <stencil-route-switch scrollTopOffset={0}>
                <stencil-route url='/' component='app-home' exact={true} />
              </stencil-route-switch>
            </stencil-router>
          </div>
        </main>
        <footer class='align-center'>
          <p>© 2020 | Made with ♥ by Carsten Walther.</p>
        </footer>
      </div>
    );
  }
}
