import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path'

async function bootstrap() {
  //on ajoute un moteruur de template
  // const app = await NestFactory.create(AppModule);
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  //fichier static
  app.useStaticAssets(join(__dirname,'..','public'));
  //on ajoute un moteur de template
  app.setBaseViewsDir(join(__dirname,'..','views'));
  app.setViewEngine('ejs'); 
  await app.listen(process.env.port,()=>{
    console.log(`le server est demarer sur http://127.0.0.1:${process.env.port}`)
  });
}
bootstrap();
