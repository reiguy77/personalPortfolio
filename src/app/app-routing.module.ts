import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutMeComponent } from './about-me/about-me.component';
import { HomeComponent } from './home/home.component';
import { HobbiesLandingPageComponent } from './hobbies/hobbies-landing-page/hobbies-landing-page.component';
import { ImageGalleryComponent } from './projects/image-gallery/image-gallery/image-gallery.component';
import { SpotifyPluginComponent } from './projects/spotify-plugin/spotify-plugin.component';
import { AuthGuard } from './guards/authentication.guard';
import { ResumeComponent } from './resume/resume.component';
import { LeetcodePluginComponent } from './projects/leetcode-plugin/leetcode-plugin.component';
import { ContactComponent } from './contact/contact.component';
import { ProjectsComponent } from './projects/projects.component';
import { MetronomeComponent } from './projects/music/metronome/metronome.component';
import { DrumpadComponent } from './projects/music/drumpad/drumpad.component';
const routes: Routes = [
  { path: 'about-me', component: AboutMeComponent,
  },
  {path:'', component: HomeComponent},
  // {path:'hobbies', component: HobbiesLandingPageComponent},

  // {path:'leet-code-plugin', component: LeetcodePluginComponent},
  // {path:'image-gallery', component: ImageGalleryComponent},
  // {path:'spotify-project',   
  // component: SpotifyPluginComponent,
  // // canActivate: [AuthGuard],
  // },
  {path:'contact',   
  component: ContactComponent,
  // canActivate: [AuthGuard],
  },
  {path:'projects',   
  component: ProjectsComponent,
  // canActivate: [AuthGuard],
  },
  // {path:'spotify-project/authenticated',   
  // component: SpotifyPluginComponent,
  // // canActivate: [AuthGuard],
  // },
  // {path:'resume', component: ResumeComponent,},
  // {
  //   path: 'login',
  //   loadChildren: () => import('./shared/login/login.module').then(m => m.LoginModule)
  // },
  {path:'metronome', component:MetronomeComponent},
  {path:'drumpad', component:DrumpadComponent},
  {path: '**', redirectTo: '', pathMatch: 'full'},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
