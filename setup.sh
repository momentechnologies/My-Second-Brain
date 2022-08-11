#!/bin/bash

mkdir -p sourcecode

pushd sourcecode

git clone git@bitbucket.org:birdsview-as/falcon-api.git
git clone git@bitbucket.org:birdsview-as/falcon-frontend.git

popd

pushd sourcecode/falcon-api
npm run artifactregistry-login

popd