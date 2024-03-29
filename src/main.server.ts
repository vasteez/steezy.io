import { enableProdMode } from '@angular/core';

import { environment } from './environments/environment';
console.log('Envc Check -> ', environment.production);
if (environment.production) {
    enableProdMode();
}

export { AppServerModule } from './app/app.server.module';
export { renderModule, renderModuleFactory } from '@angular/platform-server';
