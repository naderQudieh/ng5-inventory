import {NgModule, ApplicationRef} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatStepperModule,
} from '@angular/material';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
// Layout
import {LayoutComponent} from './layout/layout.component';
import {PreloaderDirective} from './layout/preloader.directive';
// Header
import {AppHeaderComponent} from './layout/header/header.component';
// Sidenav
import {AppSidenavComponent} from './layout/sidenav/sidenav.component';
import {ToggleOffcanvasNavDirective} from './layout/sidenav/toggle-offcanvas-nav.directive';
import {AutoCloseMobileNavDirective} from './layout/sidenav/auto-close-mobile-nav.directive';
import {AppSidenavMenuComponent} from './layout/sidenav/sidenav-menu/sidenav-menu.component';
import {AccordionNavDirective} from './layout/sidenav/sidenav-menu/accordion-nav.directive';
import {AppendSubmenuIconDirective} from './layout/sidenav/sidenav-menu/append-submenu-icon.directive';
import {HighlightActiveItemsDirective} from './layout/sidenav/sidenav-menu/highlight-active-items.directive';
// Customizer
import {AppCustomizerComponent} from './layout/customizer/customizer.component';
import {ToggleQuickviewDirective} from './layout/customizer/toggle-quickview.directive';
// Footer
import {AppFooterComponent} from './layout/footer/footer.component';
// Search Overaly
import {AppSearchOverlayComponent} from './layout/search-overlay/search-overlay.component';
import {SearchOverlayDirective} from './layout/search-overlay/search-overlay.directive';
import {OpenSearchOverlaylDirective} from './layout/search-overlay/open-search-overlay.directive';

// Pages

// Sub modules
import {LayoutModule} from './layout/layout.module';
import {SharedModule} from './shared/shared.module';

// hmr
import {removeNgStyles, createNewHosts} from '@angularclass/hmr';
import {AuthService} from "./shared/auth.service";
import {AuthGuard} from "./shared/auth.guard";
import {AngularFireModule} from "angularfire2";
import {AngularFireDatabaseModule} from "angularfire2/database-deprecated";
import {AngularFireAuthModule} from "angularfire2/auth";

export const firebaseConfig = {
    apiKey: 'AIzaSyAOcfYCuzWMMuVBoxVB6zK5OZLJnPbJjtQ',
    authDomain: 'project-4454340184793571349.firebaseapp.com',
    databaseURL: 'https://project-4454340184793571349.firebaseio.com',
    projectId: 'project-4454340184793571349',
    storageBucket: 'project-4454340184793571349.appspot.com',
    messagingSenderId: '948521595977'
}


@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        FormsModule,
        BrowserAnimationsModule,
        MatAutocompleteModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatCardModule,
        MatCheckboxModule,
        MatChipsModule,
        MatStepperModule,
        MatDatepickerModule,
        MatDialogModule,
        MatExpansionModule,
        MatGridListModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatMenuModule,
        MatNativeDateModule,
        MatPaginatorModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatRadioModule,
        MatRippleModule,
        MatSelectModule,
        MatSidenavModule,
        MatSliderModule,
        MatSlideToggleModule,
        MatSnackBarModule,
        MatSortModule,
        MatTableModule,
        MatTabsModule,
        MatToolbarModule,
        MatTooltipModule,
        //firebase
        AngularFireModule.initializeApp(firebaseConfig),
        AngularFireDatabaseModule,
        AngularFireAuthModule,
        AppRoutingModule,

        // Sub modules
        LayoutModule,
        SharedModule,
    ],
    declarations: [
        AppComponent,
        // Layout
        LayoutComponent,
        PreloaderDirective,
        // Header
        AppHeaderComponent,
        // Sidenav
        AppSidenavComponent,
        ToggleOffcanvasNavDirective,
        AutoCloseMobileNavDirective,
        AppSidenavMenuComponent,
        AccordionNavDirective,
        AppendSubmenuIconDirective,
        HighlightActiveItemsDirective,
        // Customizer
        AppCustomizerComponent,
        ToggleQuickviewDirective,
        // Footer
        AppFooterComponent,
        // Search overlay
        AppSearchOverlayComponent,
        SearchOverlayDirective,
        OpenSearchOverlaylDirective,
        //
        // Pages
        // PageLayoutFullscreenComponent,
    ],
    providers: [AuthService, AuthGuard],
    bootstrap: [AppComponent]
})

export class AppModule {
    constructor(public appRef: ApplicationRef) {
    }

    hmrOnInit(store) {
        console.log('HMR store', store);
    }

    hmrOnDestroy(store) {
        const cmpLocation = this.appRef.components.map((cmp) => cmp.location.nativeElement);
        // recreate elements
        store.disposeOldHosts = createNewHosts(cmpLocation);
        // remove styles
        removeNgStyles();
    }

    hmrAfterDestroy(store) {
        // display new elements
        store.disposeOldHosts();
        delete store.disposeOldHosts;
    }
}
