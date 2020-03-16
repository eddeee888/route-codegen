function prerelease() {
    YARN_ALPHA_PREFIX="info alpha: "
    
    current_alpha_version_line=`yarn tag list route-codegen | grep "$YARN_ALPHA_PREFIX"`

    current_alpha_version=${current_alpha_version_line#$YARN_ALPHA_PREFIX}

    prerelease_version=`yarn -s semver --increment prerelease --preid alpha $current_alpha_version`
    
    yarn publish --new-version $prerelease_version --tag alpha

    echo "*** Successfully released version: $prerelease_version"
}

prerelease