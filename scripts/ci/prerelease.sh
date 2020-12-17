function prerelease() {  
  YARN_ALPHA_PREFIX="info alpha: "
  library=$1
  package_path=$2
  
  if current_alpha_version_line=`yarn tag list $library | grep "$YARN_ALPHA_PREFIX"`; then
    current_alpha_version=${current_alpha_version_line#$YARN_ALPHA_PREFIX}

    prerelease_version=`yarn -s semver --increment prerelease --preid alpha $current_alpha_version`
    
    if cd $package_path && yarn publish --no-git-tag-version --new-version $prerelease_version --tag alpha --access=public; then
      echo "*** Successfully released version: $prerelease_version"
    else
      exit 1
    fi
  else
    exit 1
  fi
}

prerelease $@
