# Release Steps 

## Pre-Commit
* update package.json with new version
* update Changelog with version details
* update Readme version number in links

## Build and Document
    npm run build
    npm run docs

## Commit and tag
    git status
    git add <files>
    git commit -m "version details"
    git push origin master
    git tag -am "version details" v1.4.5
    git push --tags

## Packaging Binaries
    npm pack
    gunzip sutton-signwriting-font-ttf-1.4.5.tgz
    tar -xvf sutton-signwriting-font-ttf-1.4.5.tar
    mv package sutton-signwriting-font-ttf-1.4.5
    zip -r sutton-signwriting-font-ttf-1.4.5.zip sutton-signwriting-font-ttf-1.4.5
    tar -zcvf sutton-signwriting-font-ttf-1.4.5.tar.gz sutton-signwriting-font-ttf-1.4.5

## Create Github Release
* Go to https://github.com/sutton-signwriting/font-ttf/tags
* Create release from Tag
* Upload .ZIP and .TAR.GZ
* Publish

## NPM Publish
    npm publish --access public
