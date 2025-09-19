import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as S from "../styles/PostWrite";

const STORAGE_KEY = "myPosts";

export default function PostEdit() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    useEffect(() => {
        const storedPosts = localStorage.getItem(STORAGE_KEY);
        const posts = storedPosts ? JSON.parse(storedPosts) : [];
        const post = posts.find(p => p.id === parseInt(id));
        
        if (post) {
            setTitle(post.title);
            setContent(post.content);
        } else {
            alert("게시글을 찾을 수 없습니다.");
            navigate("/");
        }
    }, [id, navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim()) {
            alert("제목을 입력해주세요!");
            return;
        }
        if (!content.trim()) {
            alert("내용을 입력해주세요!");
            return;
        }
        
        const storedPosts = localStorage.getItem(STORAGE_KEY);
        const posts = storedPosts ? JSON.parse(storedPosts) : [];
        
        const updatedPosts = posts.map(post => 
            post.id === parseInt(id) 
                ? { ...post, title: title.trim(), content: content.trim() }
                : post
        );

        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPosts));
        navigate(`/posts/${id}`);
    };

    return (
        <>
            <S.Title>글 수정</S.Title>
            <S.Form onSubmit={handleSubmit}>
                <S.Label>
                    <S.LabelText>제목</S.LabelText>
                    <S.Input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="제목을 입력하세요"
                    />
                </S.Label>

                <S.Label>
                    <S.LabelText>내용</S.LabelText>
                    <S.Textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="내용을 입력하세요"
                        rows={8}
                    />
                </S.Label>
                <S.Button type="submit">수정하기</S.Button>
            </S.Form>
        </>
    );
}
