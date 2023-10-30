// Remove "Window Is Ready" notification
// https://github.com/nunofarruca/WindowIsReady_Remover

import * as Main from 'resource:///org/gnome/shell/ui/main.js'
import GObject from 'gi://GObject'

const blockSignal = (id) => {
  const signalId = GObject.signal_handler_find(global.display, { signalId: id })
  GObject.signal_handler_block(global.display, signalId)
}
const unblockSignal = (id) => {
  const signalId = GObject.signal_handler_find(global.display, { signalId: id })
  GObject.signal_handler_unblock(global.display, signalId)
}
const enable = () => {
  blockSignal('window-demands-attention')
  blockSignal('window-marked-urgent')
}
const disable = () => {
  if (Main.sessionMode.isLocked) {
    return
  }
  unblockSignal('window-demands-attention')
  unblockSignal('window-marked-urgent')
}

export default { enable, disable }
