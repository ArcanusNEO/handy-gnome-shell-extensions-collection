// Notification Banner Position
// https://github.com/brunodrugowick/notification-position-gnome-extension

import * as Main from 'resource:///org/gnome/shell/ui/main.js'
import Clutter from 'gi://Clutter'

const share = { _originalBannerAlignment: Main.messageTray.bannerAlignment }

const left = () => {
  Main.messageTray.bannerAlignment = Clutter.ActorAlign.START
}

const right = () => {
  Main.messageTray.bannerAlignment = Clutter.ActorAlign.END
}

const middle = () => {
  Main.messageTray.bannerAlignment = Clutter.ActorAlign.CENTER
}

const _original = () => {
  Main.messageTray.bannerAlignment = share._originalBannerAlignment
}

const enable = () => {
  right()
}

const disable = () => {
  _original()
}

export default { enable, disable }
