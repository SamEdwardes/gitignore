#!/usr/bin/env bash

set -euo pipefail

kernel=$(uname -s | cut -d- -f1)
uname_target="`uname -m`-$kernel"

echo $uname_target
exit 0