import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { HeaderBoxComponent } from './app/components/header-box/header-box.component';
import { CardBoxComponent } from './app/components/card-box/card-box.component';

bootstrapApplication(HeaderBoxComponent, appConfig)
  .catch((err) => console.error(err));

bootstrapApplication(CardBoxComponent, appConfig)
    .catch((err) => console.error(err));
