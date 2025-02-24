import { getCollection } from '@/lib/db';
import { getAuthUser } from '@/lib/getAuthUser'
import { ObjectId } from 'mongodb';
import Link from 'next/link';
import React from 'react'
import { deletePost } from '../actions/posts';

export default async function dashboard() {
  // find user with their collections
  const user  = await getAuthUser();
  const postCollection = await getCollection('posts');
const userPosts =   await postCollection
  ?.find({userId: ObjectId.createFromHexString(user.userId)}).sort({$natural: -1}).toArray();
  
  if(!userPosts) return <p>Failed to fetch Data</p>
  if(userPosts.length === 0) return <p>Add some posts to see here</p>

  return (
    <div className='container'>
      <h1 className='title'>
      Dashboard For Your Blog
      </h1>
      
        <table>
          <thead>
            <tr>
              <th className='w-3/6'>Title</th>
              <th className='w-1/6'>View </th>
              <th className='w-1/6'>Edit</th>
              <th className='w-1/6'>Delete</th>
            </tr>
          </thead>
          <tbody>
            {userPosts.map((post)=>(
              <tr key={post._id.toString()}>
                <td className='w-3/6'>{post.title}</td>
                <td className='w-1/6 text-blue-500'><Link href={`/posts/show/${post._id.toString()}`}>View</Link></td>
                <td className='w-1/6 text-green-500'><Link href={`/posts/edit/${post._id.toString()}`}>Edit</Link></td>
                <td className='w-1/6 text-red-500'>
                <form action={deletePost}>
                  <input type='hidden' name='postId' value={post._id.toString()} />
                  <button type='submit'>
                    Delete
                  </button>
                </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  )
}
