compile version:
    deno compile --allow-net --allow-write --target aarch64-apple-darwin     --output dist/gitignore-{{version}}-aarch64-apple-darwin       src/main.ts
    deno compile --allow-net --allow-write --target x86_64-apple-darwin      --output dist/gitignore-{{version}}-x86_64-apple-darwin        src/main.ts
    deno compile --allow-net --allow-write --target x86_64-unknown-linux-gnu --output dist/gitignore-{{version}}-x86_64-unknown-linux-gnu   src/main.ts
    deno compile --allow-net --allow-write --target x86_64-pc-windows-msvc   --output dist/gitignore-{{version}}-x86_64-pc-windows-msvc     src/main.ts

format:
    deno fmt src/main.ts

run:
    deno run --allow-net --allow-write src/main.ts python > .gitignore

test:
    deno run --allow-net --allow-write src/main.ts python > .gitignore
    deno run --allow-net --allow-write src/main.ts r >> .gitingore
    deno run --allow-net --allow-write src/main.ts --list


add-to-my-path:
    cp dist/gitignore-0.1.0-alpha-aarch64-apple-darwin /Users/samedwardes/.local/bin/gitignore
