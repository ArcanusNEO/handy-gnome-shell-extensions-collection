.PHONY: install uninstall

PREFIX ?= /usr
_uuid = $(shell grep -Po '(?<="uuid": ")[^"]*' metadata.json)

install:
	find -regextype posix-extended -regex '.+\.js(on)?$$' -exec install -vDm644 {} "${PREFIX}/share/gnome-shell/extensions/${_uuid}/{}" \;
uninstall:
	rm -vrf -- "${PREFIX}/share/gnome-shell/extensions/${_uuid}"
