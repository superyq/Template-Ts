export const dictToOp = (dict: any[]) => {
  return dict.map((item: any) => {
    return {
      label: item.dictLabel,
      value: item.dictCode,
    };
  });
};

export const dictToName = (dict: any[]) => {
  let op: any = {};
  dict.map((item: any) => {
    op[item.dictCode] = item.dictLabel;
  });
  return op;
};
