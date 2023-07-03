import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutMeComponent } from './about-me/about-me.component';
import { HomeComponent } from './home/home.component';
import { HobbiesLandingPageComponent } from './hobbies/hobbies-landing-page/hobbies-landing-page.component';
import { ImageGalleryComponent } from './projects/image-gallery/image-gallery/image-gallery.component';
import { SpotifyPluginComponent } from './projects/spotify-plugin/spotify-plugin.component';
import { authGuard } from './guards/authentication.guard';
import { ResumeComponent } from './resume/resume.component';
const routes: Routes = [
  { path: 'aboutMe', component: AboutMeComponent,
  },
  {path:'', component: HomeComponent},
  {path:'hobbies', component: HobbiesLandingPageComponent},
  {path:'image-gallery', component: ImageGalleryComponent},
  {path:'spotify-project',   
  component: SpotifyPluginComponent,
  // canActivate: [authGuard],
  },
  {path:'spotify-project/authenticated',   
  component: SpotifyPluginComponent,
  // canActivate: [authGuard],
  },
  {path:'resume', component: ResumeComponent,
  },
  {
    path: 'login',
    loadChildren: () => import('./shared/login/login.module').then(m => m.LoginModule)
  },
  {path: '**', redirectTo: '', pathMatch: 'full'},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
