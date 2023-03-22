import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));


  /**
   * Entrypoint to angular
   * Imports the AppModule and bootstraps it
   * --> Bootstrap: to load a smaller program that loads in 
   *    the bigger program. 
   * The AppModule is actaully in the app folder as app.mopdule.ts
   */