import React from 'react';
import service from '../appwrite/config';
import { Container , PostCard } from '../components';
const AllPosts = () => {
    const [posts, setPosts] = React.useState([]);
    React.useEffect(() => {
        service.getPosts().then((posts) => {
            if(posts){
                setPosts(posts.documents);
            }
        })
    },[])
    if(posts.length === 0){
        return (
            <div className='w-full py-8 my-28 text-center'>
                <Container>
                    <div className='flex flex-wrap'>
                        <div className='p-2 w-full'>
                            <h1 className='text-2xl font-bold hover:text-gray-500'>
                                No post is available.
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                {
                    posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard {...post} />
                        </div>
                    ))
                }
                </div>
            </Container>
        </div>
    );
}

export default AllPosts;
