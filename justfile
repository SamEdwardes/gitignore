# Get the current version.
version := `deno run --allow-net --allow-write src/main.ts --version | sed -r "s/\x1B\[([0-9]{1,3}(;[0-9]{1,2};?)?)?[mGK]//g" | rg -o '[0-9].*'`

# Define the architectures
arch_apple_m1 := "aarch64-apple-darwin"
arch_apple    := "x86_64-apple-darwin"
arch_linux    := "x86_64-unknown-linux-gnu"
arch_windows  := "x86_64-pc-windows-msvc"

compile:
    mkdir -p dist/{{version}}/{{arch_apple_m1}}
    mkdir -p dist/{{version}}/{{arch_apple}}
    mkdir -p dist/{{version}}/{{arch_linux}}
    mkdir -p dist/{{version}}/{{arch_windows}}
    
    # Compile
    deno compile --allow-net --allow-write --target {{arch_apple_m1}}  --output dist/{{version}}/{{arch_apple_m1}}/gitignore   src/main.ts
    deno compile --allow-net --allow-write --target {{arch_apple}}     --output dist/{{version}}/{{arch_apple}}/gitignore      src/main.ts
    deno compile --allow-net --allow-write --target {{arch_linux}}     --output dist/{{version}}/{{arch_linux}}/gitignore      src/main.ts
    deno compile --allow-net --allow-write --target {{arch_windows}}   --output dist/{{version}}/{{arch_windows}}/gitignore    src/main.ts

    # Zip
    cd dist/{{version}}/{{arch_apple_m1}} && tar -czf gitignore-{{version}}-{{arch_apple_m1}}.tgz   gitignore  
    cd dist/{{version}}/{{arch_apple}}    && tar -czf gitignore-{{version}}-{{arch_apple}}.tgz      gitignore  
    cd dist/{{version}}/{{arch_linux}}    && tar -czf gitignore-{{version}}-{{arch_linux}}.tgz      gitignore  
    cd dist/{{version}}/{{arch_windows}}  && tar -czf gitignore-{{version}}-{{arch_windows}}.tgz    gitignore.exe

release: compile
    gh config set prompt disabled
    gh release create v{{version}} \
        dist/{{version}}/{{arch_apple_m1}}/gitignore-{{version}}-{{arch_apple_m1}}.tgz \
        dist/{{version}}/{{arch_apple}}/gitignore-{{version}}-{{arch_apple}}.tgz \
        dist/{{version}}/{{arch_linux}}/gitignore-{{version}}-{{arch_linux}}.tgz \
        dist/{{version}}/{{arch_windows}}/gitignore-{{version}}-{{arch_windows}}.tgz \
        --title v{{version}} \
        --prerelease \
        --draft
    gh config set prompt enabled

format:
    deno fmt src/main.ts

version:
    echo {{version}}
