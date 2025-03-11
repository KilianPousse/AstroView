import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { HeaderComponent } from './app/components/header/header.component';
import { BodyComponent } from './app/components/body/body.component';
import { CardBoxComponent } from './app/components/card-box/card-box.component';

bootstrapApplication(HeaderComponent, appConfig)
  .catch((err) => console.error(err));


bootstrapApplication(BodyComponent, appConfig)
.catch((err) => console.error(err));


bootstrapApplication(CardBoxComponent, appConfig)
    .catch((err) => console.error(err));
