#!/bin/bash

# Rename all "mar" folders to "ma" folders inside all "q*" folders
find . -type d -name "q*" | while read folder; do
  if [ -d "$folder/mar" ]; then
    mv "$folder/mar" "$folder/ma"
    echo "Renamed $folder/mar to $folder/ma"
  fi
done
