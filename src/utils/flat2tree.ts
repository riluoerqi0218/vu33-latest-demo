/**
 * 格式化扁平列表到tree
 */

// 格式化数据格式
interface Flat {
  label: any;
  value: any;
  status?: number;
  parent?: any;
}

// 返回tree数据格式
interface Tree extends Flat {
  children?: Flat[];
}

export const flat2tree = (data: Flat[]): Tree[] => {
  let obj = {}, // 使用对象重新存储数据
    res = [], // 存储最后结果
    len = data.length;

  // 遍历原始数据data，构造obj数据，键名为id，值为数据
  for (let i = 0; i < len; i++) {
    obj[data[i]["value"]] = data[i];
  }

  // 遍历原始数据
  for (let j = 0; j < len; j++) {
    let list = data[j];
    // 通过每条数据的 pid 去obj中查询
    let parentList = obj[list["parent"]];

    if (parentList) {
      // 根据 parent 找到的是父节点，list是子节点，
      if (!parentList["children"]) {
        parentList["children"] = [];
      }
      // 将子节点插入 父节点的 children 字段中
      parentList["children"].push(list);
    } else {
      // parent 找不到对应值，说明是根结点，直接插到根数组中
      res.push(list);
    }
  }

  return res;
};

export const flat2treeWithDisabled = (data: Flat[]): Tree[] => {
  let obj = {}, // 使用对象重新存储数据
    res = [], // 存储最后结果
    len = data.length;

  // 遍历原始数据data，构造obj数据，键名为id，值为数据
  for (let i = 0; i < len; i++) {
    obj[data[i]["value"]] = { ...data[i], disabled: data[i].status === 3 };
  }

  // 遍历原始数据
  for (let j = 0; j < len; j++) {
    let list = {...data[j], disabled: data[j].status === 3 };
    // 通过每条数据的 pid 去obj中查询
    let parentList = obj[list["parent"]];

    if (parentList) {
      // 根据 parent 找到的是父节点，list是子节点，
      if (!parentList["children"]) {
        parentList["children"] = [];
      }
      // 将子节点插入 父节点的 children 字段中
      parentList["children"].push(list);
    } else {
      // parent 找不到对应值，说明是根结点，直接插到根数组中
      res.push(list);
    }
  }

  return res;
};
