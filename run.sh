#!/bin/bash
set -e

# Reset main repo
git fetch origin
git reset --hard origin/main

# Init and update submodules
git submodule update --init --recursive

# Update submodules to their remote branches
git submodule foreach --recursive '
  branch=$(git symbolic-ref --short -q HEAD || echo "detached")
  if [ "$branch" != "detached" ]; then
    git fetch origin
    git reset --hard origin/$branch
  fi
'
