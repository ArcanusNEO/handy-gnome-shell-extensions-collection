.PHONY: install uninstall

prefix ?= /usr
_uuid = $(shell grep -Po '(?<="uuid": ")[^"]*' metadata.json)

install:
	find -regextype posix-extended -regex '.+\.js(on)?$$' -exec install -vDm644 {} "${prefix}/share/gnome-shell/extensions/${_uuid}/{}" \;
uninstall:
	rm -vrf -- "${prefix}/share/gnome-shell/extensions/${_uuid}"
