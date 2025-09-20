import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as S from "../styles/PostDetail";
import * as WriteS from "../styles/PostWrite";

const STORAGE_KEY = "myPosts";

export default function PostDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [post, setPost] = useState(null);

    useEffect(() => {
        const storedPosts = localStorage.getItem(STORAGE_KEY);
        const posts = storedPosts ? JSON.parse(storedPosts) : [];
        const foundPost = posts.find((p) => String(p.id) === String(id));
        
        if (foundPost) {
            setPost(foundPost);
            setTitle(foundPost.title);
            setContent(foundPost.content);
        } else {
            alert("게시글을 찾을 수 없습니다.");
            navigate("/");
        }
    }, [id, navigate]);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleCancel = () => {
        setIsEditing(false);
        // 원래 데이터로 되돌리기
        if (post) {
            setTitle(post.title);
            setContent(post.content);
        }
    };

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
        
        const updatedPosts = posts.map(postItem => 
            postItem.id === parseInt(id) 
                ? { ...postItem, title: title.trim(), content: content.trim() }
                : postItem
        );

        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPosts));
        setPost({ ...post, title: title.trim(), content: content.trim() });
        setIsEditing(false);
    };

    const handleDelete = () => {
        if (window.confirm("정말로 이 게시글을 삭제하시겠습니까?")) {
            const storedPosts = localStorage.getItem(STORAGE_KEY);
            const posts = storedPosts ? JSON.parse(storedPosts) : [];
            
            const filteredPosts = posts.filter(postItem => postItem.id !== parseInt(id));
            localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredPosts));
            
            alert("게시글이 삭제되었습니다.");
            navigate("/");
        }
    };

    if (!post) {
        return <div>게시글을 불러오는 중...</div>;
    }

    return (
        <>
            {isEditing ? (
                <>
                    <WriteS.Title>글 수정</WriteS.Title>
                    <WriteS.Form onSubmit={handleSubmit}>
                        <WriteS.Label>
                            <WriteS.LabelText>제목</WriteS.LabelText>
                            <WriteS.Input
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="제목을 입력하세요"
                            />
                        </WriteS.Label>

                        <WriteS.Label>
                            <WriteS.LabelText>내용</WriteS.LabelText>
                            <WriteS.Textarea
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                placeholder="내용을 입력하세요"
                                rows={8}
                            />
                        </WriteS.Label>
                        <WriteS.Button type="submit">수정하기</WriteS.Button>
                        <WriteS.Button type="button" onClick={handleCancel} style={{ marginLeft: '10px' }}>
                            취소
                        </WriteS.Button>
                    </WriteS.Form>
                </>
            ) : (
                <>
                    <S.Title>{post.title}</S.Title>
                    <S.Divider />
                    <S.Article>{post.content}</S.Article>
                    <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
                        <WriteS.Button onClick={handleEdit}>수정</WriteS.Button>
                        <WriteS.Button onClick={handleDelete} style={{ backgroundColor: '#dc3545' }}>
                            삭제
                        </WriteS.Button>
                    </div>
                </>
            )}
        </>
    );
}
