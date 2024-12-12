import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/utils/firebase";
interface Post {
  content: string;
  username: string;
  userPhoto: string;
  createdAt: any;
  title: string;
}
export default function Testimonials() {
  const [posts, setPosts] = useState<Array<Post>>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsCollection = collection(db, "feedback");
        const snapshot = await getDocs(postsCollection);
        const postsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data() as Post,
        }));
        setPosts(postsData);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      } 
    };

    fetchPosts();
  }, []);

  return (
    <div className="py-24 sm:py-32">
      <div className="px-6 lg:px-8">
        <div className="mx-auto lg:mx-0">
          <h2 className="text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl text-center w-full">
            Real Stories, Real Impact
          </h2>
          <p className="mt-2 text-lg/8 text-center">
            Discover how Urja Setu changed people's lives.
          </p>
        </div>
        <div className="mt-10 overflow-hidden">
          <div className="flex space-x-6 animate-scroll pb-6 pt-8 sm:mt-16 mx-0 w-full">
            {posts.map((post) => (
              <div className="flex-none w-[320px] bg-[#B1D8B7] rounded-xl shadow-lg overflow-hidden">
                <div className="p-4">
                  <div className="flex items-center gap-x-4 text-xs">
                    {new Date(post.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                  <div className="group relative">
                    <h3 className="mt-3 text-lg font-semibold group-hover:text-gray-600">
                      <a>
                        <span className="absolute inset-0" />
                        {post.title}
                      </a>
                    </h3>
                    <p className="mt-5 text-sm line-clamp-3">{post.content}</p>
                  </div>
                </div>
                <div className="flex items-center gap-x-4 p-4 border-t border-gray-200">
                  <img
                    alt={post.username}
                    src={post.userPhoto}
                    className="h-12 w-12 rounded-full bg-gray-50"
                  />
                  <div className="text-sm">
                    <p className="font-semibold ">
                      <a>
                        <span className="absolute inset-0" />
                        {post.username}
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            ))}
            {/* <div
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
              className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#B1D8B7] to-[#94C973] opacity-30"
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
}
