import { Injectable, NotFoundException } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { PostsModel } from './entities/posts.entity';
import { InjectRepository } from '@nestjs/typeorm';

/**
 * author: string;
 * title: string;
 * content: string;
 * likeCount: number;
 * commentCount: number;
 * createdAt: Date;
 * updatedAt: Date;
 */

export interface PostModel {
  id: number;
  author: string;
  title: string;
  content: string;
  likeCount: number;
  commentCount: number;
  createdAt: Date;
  updatedAt: Date;
}

let posts : PostModel[] = [
  { id: 1, author: 'John', title: 'Hello World', content: 'This is my first post', likeCount: 10, commentCount: 5, createdAt: new Date(), updatedAt: new Date() },
  { id: 2, author: 'Jane', title: 'Hello NestJS', content: 'This is my second post', likeCount: 20, commentCount: 10, createdAt: new Date(), updatedAt: new Date() },
  { id: 3, author: 'Bob', title: 'Hello TypeScript', content: 'This is my third post', likeCount: 30, commentCount: 15, createdAt: new Date(), updatedAt: new Date() },
]

@Injectable()
export class PostsService {
    constructor(
        @InjectRepository(PostsModel)
        private readonly postRepository: Repository<PostsModel>,
    ) {}

    getAllPosts() {
        return posts;
    }

    getPostById(id: number) {
        const post = posts.find((post) => post.id === +id);
        if (!post) {
            throw new NotFoundException();
        }
    
        return post;
    }

    createPost(author: string, title: string, content: string) {
        const newPost: PostModel = {
        id: posts[posts.length - 1].id + 1,
        author,
        title,
        content,
        likeCount: 0,
        commentCount: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        };

        posts = [
        ...posts,
        newPost
        ];
        
        return newPost;
    }

    updatePost(id: number, author?: string, title?: string, content?: string) {
        const post = posts.find((post) => post.id === +id);
        if (!post) {
        throw new NotFoundException();
        }

        if (author) {
        post.author = author;
        }
        if (title) {
        post.title = title;
        }
        if (content) {
        post.content = content;
        }
        post.updatedAt = new Date();

        posts = posts.map(prevPost => prevPost.id === +id ? post : prevPost);

        return post;
    }

    deletePost(id: number) {
        const post = posts.find((post) => post.id === +id);
        if (!post) {
        throw new NotFoundException();
        }
        posts = posts.filter((post) => post.id !== +id);
        return id;
    }
}
