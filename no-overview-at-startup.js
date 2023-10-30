// No overview at startup
// https://github.com/fthx/no-overview

import * as Main from 'resource:///org/gnome/shell/ui/main.js'

const share = { _realHasOverview: Main.sessionMode.hasOverview }

const enable = () => {
  if (!Main.layoutManager._startingUp) {
    return
  }
  Main.sessionMode.hasOverview = false
  share._startup_complete = Main.layoutManager.connect('startup-complete', () => {
    Main.sessionMode.hasOverview = share._realHasOverview
  })
}

const disable = () => {
  Main.sessionMode.hasOverview = share._realHasOverview
  Main.layoutManager.disconnect(share._startup_complete)
}

export default { enable, disable }
