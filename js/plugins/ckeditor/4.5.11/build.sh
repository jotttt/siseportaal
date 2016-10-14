#!/bin/bash

#git clone https://github.com/ckeditor/ckeditor-dev.git
cp -av ../ckeditor-build-template/dev/builder/build-config.js ./ckeditor-dev/dev/builder/
cp -avr ../ckeditor-build-template/skins/icy_orange_ttu ./ckeditor-dev/skins
cp -avr ../ckeditor-build-template/plugins/* ./ckeditor-dev/plugins
cd ckeditor-dev/dev/builder
./build.sh
