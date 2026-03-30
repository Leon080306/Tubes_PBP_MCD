export type UserInfo = {
    id: string;
    name: string;
    role: string;
    email: string;
}

export type Post = {
    createdAt: string;
    deletedAt: string;
    id: string;
    updatedAt: string;
    content: string;
    status: string;
    title: string;
    user: {
        name: string;
    };
    userId: string;
}

export type AsyncDataState = 'pending' | 'loading' | 'fulfilled' | 'error';

export type CreatePostPayload = {
    title: string;
    content: string;
}

export type EditPostPayload = {
    title: string;
    postId?: string;
}