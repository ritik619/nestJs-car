import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsEmail, IsOptional, IsString } from 'class-validator';
export class createUserDto {
  @IsEmail()
  @ApiProperty()
  email: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  password: string;
}

export class UpdateUserDto {
  @IsEmail()
  @IsOptional()
  @ApiPropertyOptional()
  email: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  name: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  password: string;
}

export class UserResponseDto {
  @Expose()
  email: string;

  @Expose()
  name: string;

  @Expose()
  id: string;
}
