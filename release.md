# Release Steps 

## Pre-Commit
* update package.json with new version
* update Changelog with version details
* update Readme version number in links

## Commit and tag
    git commit -m "version details"
    git push origin master
    git tag -am "version details" v1.4.3
    git push --tags

## Packaging Binaries
    npm pack
    gunzip sutton-signwriting-font-ttf-1.4.3.tgz
    tar -xvf sutton-signwriting-font-ttf-1.4.3.tar
    mv package sutton-signwriting-font-ttf-1.4.3
    zip -r sutton-signwriting-font-ttf-1.4.3.zip sutton-signwriting-font-ttf-1.4.3
    tar -zcvf sutton-signwriting-font-ttf-1.4.3.tar.gz sutton-signwriting-font-ttf-1.4.3

## Create Github Release
* Go to https://github.com/sutton-signwriting/font-ttf/tags
* Create release from Tag
* Upload .ZIP and .TAR.GZ
* Publish

## NPM Publish
    npm publish --access public