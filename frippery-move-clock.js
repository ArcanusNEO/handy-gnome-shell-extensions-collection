// Frippery Move Clock · 改
// https://frippery.org/extensions

import * as Main from 'resource:///org/gnome/shell/ui/main.js'

const enable = () => {
  // do nothing if the clock isn't centred in this mode
  if (Main.sessionMode.panel.center.indexOf('dateMenu') == -1) {
    return
  }
  const centerBox = Main.panel._centerBox
  const rightBox = Main.panel._rightBox
  const dateMenu = Main.panel.statusArea.dateMenu
  const cChildren = centerBox.get_children()
  // only move the clock if it's in the centre box
  if (cChildren.indexOf(dateMenu.container) != -1) {
    centerBox.remove_child(dateMenu.container)
    const rChildren = rightBox.get_children()
    rightBox.insert_child_at_index(dateMenu.container, rChildren.length)
  }
}

const disable = () => {
  // do nothing if the clock isn't centred in this mode
  if (Main.sessionMode.panel.center.indexOf('dateMenu') == -1) {
    return
  }
  const centerBox = Main.panel._centerBox
  const rightBox = Main.panel._rightBox
  const dateMenu = Main.panel.statusArea.dateMenu
  const children = rightBox.get_children()
  // only move the clock back if it's in the right box
  if (children.indexOf(dateMenu.container) != -1) {
    rightBox.remove_child(dateMenu.container)
    centerBox.add_child(dateMenu.container)
  }
}

export default { enable, disable }
