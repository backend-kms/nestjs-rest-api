import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
}

/**
 * 실제 nestjs 프로젝트를 진행할 때는 각 모델별로 따로 모듈을 만들어서 관리하는 것이 좋다.
 * nest g resource > posts > RestAPI > n
 */