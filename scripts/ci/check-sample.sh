echo "*** Generate route modules in sample"
yarn generate:sample

echo "*** Check if commited sample matches generated sample"
if [[ `git status --porcelain` ]]; then
  echo "Looks like codegen needs to be run:"
  git --no-pager diff HEAD --color
  git ls-files --others --exclude-standard
  echo "Have you tried running 'yarn generate:sample'?"
  exit 1
fi

echo "*** Done checking samples"