import { SplashComponent } from './StartScreenComponents/splash/splash';
import { FooterComponent } from './UIcomponents/commons/footer/footer';
import { NgModule } from '@angular/core';
import { CloudComponent } from './UIcomponents/commons/cloud/cloud';
import { WelcomeScreenComponent } from './StartScreenComponents/welcome-screen/welcome-screen';
import { IonicModule } from 'ionic-angular';
import { HomeFooterComponent } from './UIcomponents/commons/home-footer/home-footer';
import { EntryComponent } from './UIcomponents/commons/entry/entry';

@NgModule({
	declarations: [
	CloudComponent,
	FooterComponent,
	SplashComponent,
	WelcomeScreenComponent,
    HomeFooterComponent,
    EntryComponent,
	],
	imports: [IonicModule],
	exports: [
		CloudComponent,
		FooterComponent,
		SplashComponent,
    	WelcomeScreenComponent,
    	HomeFooterComponent,
    	EntryComponent,     
	]
})
export class ComponentsModule {}
