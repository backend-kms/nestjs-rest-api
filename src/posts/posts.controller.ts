import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { PostsService } from './posts.service';

/**
 * controller.ts
 * - 클라이언트의 요청을 처리하는 역할
 * - 요청에 대한 응답을 반환하는 역할
 * - 요청과 응답의 흐름을 제어하는 역할
 * - 서비스와 상호작용하여 비즈니스 로직을 처리하는 역할 (서비스 파일을 불러와서 사용한다.)
 */

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}
  
  // 1) GET /posts
  @Get()
  getPosts() {
    return this.postsService.getAllPosts();
  }

  // 2) GET /posts/:id
  @Get(':id')
  getPost(@Param('id') id: string){
    return this.postsService.getPostById(+id);
  }

  // 3) POST /posts
  @Post('')
  postPosts(
    @Body('author') author: string,
    @Body('title') title: string,
    @Body('content') content: string,
  ){
    return this.postsService.createPost(author, title, content);
  }

  // 4) PUT /posts/:id
  @Put(':id')
  putPosts(
    @Param('id') id: string,
    @Body('author') author?: string,
    @Body('title') title?: string,
    @Body('content') content?: string,
  ){
    return this.postsService.updatePost(+id, author, title, content);
  }

  // 5) DELETE /posts/:id
  @Delete(':id')
  deletePost(
    @Param('id') id: string,
  ){
    return this.postsService.deletePost(+id);
  }
}
