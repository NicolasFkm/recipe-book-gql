import { Resolver, Mutation, Arg, Query, Subscription, Root, Args, PubSubEngine, PubSub } from "type-graphql";
import { Categories, CategoriesModel } from "@entities/categories";
import { CategoriesInput } from "./types/category-input";
import { CategoryNotification, CategoryNotificationPayload } from "./types/category-notification";

@Resolver()
export class CategoriesResolver {
  @Query((_returns) => Categories, { nullable: false })
  async returnSingleCategory(@Arg("id") id: string) {
    return await CategoriesModel.findById({ _id: id });
  }

  @Query(() => [Categories])
  async returnAllCategories() {
    return await CategoriesModel.find();
  }

  @Mutation(() => Categories)
  async createCategory(
    @Arg("data") { name, description }: CategoriesInput,
    @PubSub() pubSub: PubSubEngine
  ): Promise<Categories> {
    const category = await (
      await CategoriesModel.create({
        name,
        description,
      })
    ).save();

    const payload: CategoryNotificationPayload = { id: category.id, message: 'New Category Created' };
    await pubSub.publish("NEW_CATEGORY", payload);
    return category;
  }

  @Mutation(() => Boolean)
  async deleteCategory(@Arg("id") id: string) {
    await CategoriesModel.deleteOne({ id });
    return true;
  }

  @Subscription({
    topics: "NEW_CATEGORY",
  })
  async newCategory(@Root() notificationPayload: CategoryNotificationPayload,
    @Args() args: CategoryNotification): Promise<CategoryNotification> {
    return {
      ...notificationPayload,
      date: new Date(),
    };
  }
}
