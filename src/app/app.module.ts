import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ExtraOptions, PreloadAllModules, RouterModule } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';
import { FuseModule } from '@fuse';
import { FuseConfigModule } from '@fuse/services/config';
import { FuseMockApiModule } from '@fuse/lib/mock-api';
import { CoreModule } from 'app/core/core.module';
import { appConfig } from 'app/core/config/app.config';
import { mockApiServices } from 'app/mock-api';
import { LayoutModule } from 'app/layout/layout.module';
import { AppComponent } from 'app/app.component';
import { appRoutes } from 'app/app.routing';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAnalytics,getAnalytics,ScreenTrackingService,UserTrackingService } from '@angular/fire/analytics';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideFunctions,getFunctions } from '@angular/fire/functions';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireModule, FIREBASE_OPTIONS } from '@angular/fire/compat';
import { AngularFireAuthGuard } from '@angular/fire/compat/auth-guard';
import {
    AngularFirestore,
    AngularFirestoreDocument,
    AngularFirestoreModule
} from '@angular/fire/compat/firestore';
import { EventsService } from './modules/admin/tools/_services/events.service';
import { ToastrModule } from 'ngx-toastr';
import { AdministratorsModule } from './modules/admin/administrators/administrators.module';
import { ProductsModule } from './modules/staff/products/products.module';
import { ToastComponent } from './modules/admin/tools/_toast/toast.component';
import { ReportsModule } from './modules/admin/reports/reports.module';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const routerConfig: ExtraOptions = {
    preloadingStrategy       : PreloadAllModules,
    scrollPositionRestoration: 'enabled'
};

@NgModule({
    declarations: [
        AppComponent,

    ],
    imports     : [
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(appRoutes, routerConfig),

        // Fuse, FuseConfig & FuseMockAPI
        FuseModule,
        FuseConfigModule.forRoot(appConfig),
        FuseMockApiModule.forRoot(mockApiServices),

        // Core module of your application
        CoreModule,

        // Layout module of your application
        LayoutModule,

        // 3rd party modules that require global configuration via forRoot
        MarkdownModule.forRoot({}),
         provideFirebaseApp(() => initializeApp(environment.firebase)),
         provideAnalytics(() => getAnalytics()),
         provideAuth(() => getAuth()),
         provideFirestore(() => getFirestore()),
         provideFunctions(() => getFunctions()),
         provideStorage(() => getStorage()),
         ToastrModule.forRoot(),
         NgbModule,
         AngularFireModule,
         AngularFireAuthModule,
         AngularFirestoreModule.enablePersistence(),
         AdministratorsModule,
         ProductsModule,
         ReportsModule,
    ],
    bootstrap   : [
        AppComponent
    ],
    providers: [
      ScreenTrackingService,
      UserTrackingService,
         AngularFireAuthGuard,
         AngularFireAuth,
         { provide: FIREBASE_OPTIONS, useValue: environment.firebase },
         EventsService
    ]
})
export class AppModule
{
}
