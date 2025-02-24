"use server"

import { getCollection } from "@/lib/db";
import { getAuthUser } from "@/lib/getAuthUser";
import { BlogPostSchema } from "@/lib/rules";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createPost(state, formData){
    const user  = await getAuthUser()
    if(!user){
        return redirect('/')
    }
const title  = formData.get('title');
const content = formData.get('content');

const validateFields = BlogPostSchema.safeParse({
    title,
    content, 
})
if(!validateFields.success){
    return { error: validateFields.error.flatten().fieldErrors,title,content };
}
try {
    const postsCollection = await getCollection("posts");
const post = {
    title: validateFields.data.title,
    content: validateFields.data.content,
    createdAt: new Date(),
    userId: ObjectId.createFromHexString(user.userId) 
} 

await postsCollection.insertOne(post);
} catch (error){
    return{
        error: { message: "Failed to create post" },
        title,
        content,
    }

}
redirect('/dashboard')
}

export async function updatePost( formData){
    const user  = await getAuthUser()
    if(!user){
        return redirect('/')
    }
const title  = formData.get('title');
const content = formData.get('content');
const postId = formData.get('postId');

const validateFields = BlogPostSchema.safeParse({
    title,
    content, 
})
if(!validateFields.success){
    return { error: validateFields.error.flatten().fieldErrors,title,content };
}
//find the post 
const postsCollection = await getCollection("posts");

const post = await postsCollection.findOne({
    _id: ObjectId.createFromHexString(postId)
   
})
if(user.userId !== post.userId.toString()){
    return redirect('/')
}

//find and update 
postsCollection.findOneAndUpdate({_id:post._id},{
    $set: {title: validateFields.data.title, content: validateFields.data.content}
})
redirect('/dashboard')
}
export async function deletePost(state, formData){
    const user  = await getAuthUser()
    if(!user){
        return redirect('/')
    }

//find the post 
const postsCollection = await getCollection("posts");

const post = await postsCollection.findOne({
    _id: ObjectId.createFromHexString(postId)
   
})
if(user.userId !== post.userId.toString()){
    return redirect('/')
}

//find and update 
postsCollection.findOneAndDelete({_id:post._id})
revalidatePath('/dashboard')
}