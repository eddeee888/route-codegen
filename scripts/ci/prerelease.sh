function prerelease() {  
  YARN_ALPHA_PREFIX="info alpha: "
  library=$1
  
  current_alpha_version_line=`yarn tag list $library | grep "$YARN_ALPHA_PREFIX"`

  current_alpha_version=${current_alpha_version_line#$YARN_ALPHA_PREFIX}

  prerelease_version=`yarn -s semver --increment prerelease --preid alpha $current_alpha_version`
  
  yarn publish --no-git-tag-version --new-version $prerelease_version --tag alpha

  echo "*** Successfully released version: $prerelease_version"
}

prerelease
