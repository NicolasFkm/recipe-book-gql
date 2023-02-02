import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
export class CategoryNotification {
    @Field(type => ID)
    id: number;

    @Field({ nullable: true })
    message?: string;

    @Field(type => Date)
    date: Date;
}

export interface CategoryNotificationPayload {
    id: number;
    message?: string;
}