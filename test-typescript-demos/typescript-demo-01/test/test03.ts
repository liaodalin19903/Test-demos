interface ComboData {
  id: string;
  combo?: string;
  data: {
      label: string;
  };
  children?: ComboDataTree[];
}

interface ComboDataTree extends ComboData {
  children: ComboDataTree[];
}

// 假设 combos 是你的输入数组
const combos: ComboData[] = [
  { "id": "a",  "data": { "label": "Combo A" } },
  { "id": "b", "combo": "a", "data": { "label": "Combo B" } },
  { "id": "c", "combo": "a", "data": { "label": "Combo C" } },
  { "id": "d", "combo": "b", "data": { "label": "Combo D" } },
  { "id": "e", "data": { "label": "Combo E" } },
  // ... 其他元素
];

// 构建树结构的函数
function buildTree(combos: ComboData[]): ComboDataTree[] {
  const map: { [key: string]: ComboNode } = {};
  const roots: ComboNode[] = [];

  // 将每个 combo 存入 map，以便快速查找
  combos.forEach(combo => {
      map[combo.id] = { ...combo, children: [] } as ComboNode;
  });

  // 构建树
  combos.forEach(combo => {
      if (combo.combo) {
          // 如果有父 combo，添加到父 combo 的 children 中
          map[combo.combo].children.push(map[combo.id]);
      } else {
          // 如果没有父 combo，说明是顶层 combo
          roots.push(map[combo.id]);
      }
  });

  return roots;
}

// 获取顶层 combo 及其子孙节点
const tree = buildTree(combos);
console.log(JSON.stringify(tree, null, 2));