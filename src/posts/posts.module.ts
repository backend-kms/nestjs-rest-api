import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsModel } from './entities/posts.entity';

@Module({
  // controllers: 클라이언트의 요청을 처리하는 역할
  // providers: 서비스와 상호작용하여 비즈니스 로직을 처리하는 역할
  imports: [
    TypeOrmModule.forFeature([
      PostsModel,
    ])
  ],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
