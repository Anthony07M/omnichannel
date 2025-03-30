import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { channel, direction } from 'src/messages/domain/entities/message.entiy';

export class PostMessageDto {
  @IsString({ message: 'content deve ser uma string' })
  @IsNotEmpty({ message: 'content não pode ser vazio' })
  content: string;

  @IsString({ message: 'userId deve ser uma string' })
  @IsUUID('all', { message: 'user id deve ser um uuid válido' })
  userId: string;

  @ApiProperty({ example: channel.WEB, enum: channel })
  @IsEnum(channel, { message: 'channel precisa ser SMS ou WEB' })
  @IsString({ message: 'channel deve ser uma string' })
  channel: keyof typeof channel;

  @ApiProperty({ example: direction.IN, enum: direction })
  @IsEnum(direction, { message: 'direction precisa ser IN ou OUT' })
  @IsString({ message: 'direction deve ser uma string' })
  direction: keyof typeof direction;
}
