// component:入口组件 deps:依赖组件

let a = 1;
c;
// export const withInstall = function(component, deps, routers) {
//   const c = component;
//   c.install = function(app) {
//     app.component(component.name, component);
//     deps &&
//       deps.forEach((dep) => {
//         app.component(dep.name, dep);
//       });
//   };
//   return c;
// };

// // 内部路由注册到vue实例
// export const rejectRouter = function(routers) {
//   const r = routers;
//   return function(appCase) {
//     appCase.$router.addRoutes(r);
//   };
// };
