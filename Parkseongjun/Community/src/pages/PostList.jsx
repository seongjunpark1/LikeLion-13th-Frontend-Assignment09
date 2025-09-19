import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "../styles/PostList";

const STORAGE_KEY = "myPosts";

export default function PostList() {
    const navigate = useNavigate();
    const [posts, setPosts] = useState(() => {
        const storedPosts = localStorage.getItem(STORAGE_KEY);
        return storedPosts ? JSON.parse(storedPosts) : [];
    });

    const handleDelete = (postId) => {
        if (window.confirm("정말로 이 게시글을 삭제하시겠습니까?")) {
            const updatedPosts = posts.filter(post => post.id !== postId);
            setPosts(updatedPosts);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPosts));
        }
    };

    const handleEdit = (postId) => {
        navigate(`/edit/${postId}`);
    };
    
    return (
        <>
            <S.Title>게시글 목록</S.Title>
            <S.List>
                {posts.map((post) => (
                    <S.Card key={post.id}>
                        <S.CardLink to={`/posts/${post.id}`}>
                            <S.CardTitle>{post.title}</S.CardTitle>
                            <S.CardExcerpt>{post.content}</S.CardExcerpt>
                        </S.CardLink>
                        <S.CardActions>
                            <S.ActionButton 
                                className="edit" 
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleEdit(post.id);
                                }}
                            >
                                수정
                            </S.ActionButton>
                            <S.ActionButton 
                                className="delete" 
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleDelete(post.id);
                                }}
                            >
                                삭제
                            </S.ActionButton>
                        </S.CardActions>
                    </S.Card>
                ))}
            </S.List>
        </>
    );
}