import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class ChatRequestDto {
  @IsOptional()
  @IsString()
  @MaxLength(200)
  conversationId?: string;

  @IsString()
  @MinLength(1)
  @MaxLength(4000)
  message!: string;
}

