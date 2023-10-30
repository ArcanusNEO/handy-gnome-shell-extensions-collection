import extendLeftBox from './extend-left-box.js'
import fripperyMoveClock from './frippery-move-clock.js'
import noOverviewAtStartup from './no-overview-at-startup.js'
import notificationPosition from './notification-position.js'
import removeWindowIsReady from './remove-window-is-ready.js'

const moduleList = [
  extendLeftBox,
  fripperyMoveClock,
  noOverviewAtStartup,
  notificationPosition,
  removeWindowIsReady
]

export default class HandyExtensionsCollection {
  enable() {
    for (const mod of moduleList) {
      mod.enable()
    }
  }

  disable() {
    for (const mod of moduleList) {
      mod.disable()
    }
  }
}
