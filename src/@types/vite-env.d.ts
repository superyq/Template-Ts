/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_NAME: string;
  readonly VITE_TITLE: string;
  // 更多环境变量...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
