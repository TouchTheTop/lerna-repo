export const withInstall = function (component) {
  const c = component;
  c.install = function (app) {
    app.component(component.name, component);
  };
  return c;
};
