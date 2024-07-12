import React from 'react';
import service from '../appwrite/config';
import { Container, PostCard } from '../components';
import { useSelector } from 'react-redux';
const Home = () => {
    const [posts, setPosts] = React.useState([]);
    React.useEffect(() => {
        service.getPosts().then((posts) => {
            if(posts){
                setPosts(posts.documents);
            }
        })
    }, [])
    const authStatus = useSelector(state=> state.auth.status)
    if(authStatus === true && posts.length === 0){
        return (
            <div className='w-full py-8 my-28 text-center'>
                <Container>
                    <div className='flex flex-wrap'>
                        <div className='p-2 w-full'>
                            <h1 className='text-2xl font-bold hover:text-gray-500'>
                                No posts found. Create a new post.
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
    if(authStatus === false && posts.length === 0){
        return (
            <div className='w-full py-8 my-28 text-center'>
                <Container>
                    <div className='flex flex-wrap'>
                        <div className='p-2 w-full'>
                            <h1 className='text-2xl font-bold hover:text-gray-500'>
                                Kindly login to view posts.
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
                        posts.map((post)=>{
                            return (
                                <div key={post.$id} className='p-2 w-1/4'>
                                    <PostCard {...post} />
                                </div>
                            )
                        })
                    }
                </div>
            </Container>
        </div>
    );
}

export default Home;
