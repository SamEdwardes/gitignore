run:
    deno run --allow-net --allow-write main.ts python

test:
    deno run --allow-net --allow-write main.ts python
    deno run --allow-net --allow-write main.ts r --append
    deno run --allow-net --allow-write main.ts --list

compile:
    deno compile --allow-net --allow-write --output dist/macos-arm/gitignore   --target aarch64-apple-darwin main.ts
    deno compile --allow-net --allow-write --output dist/macos-x64/gitignore   --target x86_64-apple-darwin main.ts
    deno compile --allow-net --allow-write --output dist/linux-x64/gitignore   --target x86_64-unknown-linux-gnu main.ts
    deno compile --allow-net --allow-write --output dist/windows-x64/gitignore --target x86_64-pc-windows-msvc main.ts

add-to-my-path:
    cp dist/macos-arm/gitignore /Users/samedwardes/.local/bin/gitignore
