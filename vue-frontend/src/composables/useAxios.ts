import axios from "axios";
import { ref, onMounted } from "vue";

interface Post{
  id: number;
  title: string;
  body: string;
}

export function useAxios() {
  const posts = ref<Post[]>([]);
  const loading = ref<boolean>(false);

  async function fetchPosts() {
    try{
      loading.value = true;
      const res = await axios.get<{ data: Post[]}>(`http://127.0.0.1:8000/api/posts`);
      posts.value = res.data.data;
    } catch (error) {
      console.error('Error fetching post: ', error );
    } finally {
      loading.value = false;
    }
  }

  onMounted(fetchPosts);

  return {posts, loading};
}
