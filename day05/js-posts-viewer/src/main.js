import './style.css'
const postList = document.getElementById('postList');
const postContent = document.getElementById('postContent');

async function fetchPosts() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const posts = await res.json();

  posts.slice(0, 10).forEach(post => {
    const li = document.createElement('li');
    li.textContent = post.title;
    li.style.cursor = 'pointer';
    
    li.addEventListener('click', () => {
      postContent.innerHTML = `<h3>${post.title}</h3><p>${post.body}</p>`
    });
    
    postList.appendChild(li);
  });
}

fetchPosts();