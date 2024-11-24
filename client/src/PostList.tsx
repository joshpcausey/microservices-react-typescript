import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Post {
  id: string;
  title: string;
}

const PostList = () => {
  const [posts, setPosts] = React.useState<Map<string, Post>>(new Map());

  const fetchPosts = async () => {
    const response = await axios.get('http://localhost:4000/posts');
    console.error(response);
    setPosts(response.data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const renderedPosts = Object.values(posts).map((post: Post) => {
    return (
      <div
        className="card"
        style={{ width: '30%', marginBottom: '20px' }}
        key={post.id}
      >
        <div className="card-body">
          <h3>{post.title}</h3>
        </div>
      </div>
    );
  });
  return (
    <div className="d-flex flex-row flex-wrap justify-content-between">
      {renderedPosts}
    </div>
  );
};

export default PostList;
