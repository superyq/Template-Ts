export interface IOptions {
  [key: string]: any;
}

export interface IPages {
  page: number;
  pageSize: number;
  pageSizes: number[];
  total: number;
}

export interface ITag {
  title?: string;
  key: string;
}

export interface IMenu {
  menuName: string;
  icon: string;
  sort: number;
  perms: string;
  component: string;
  status: number;
  createTime: string;
  menuType: string;
  menuId: number;
  parentId: number;
  path: string;
  children?: IMenu[];
}
