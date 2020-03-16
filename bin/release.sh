function release() {
    new_version=$1

    echo "*** Publishing a new version $new_version"
    yarn publish --new-version $new_version

    echo "*** Successfully released version: $new_version"
}

release $@