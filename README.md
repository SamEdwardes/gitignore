# gitignore

A CLI for quickly generating .gitignore templates from GitHub's `.gitignore` repo <https://github.com/github/gitignore>.

## Install

Download your desired version from the GitHub releases page <https://github.com/SamEdwardes/gitignore/releases>. Unpack the tarball and move to a location on your path. For example:

```bash
# M1 Mac
wget -O gitignore.tgz https://github.com/SamEdwardes/gitignore/releases/download/v0.1.0-alpha/gitignore-0.1.0-alpha-aarch64-apple-darwin.tgz
tar -xf gitignore.tgz
mv gitignore "$HOME/.local/bin/"
```

## Usage

```bash
Usage:   gitignore <language>
Version: 0.1.0-alpha         

Description:

Get .gitignore templates from GitHub's .gitignore templates repo (https://github.com/github/gitignore).

Options:

-h, --help               - Show this help.                                                                                    
-V, --version            - Show the version number for this program.                                                          
-l, --list     [list]    - Show a list of available templates.                                                                
-c, --commit   [commit]  - Use the .gitignore from a specific commit. If you are using the gitignore CLI in  (Default: "main")
                           a pipeline you may want to set this value to ensure reproducibility.
```

## Examples

Create a new *.gitignore* for a Python project:

```bash
gitignore python > .gitignore
```

Append the *.gitignore* template for R to an existing .gitignore file:

```bash
gitignore r >> .gitignore
```

See a list of available .gitignore templates:

```bash
gitignore --list
```

Search for a specific template:

```bash
gitignore --list | grep rust
```

Use a .gitignore template from a specific commit from the https://github.com/github/gitignore repo. This is useful if you want to use `gitignore` in a CI/CD pipeline.

```bash
gitignore python --commit af7786b54d206f7101b128616df9e14341f52f96 > .gitignore
```
