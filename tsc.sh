cp node_modules/@sutton-signwriting/core/src/types.js src/types.js
tsc src/types.js --declaration --emitDeclarationOnly --allowJs

tsc index.js src/types.js --declaration --emitDeclarationOnly --allowJs
cat src/types.d.ts >> index.d.ts

tsc fsw/fsw.js src/types.js --declaration --emitDeclarationOnly --allowJs
cat src/types.d.ts >> fsw/fsw.d.ts

tsc swu/swu.js src/types.js --declaration --emitDeclarationOnly --allowJs
cat src/types.d.ts >> swu/swu.d.ts

tsc font/font.js --declaration --emitDeclarationOnly --allowJs
