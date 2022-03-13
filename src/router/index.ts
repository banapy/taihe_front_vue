import { createRouter, createWebHistory, RouteRecordRaw, createWebHashHistory } from "vue-router";
import Lost from "@/components/404.vue";
export const routes: Array<RouteRecordRaw> = [];
const modulesFiles = import.meta.globEager("../views/*/index.vue");
for (let key in modulesFiles) {
	let module = modulesFiles[key]
	const nameList = module.default.__file.split("/");
	let name = nameList[nameList.length - 1].split('.')[0];
	let file = module.default;
	routes.push({
		path: `/${name}`,
		name: name,
		component: file,
	});
}
if (routes.length) {
	routes.push({
		path: "/",
		redirect: routes[0].path,
	});
} else {
	routes.push({
		path: "/",
		component: Lost,
	});
}
const router = createRouter({
	history: createWebHashHistory(),
	routes,
});
export default router;
