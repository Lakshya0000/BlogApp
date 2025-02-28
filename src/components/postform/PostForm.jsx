import React, { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button , Input , Select, RTE} from '../index';
import service from '../../appwrite/config';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const PostForm = ({post}) => {
    const {register, handleSubmit, watch, setValue, control, getValues} = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || 'active',
        }
    })
    const navigate = useNavigate();
    const userData = useSelector(state => state.auth.userData);
    console.log(userData);

    const submit = async(data)=> {
        if(post){
            const file = data.image[0] ? await service.uploadFile(data.image[0]) : null;
            if (file){
               await service.deleteFile(post.featuredImage)
            }
            const dbPost = await service.updatePost(post.$id, {
                ...data,
                featuredImage: file ? file.$id : post.featuredImage
            })
            if (dbPost){
                navigate(`/post/${dbPost.$id}`)
            }
        }
        else{
            const file = data.image[0] ? await service.uploadFile(data.image[0]) : null;
            if(file){
                const fileId = file.$id;
                data.featuredImage = fileId;
                console.log(userData);
                console.log(userData.user);
                console.log(userData.user.$id);
                const dbPost = await service.createPost({
                    ...data,
                    userId: userData.user.$id
                })
                if(dbPost){
                    navigate(`/post/${dbPost.$id}`)
                }
                else{
                    navigate('/')
                }
            }
        }
    }
    const slugTransform = useCallback((value) => {
       if(value && typeof value === 'string'){
            const slug = value.trim().toLowerCase().replace(/ /g, '-');
            return slug;
       }
       return ''; 
    },[])
    useEffect(() => {
        const subscription = watch((value,{name}) => {
            if(name=='title'){
                const slug = slugTransform(value.title);
                setValue('slug', slug, {shouldValidate: true})
            }
        });
        return () => {
            subscription.unsubscribe()
        }
    },[navigate ,watch, slugTransform, setValue])
    return (
        <form onSubmit={handleSubmit(submit)} className='flex flex-wrap'>
            <div className='w-2/3 px-2'>
                <Input 
                    label = "Title : "
                    placeholder = "Title"
                    className = "mb-4"
                    {...register("title", { required: true })}
                />
                <Input 
                    label = "Slug : "
                    placeholder = "Slug"
                    className = "mb-4"
                    {...register("slug", { required: true })}
                    readOnly
                    
                />
                <RTE label="Content : " name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className='w-1/3 px-2'>
                <Input 
                    label = "Featured Image : "
                    type = "file"
                    className = "mb-4"
                    accept = "image/*"
                    requ = {post ? false : true}
                    {...register("image", { required: post ? false : true})}
                    
                />
                {post && (
                    <div className='w-full mb-4'>
                        <img src={service.getFilePreview(post.featuredImage)} alt={post.title} className='rounded-lg' />
                    </div>
                )}
                <Select 
                    options = {["active", "inactive"]}
                    label = "Status : "
                    className = "mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">{post ? "Update" : "Submit"}</Button>
            </div>
        </form>
    );
}

export default PostForm;
