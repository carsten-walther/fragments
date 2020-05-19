import { Component, h } from '@stencil/core';


@Component({
  tag: 'app-root',
  styleUrl: 'app-root.scss',
  shadow: false
})

export class AppRoot {

  render() {
    return (
      <div class='container'>
        <header>
          <h1 class='align-center'>Fragments</h1>
        </header>
        <main>
          <stencil-router>
            <stencil-route-switch scrollTopOffset={0}>
              <stencil-route url='/' component='app-home' exact={true} />
            </stencil-route-switch>
          </stencil-router>
        </main>
        <footer>
          <p class='align-center'>© 2020 | Made with ♥ by Carsten Walther.</p>
        </footer>
      </div>
    );
  }
}
