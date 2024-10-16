import { h, ref, Ref, unref, VNode } from "vue";
import { DataTableColumn, NDropdown } from "naive-ui";
import { renderIcon } from "@/utils/permission.ts";
import YButton from "@/components/naive-ui/YButton.vue";

export interface TableActionModel {
  label: string;
  icon: string;
  type: "default" | "warning" | "primary" | "success" | "error" | "info";
  disabled: boolean;
  onClick: () => {};
}

interface Table<T = any> {
  dataList: Ref<T[] | undefined>;
  bordered: Ref<Boolean>;
  selectRows: Ref<Array<string | number> | undefined>;
  tableLoading: Ref<boolean>;
  tableHeight: Ref<number>;
  handleSuccess: ({ data }: { data: T[] }) => Promise<T[]>;
  handleSelectionChange: (tempSelectRows: Array<string | number>) => void;
  useTableColumn: (
    columns: DataTableColumn[],
    options: DataTableColumn
  ) => Array<DataTableColumn>;
  selectionColumn: { type: "selection"; fixed: "left" };
  indexColumn: {
    title: string;
    key: string;
    width: number;
    render: (rowData: any, rowIndex: number) => VNode;
  };
}

export const useTable = function <T = any>(): Table<T> {
  const dataList = ref<Array<T>>();
  const selectRows = ref<Array<string | number>>();
  const tableHeight = ref(200);
  const bordered = ref(false);
  const tableLoading = ref(true);
  const handleSuccess = ({ data = [] }: { data: T[] }): Promise<T[]> => {
    tableLoading.value = false;
    dataList.value = data;
    return Promise.resolve(data);
  };
  const handleSelectionChange = (tempSelectRows: Array<string | number>) => {
    selectRows.value = tempSelectRows;
  };
  return {
    dataList,
    tableHeight,
    bordered,
    selectRows,
    tableLoading,
    handleSuccess,
    handleSelectionChange,
    useTableColumn,
    selectionColumn: {
      type: "selection",
      fixed: "left",
    },
    indexColumn: useTableIndexColumn(),
  };
};

export const useRenderActionMore = (actions: TableActionModel[]) => {
  let renderActions = [];
  let moreActions = {};

  actions.forEach((it, index) => {
    if (index < 2) {
      renderActions.push(
        h(
          YButton,
          {
            text: true,
            type: it.type || "info",
            disabled: it.disabled,
            onClick: it.onClick,
            class: "u__mr-10",
          },
          {
            default: () => it.label,
          }
        )
      );
    }
  });
  moreActions = h(
    NDropdown,
    {
      options: actions.slice(2).map((_it) => {
        return {
          label: _it.label,
          key: _it.label,
          disabled: _it.disabled,
          icon: renderIcon(_it.icon),
          props: {
            onClick: _it.onClick,
          },
        };
      }) as any,
    },
    {
      default: () =>
        h(
          YButton,
          { text: true, type: "info" },
          { default: () => "更多操作" }
        ),
    }
  );
  renderActions.push(moreActions);
  return renderActions;
};

export const useRenderAction = function (actions: TableActionModel[]) {
  let renderActions = [];
  if (actions.length > 3) {
    renderActions = useRenderActionMore(actions);
  } else {
    renderActions = actions.map((it) => {
      return h(
        YButton,
        {
          class: "u__mr-10",
          text: true,
          type: it.type || "info",
          disabled: it.disabled,
          onClick: it.onClick,
        },
        {
          default: () => it.label,
        }
      );
    });
  }
  return renderActions;
};

export const useRowKey = function (propName: string) {
  return function (rowData: any) {
    return rowData[propName];
  };
};

export const useTableColumn = function (
  columns: DataTableColumn[],
  options?: DataTableColumn
) {
  const tempColumns = ref<DataTableColumn[]>();
  const tempOpt = options ?? {};
  tempColumns.value = columns.map((it) => Object.assign({ ...tempOpt }, it));
  return unref(tempColumns)!;
};

export const useTableIndexColumn = function () {
  return {
    title: "序号",
    key: "index",
    width: 80,
    fixed: "left",
    render: (rowData: any, rowIndex: number) => {
      false && console.log(rowData);
      return h("div", null, { default: () => rowIndex + 1 });
    },
  };
};
