import { Store } from "vuex";
import { getModule } from "vuex-module-decorators";
import BlogModule from "~/store/blogs";

let blogStore: BlogModule;

function initialiseStores(store: Store<any>): void {
  blogStore = getModule(BlogModule, store);
}

export { initialiseStores, blogStore };
