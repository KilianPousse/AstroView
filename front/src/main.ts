import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { HeaderComponent } from './app/components/header/header.component';
import { ApodBoxComponent } from './app/components/apod-box/apod-box.component';

import { provideHttpClient  } from '@angular/common/http';



bootstrapApplication(HeaderComponent, appConfig)
  .catch((err) => console.error(err));

bootstrapApplication(ApodBoxComponent, {
  providers: [
    provideHttpClient()
  ]
})
    .catch((err) => console.error(err));