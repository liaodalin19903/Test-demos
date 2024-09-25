const gitDiffTree = require('git-diff-tree');

const commit1 = '3bf87c8b25a8d70f5c4b0c5623a366e9fb047742';
const commit2 = 'e20dd90c6be4e310fbad5bb4ec0b6e0b0c6a2dde';

gitDiffTree(commit1, commit2, (err, diff) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(diff.files);
});