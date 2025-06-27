//notes in README.md

async function getPosts() {
    try{
        await fetch('http://127.0.0.1:8000/api/posts', {
            method: 'GET',
        })
            .then(res => res.json())
            .then(data => console.log(data));
    } catch (err){
       err => console.error('Error:', err);
    }
}

// getPosts();
//Sends data to a server:
async function storePost(title, body) {
    try {
        await fetch('http://127.0.0.1:8000/api/posts', {
            method: 'POST',
            headers : {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({title: title,body: body})
        })
            .then(res => res.json())
            .then(data => console.log(data));
    } catch (err) {
        err => console.error('Error: ', err);
    }
}
// storePost('Trying async store', 'trying with await');
async function showPost(id){
    try {
        await fetch(`http://127.0.0.1:8000/api/posts/${id}`, {
            method: 'GET',
        })
            .then(res => res.json())
            .then(data => console.log(data))
            .catch(err => console.error('Error:', err));
    } catch (err) {
        err => console.error('Error: ', err);
    }
}
showPost(5);

async function updatePost(id, title, body){
    try {
        await fetch(`http://127.0.0.1:8000/api/posts/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({title: title, body: body})
        })
        .then(res => res.json())
        .then(data => console.log(data));
    } catch (err) {
        err => console.error('Error: ', err);
    }
}
// updatePost(5, 'updating', 'you');

async function deletePost(id){
    await fetch(`http://127.0.0.1:8000/api/posts/${id}`, {
        method: 'DELETE',
    })
        .then(res => {
            if(res.ok) {
                console.log('Post Deleted');
            }
        });
}

// deletePost(5);
