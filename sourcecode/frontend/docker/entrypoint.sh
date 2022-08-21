#!/bin/sh

set -e

bash /createEnvFile.sh /usr/share/nginx/html

/docker-entrypoint.sh "$@"