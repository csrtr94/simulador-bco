
import { RouterModule, Routes } from '@angular/router';
import { TemplateComponent } from './components/template/template.component';
import { SoapComponent } from './components/soap/soap.component';


const APP_ROUTES: Routes = [
    { path: 'Api', component: TemplateComponent },
    { path: 'Servicios', component: SoapComponent },
    {path: '**', pathMatch: 'full', redirectTo: 'Api'}
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);


