echo "*** Generate docs"
yarn generate:docs

echo "*** Check if commited docs matches generated docs"
if [[ `git status --porcelain` ]]; then
  echo "Looks like docs need to be updated:"
  git --no-pager diff HEAD --color
  git ls-files --others --exclude-standard
  echo "Have you tried running 'yarn generate:docs'?"
  exit 1
fi

echo "*** Done checking docs"