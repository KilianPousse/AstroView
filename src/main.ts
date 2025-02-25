import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { HeaderBoxComponent } from './app/components/header-box/header-box.component';

bootstrapApplication(HeaderBoxComponent, appConfig)
  .catch((err) => console.error(err));
