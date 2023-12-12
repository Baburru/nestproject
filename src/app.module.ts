import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb+srv://Mathis:azerty123@cluster0.njqkksq.mongodb.net/?retryWrites=true&w=majority',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      ssl: true,
      synchronize: true, //not for production
    }),
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
