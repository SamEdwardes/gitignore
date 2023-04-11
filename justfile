version := `deno run --allow-net --allow-write src/main.ts --version | sed -r "s/\x1B\[([0-9]{1,3}(;[0-9]{1,2};?)?)?[mGK]//g" | rg -o '[0-9].*'`

compile:
    # Compile
    deno compile --allow-net --allow-write --target aarch64-apple-darwin     --output dist/gitignore-{{version}}-aarch64-apple-darwin       src/main.ts
    deno compile --allow-net --allow-write --target x86_64-apple-darwin      --output dist/gitignore-{{version}}-x86_64-apple-darwin        src/main.ts
    deno compile --allow-net --allow-write --target x86_64-unknown-linux-gnu --output dist/gitignore-{{version}}-x86_64-unknown-linux-gnu   src/main.ts
    deno compile --allow-net --allow-write --target x86_64-pc-windows-msvc   --output dist/gitignore-{{version}}-x86_64-pc-windows-msvc     src/main.ts

    # Zip
    cd dist && tar -czf gitignore-{{version}}-aarch64-apple-darwin.tgz      gitignore-{{version}}-aarch64-apple-darwin    
    cd dist && tar -czf gitignore-{{version}}-x86_64-apple-darwin.tgz       gitignore-{{version}}-x86_64-apple-darwin     
    cd dist && tar -czf gitignore-{{version}}-x86_64-unknown-linux-gnu.tgz  gitignore-{{version}}-x86_64-unknown-linux-gnu
    cd dist && tar -czf gitignore-{{version}}-x86_64-pc-windows-msvc.tgz    gitignore-{{version}}-x86_64-pc-windows-msvc.exe


format:
    deno fmt src/main.ts

version:
    echo {{version}}
