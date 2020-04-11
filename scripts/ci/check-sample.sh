echo "*** Generate route modules in sample"
yarn generate:sample

echo "*** Check if commited sample matches generated sample"
if ! git diff --quiet  ; then
  echo "Looks like codegen needs to be run:"
  git --no-pager diff HEAD --color
  echo "Have you tried running 'yarn generate:sample'?"
  exit 1
fi