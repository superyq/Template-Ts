import hasPermi from "./permission/hasPermi.ts";
import hasRole from "./permission/hasRole.ts";

const install = (Vue: any) => {
  Vue.directive("hasPermi", hasPermi);
  Vue.directive("hasRole", hasRole);
};

export default install;
