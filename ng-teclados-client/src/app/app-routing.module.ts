import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { KeyboardDetailComponent } from './keyboard-detail/keyboard-detail.component';
import { KeyboardEditComponent } from './keyboard-edit/keyboard-edit.component';
import { KeyboardNewComponent } from './keyboard-new/keyboard-new.component';

const routes: Routes = [
    {path: '',                    component: HomeComponent},
    {path: 'keyboards/:id/new', component: KeyboardNewComponent},
    {path: 'keyboards/:keyboardId', component: KeyboardDetailComponent},
    {path: 'keyboards/:id/edit', component: KeyboardEditComponent}
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ], 
    exports: [ RouterModule ]
})
export class AppRoutingModule {

}
