import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
} from '@nestjs/common';
import { PostMessageDto } from './dto/post-message.dto';
import { PostMessageUseCase } from '../usecases/post-message.usecase';

@Controller('messages')
export class MessagesController {
  @Inject(PostMessageUseCase)
  private readonly postMessageUseCase: PostMessageUseCase;

  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('')
  async sendMessage(@Body() postMessageDto: PostMessageDto) {
    return await this.postMessageUseCase.execute(postMessageDto);
  }
}
