import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsModel } from './posts/entities/posts.entity';

@Module({
  // imports: 다른 모듈을 불러와서 사용할 수 있게 하는 역할
  imports: [
    PostsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      entities: [
        PostsModel,
      ],
      synchronize: true, // typeorm이 애플리케이션 실행 시 데이터베이스와 엔티티를 동기화하는 옵션, 개발 환경에서만 true로 설정하는 것이 좋음
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
