import PostCard from "../components/PostCard";
import { getCollection } from "../lib/db";

export default async function Home() {
  const postCollection = await getCollection("posts");
  const posts = await postCollection.find({}).sort({ _id: -1 }).toArray();


  if (!posts || posts.length === 0) {
    return <p>No posts found.</p>;
  }

  return (
    <div className="grid grid-cols-2 gap-6">
      {posts.map((post) => (
        <div key={post._id}>
          <PostCard post={post} />
        </div>
      ))}
    </div>
  );
}
