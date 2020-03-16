function prerelease() {
    tag=$1
    if [ "$tag" == "alpha" ] || [ -z "$tag" ]
    then
        yarn_prefix="info alpha: "
    elif [ "$tag" == "latest" ]
    then
        yarn_prefix="info latest: "
    fi
    
    current_version_line=`yarn tag list route-codegen | grep "$yarn_prefix"`

    current_version=${current_version_line#$yarn_prefix}

    prerelease_version=`yarn -s semver --increment prerelease --preid alpha $current_version`
    
    yarn publish --no-git-tag-version --new-version $prerelease_version --tag alpha

    echo "*** Successfully released version: $prerelease_version"
}

prerelease $@