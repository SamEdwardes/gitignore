run:
    deno run --allow-net --allow-write main.ts Python

test:
    deno run --allow-net --allow-write main.ts Python
    deno run --allow-net --allow-write main.ts R --append
    deno run --allow-net --allow-write main.ts --list