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

    async getAllPosts() {
        return this.postRepository.find();
    }

    async getPostById(id: number) {
        const post = await this.postRepository.findOne({
            where: {
                id,
            }
        });
        // await를 하지 않으면 post는 Promise 객체가 된다. 
        // 따라서 post가 존재하는지 확인하기 위해서는 await를 사용하여 실제 값을 가져와야 한다.
        if (!post) {
            throw new NotFoundException();
        }
        return post;
    }

    async createPost(author: string, title: string, content: string) {
        // 1. create) 새로운 게시글을 생성하는 메서드
        // 2. save) 생성된 게시글을 데이터베이스에 저장하는 메서드

        const post = this.postRepository.create({
            author,
            title,
            content,
            likeCount: 0,
            commentCount: 0,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        const newPost = await this.postRepository.save(post);
        return newPost;
    }

    async updatePost(postId: number, author?: string, title?: string, content?: string) {
        const post = await this.postRepository.findOne({
            where: {
                id: postId,
            }
        });
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

        const updatedPost = await this.postRepository.save(post);
        return updatedPost;
        
    }

    async deletePost(postId: number) {
        const post = await this.postRepository.findOne({
            where: {
                id: postId,
            }
        });
        if (!post) {
            throw new NotFoundException();
        }
        
        await this.postRepository.delete(postId);
        return;
    }
}
