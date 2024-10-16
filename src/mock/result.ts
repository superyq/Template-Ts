export const result = (data: any) => {
  return {
    code: 200,
    msg: "成功",
    data: data,
  };
};

export const resultFail = () => {
  return {
    code: 500,
    msg: '报错',
    data: {}
  }
}
