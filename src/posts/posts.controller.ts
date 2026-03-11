import { Controller, Get } from '@nestjs/common';
import { PostsService } from './posts.service';

/**
 * author: string;
 * title: string;
 * content: string;
 * likeCount: number;
 * commentCount: number;
 * createdAt: Date;
 * updatedAt: Date;
 */

interface Post {
  author: string;
  title: string;
  content: string;
  likeCount: number;
  commentCount: number;
  createdAt: Date;
  updatedAt: Date;
}

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}
  
  @Get()
  getPost(): Post {
    return {
      author: 'John',
      title: 'Hello World',
      content: 'This is my first post',
      likeCount: 10,
      commentCount: 5,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  }
}
