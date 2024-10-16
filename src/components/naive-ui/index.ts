import path from "path-browserify";

export default function initC(app: any) {
  const files = import.meta.glob("@/components/naive-ui/*.vue");
  Object.keys(files).forEach((key) => {
    const name = path.basename(key, ".vue");
    app.component(name, files[key]);
  });
}
