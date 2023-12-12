// No overview at startup
// https://github.com/fthx/no-overview

import * as Main from 'resource:///org/gnome/shell/ui/main.js'

const share = {}

const enable = () => {
  if (!Main.layoutManager._startingUp) {
    return
  }
  Main.layoutManager.connectObject(
    'startup-complete',
    () => Main.overview.hide(),
    share
  )
}

const disable = () => {
  Main.layoutManager.disconnect(share)
}

export default { enable, disable }
