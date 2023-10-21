# Release Steps 

## Pre-Commit
* update package.json with new version
* update CHANGELOG.md with version details
* update README.md version number in links
* update release.md version number in links

## Build and Document
    npm run build
    npm run docs

## Commit and tag
    git status
    git add <files>
    git commit -m "version details"
    git push origin master
    git tag -am "version details" v1.5.2
    git push --tags

## Packaging Binaries
    npm pack
    gunzip sutton-signwriting-font-ttf-1.5.2.tgz
    tar -xvf sutton-signwriting-font-ttf-1.5.2.tar
    mv package sutton-signwriting-font-ttf-1.5.2
    zip -r sutton-signwriting-font-ttf-1.5.2.zip sutton-signwriting-font-ttf-1.5.2
    tar -zcvf sutton-signwriting-font-ttf-1.5.2.tar.gz sutton-signwriting-font-ttf-1.5.2

## Create Github Release
* Go to https://github.com/sutton-signwriting/font-ttf/tags
* Create release from Tag
* Upload .ZIP and .TAR.GZ
* Publish

## NPM Publish
    npm publish --access public
