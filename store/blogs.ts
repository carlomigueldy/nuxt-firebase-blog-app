import { Module, VuexModule, Mutation } from "vuex-module-decorators";

export interface Post {
  name: string;
  createdAt?: Date;
}

@Module({
  name: "blogs",
  namespaced: true,
  stateFactory: true
})
class BlogModule extends VuexModule {
  public posts: Post[] = [];

  @Mutation
  setPosts(value: Post[]) {
    this.posts = value;
  }

  get postsToday() {
    return this.posts;
  }
}

export default BlogModule;
