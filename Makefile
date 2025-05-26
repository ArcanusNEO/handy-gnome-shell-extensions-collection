MAKEFLAGS += -r
.PHONY: install uninstall

prefix ?= /usr/local
exec_prefix := $(prefix)
bindir := $(exec_prefix)/bin
sbindir := $(exec_prefix)/sbin
libexecdir := $(exec_prefix)/libexec
datarootdir := $(prefix)/share
datadir := $(datarootdir)
sysconfdir := $(prefix)/etc
sharedstatedir := $(prefix)/com
localstatedir := $(prefix)/var
runstatedir := $(localstatedir)/run
includedir := $(prefix)/include
docdir := $(datarootdir)/doc
infodir := $(datarootdir)/info
htmldir := $(docdir)
dvidir := $(docdir)
pdfdir := $(docdir)
psdir := $(docdir)
libdir := $(exec_prefix)/lib
lispdir := $(datarootdir)/emacs/site-lisp
localedir := $(datarootdir)/locale
mandir := $(datarootdir)/man
manext := .1
srcdir := src

uuid := $(shell grep -Po '(?<="uuid": ")[^"]*' metadata.json)

install:
	mkdir -vp -- "$(DESTDIR)$(datadir)/gnome-shell/extensions/$(uuid)"
	find . -regextype posix-extended -regex '.+\.js(on)?$$' -exec install -vm644 {} "$(DESTDIR)$(datadir)/gnome-shell/extensions/$(uuid)/{}" \;

uninstall:
	$(RM) -vr -- "$(DESTDIR)$(datadir)/gnome-shell/extensions/$(uuid)"
