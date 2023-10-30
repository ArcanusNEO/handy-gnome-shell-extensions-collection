// Extend left box
// https://github.com/hardpixel/unite-shell
// https://github.com/StephenPCG/extend-left-box

import * as Main from 'resource:///org/gnome/shell/ui/main.js'
import Clutter from 'gi://Clutter'
const Gi = imports._gi

const vhook = (object, symbol, callback) => {
  const proto = Object.getPrototypeOf(object)
  const _hook = func => {
    if (Gi.gobject_prototype_symbol && proto[Gi.gobject_prototype_symbol]) {
      proto[Gi.gobject_prototype_symbol][Gi.hook_up_vfunc_symbol](symbol, func)
    } else {
      proto[Gi.hook_up_vfunc_symbol](symbol, func)
    }
  }
  _hook(callback)
  return () => { _hook(proto[`vfunc_${symbol}`]) }
}

const _allocate = box => {
  Main.panel.set_allocation(box)

  const leftBox = Main.panel._leftBox
  const centerBox = Main.panel._centerBox
  const rightBox = Main.panel._rightBox
  const childBox = new Clutter.ActorBox()

  const leftWidth = leftBox.get_preferred_width(-1)[1]
  const centerWidth = centerBox.get_preferred_width(-1)[1]
  const rightWidth = rightBox.get_preferred_width(-1)[1]

  const allocWidth = box.x2 - box.x1
  const allocHeight = box.y2 - box.y1
  const sideWidth = Math.floor(allocWidth - centerWidth - rightWidth)

  const rtlTextDir = Main.panel.get_text_direction() == Clutter.TextDirection.RTL

  childBox.y1 = 0
  childBox.y2 = allocHeight

  if (rtlTextDir) {
    childBox.x1 = allocWidth - Math.min(sideWidth, leftWidth)
    childBox.x2 = allocWidth
  } else {
    childBox.x1 = 0
    childBox.x2 = Math.min(sideWidth, leftWidth)
  }

  leftBox.allocate(childBox)

  childBox.y1 = 0
  childBox.y2 = allocHeight

  if (rtlTextDir) {
    childBox.x1 = rightWidth
    childBox.x2 = childBox.x1 + centerWidth
  } else {
    childBox.x1 = allocWidth - centerWidth - rightWidth
    childBox.x2 = childBox.x1 + centerWidth
  }

  centerBox.allocate(childBox)

  childBox.y1 = 0
  childBox.y2 = allocHeight

  if (rtlTextDir) {
    childBox.x1 = 0
    childBox.x2 = rightWidth
  } else {
    childBox.x1 = allocWidth - rightWidth
    childBox.x2 = allocWidth
  }

  rightBox.allocate(childBox)
}

const share = {}

const enable = () => {
  share.restore = vhook(Main.panel, 'allocate', _allocate)
  Main.panel.queue_relayout()
}

const disable = () => {
  share.restore()
  Main.panel.queue_relayout()
}

export default { enable, disable }
