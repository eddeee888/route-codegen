echo "*** Generate route modules in examples"
yarn generate:examples

echo "*** Check if commited examples matches generated examples"
if [[ `git status --porcelain` ]]; then
  echo "Looks like codegen needs to be run:"
  git --no-pager diff HEAD --color
  git ls-files --others --exclude-standard
  echo "Have you tried running 'yarn generate:examples'?"
  exit 1
fi

echo "*** Done checking examples"