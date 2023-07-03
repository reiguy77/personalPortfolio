import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AboutMeComponent } from './about-me/about-me.component';
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CardContainerComponent } from './shared/card-container/card-container.component';
import { CardComponent } from './shared/card/card.component';
import { PhotoGalleryComponent } from './shared/photo-gallery/photo-gallery.component';
import { PreviewLinkComponent } from './shared/preview-link/preview-link.component';
import { ToolbarModule } from './shared/toolbar/toolbar.module';
import { SafePipe } from './safe.pipe';
import { HobbiesLandingPageComponent } from './hobbies/hobbies-landing-page/hobbies-landing-page.component';
import { GoalFormComponent } from './goals/new-goal-form/new-goal-form.component';
import { FormsModule } from '@angular/forms';
import { GoalComponent } from './goals/goal/goal.component';
import { DailyGoalResponseFormComponent } from './goals/daily-goal-response-form/daily-goal-response-form.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { ChartComponent } from './chart/chart.component';
import { NgChartsModule } from 'ng2-charts';
import { NgxMasonryModule } from 'ngx-masonry';
import { ImageUploadComponent } from './shared/image-upload/image-upload.component';
import { LightgalleryModule } from 'lightgallery/angular';
import { ImageGalleryComponent } from './projects/image-gallery/image-gallery/image-gallery.component';
import { ColorPickerModule } from 'ngx-color-picker';
import { ProjectTemplateComponent } from './projects/project-template/project-template.component';
import { ColorPickerComponent } from './shared/color-picker/color-picker.component';
import { SpotifyPluginComponent } from './projects/spotify-plugin/spotify-plugin.component';
import { ResumeComponent } from './resume/resume.component';
import { HeroImageComponent } from './shared/hero-image/hero-image.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EchartsComponent } from './echarts/echarts.component';
import { NgxEchartsModule } from 'ngx-echarts';
@NgModule({
  declarations: [
    AppComponent,
    AboutMeComponent,
    HomeComponent,
    CardComponent,
    CardContainerComponent,
    PreviewLinkComponent,
    HobbiesLandingPageComponent,
    GoalFormComponent,
    SafePipe,
    GoalComponent,
    DailyGoalResponseFormComponent,
    ChartComponent,
    PhotoGalleryComponent,
    ImageUploadComponent,
    ImageGalleryComponent,
    ProjectTemplateComponent,
    ColorPickerComponent,
    SpotifyPluginComponent,
    ResumeComponent,
    HeroImageComponent,
    EchartsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ToolbarModule,
    HttpClientModule,
    FormsModule,
    DragDropModule,
    NgChartsModule,
    NgxMasonryModule,
    LightgalleryModule,
    ColorPickerModule,
    BrowserAnimationsModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts') // Import the echarts library
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
