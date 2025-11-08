// Remove "Window Is Ready" notification
// https://github.com/nunofarruca/WindowIsReady_Remover

import * as Main from 'resource:///org/gnome/shell/ui/main.js'
import GObject from 'gi://GObject'

const getSignalHandlerId = (signalId) => {
  return GObject.signal_handler_find(global.display, { signalId })
}
const blockSignal = (signalId) => {
  const signalHandlerId = getSignalHandlerId(signalId)
  GObject.signal_handler_block(global.display, signalHandlerId)
}

const unblockSignal = (signalId) => {
  const signalHandlerId = getSignalHandlerId(signalId);
  GObject.signal_handler_unblock(global.display, signalHandlerId)
}
const enable = () => {
  blockSignal('window-demands-attention')
  blockSignal('window-marked-urgent')
}
const disable = () => {
  unblockSignal('window-demands-attention')
  unblockSignal('window-marked-urgent')
}

export default { enable, disable }
