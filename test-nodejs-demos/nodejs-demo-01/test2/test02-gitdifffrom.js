const path = require('path')
const { gitDiffFrom } = require('git-diff-from')

const from = '3bf87c8b25a8d70f5c4b0c5623a366e9fb047742'
const to = 'HEAD'

let r = gitDiffFrom(from, to);  // 从老commit到现在对比的差异

//console.log(r);
console.log(r.files)  // 有哪些文件有变化

