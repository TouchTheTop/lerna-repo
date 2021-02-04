// component:入口组件 deps:依赖组件
export const withInstall = function(component:any, deps?:any[]) {
  const c = component;
  c.install = function(app:any) {
    app.component(component.name, component);
    deps &&
      deps.forEach((dep) => {
        app.component(dep.name, dep);
      });
  };
  return c;
};