export default {
  // 在绑定元素的父组件
  // 及他自己的所有子节点都挂载完成后调用
  mounted(el: Element, binding: any) {
    // 下面会介绍各个参数的细节
    const { value } = binding;

    console.log(el, value);
  },
};
