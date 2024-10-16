import { defineStore } from "pinia";
import { getDictTypeTable } from "@/api/dict-mock.ts";
import { dictToOp, dictToName } from "@/utils/dict.ts";

export const useDictStore = defineStore({
  id: "dict",
  state: () => {
    return {
      dict: {},
    };
  },
  actions: {
    getDictType(dictType: string, type: any = "") {
      let _type: any = {
        op: "_Op",
        name: "_Name",
        "": "",
      };
      if (this.dict[dictType]) {
        return this.dict[`${dictType}${_type[type]}`];
      } else {
        let params = {
          page: 1,
          pageSize: 20,
          dictType,
        };
        getDictTypeTable(params).then((data: any) => {
          this.dict[dictType] = data.data.data;
          this.dict[`${dictType}_Op`] = dictToOp(data.data.data);
          this.dict[`${dictType}_Name`] = dictToName(data.data.data);
          return this.dict[`${dictType}${_type}`];
        });
      }
    },
  },
});
