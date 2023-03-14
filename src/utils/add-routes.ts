import path from 'path-browserify';

/**
 * @return 是否具有访问权限
*/
const hasPermission = (route, permission) => {
  const routePermission = route.meta?.permission || [];

  return routePermission.length === 0 ? true : (
    new Set([...routePermission, ...permission]).size !==
    routePermission.length + permission.length
  );
};

/**
 * @description 过滤非权限路由
*/
const filterAsyncRoutes = (routes, permission) => {
  const res = []

  routes.forEach(route => {
    const tmp = {
      ...route
    }
    if (hasPermission(route, permission)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, permission)
      }
      res.push(tmp)
    }
  })

  return res
}

/**
 * @description 重定向修改
*/
const redirectToDefine = (routes, basePath) => {
  routes.forEach(route => {
    if (route.redirect) {
      const pathRedirect = path.resolve(basePath, route.path, (route.children && route.children.length > 0) ? route.children[0].path : '');
      route.redirect = pathRedirect

      if (route.children && route.children.length > 0) {
        redirectToDefine(route.children, pathRedirect);
      }
    }
  });
}

/**
 * @description 动态添加路由
*/
export const ADD_ROUTES = ({ routes, permission, router }) => {
  const filterRoutes = filterAsyncRoutes(routes, permission);

  redirectToDefine(filterRoutes, '/');

  filterRoutes.forEach(route => {
    router.addRoute(route);
  });

  if (filterRoutes.length) {
    router.addRoute({
      path: "/:pathMatch(.*)*",
      hidden: true,
      redirect: filterRoutes[0].path,
    });
  };
}
