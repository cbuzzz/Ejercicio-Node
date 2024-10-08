import { model, Schema, ObjectId } from "mongoose";

export interface usersInterface{
    id: number,
    name: string,
    mail: string,
    password: string,
    experiencies: ObjectId[],
    comment: string
}
export type UsersInterfacePublicInfo = Pick<usersInterface, 'id' | 'name' | 'comment'>
export type newUserInfo = Omit<usersInterface,'id'>

export const usersSchema = new Schema<usersInterface>({
    id: Number,
    name: String,
    mail: String,
    password: String,
    experiencies:[{type: Schema.Types.ObjectId, ref:'user'}],
    comment: String
})

export const usersofDB = model<usersInterface>('user',usersSchema)