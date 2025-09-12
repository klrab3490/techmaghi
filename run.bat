# Reset main repo
git fetch origin
git reset --hard origin/main

# Reset all submodules
git submodule update --init --recursive
git submodule foreach --recursive 'git fetch origin && git reset --hard @{u}'
