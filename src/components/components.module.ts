import { SplashComponent } from './StartScreenComponents/splash/splash';
import { FooterComponent } from './UIcomponents/commons/footer/footer';
import { NgModule } from '@angular/core';
import { CloudComponent } from './UIcomponents/commons/cloud/cloud';
import { WelcomeScreenComponent } from './StartScreenComponents/welcome-screen/welcome-screen';
import { IonicModule } from 'ionic-angular';

@NgModule({
	declarations: [
	CloudComponent,
	FooterComponent,
	SplashComponent,
	WelcomeScreenComponent 

	],
	imports: [IonicModule],
	exports: [
		CloudComponent,
		FooterComponent,
		SplashComponent,
    WelcomeScreenComponent 
	]
})
export class ComponentsModule {}
