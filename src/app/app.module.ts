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
import { PieChartComponent } from './charts/pie-chart/pie-chart.component';
import { LeetcodePluginComponent } from './projects/leetcode-plugin/leetcode-plugin.component';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { SocialMediaLinksComponent } from './shared/social-media-links/social-media-links.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SkillBarComponent } from './shared/skill-bar/skill-bar.component';
import { SkillsComponent } from './about-me/skills/skills.component';
import { JournalComponent } from './journal/journal.component';
import { NgxTimelineModule } from '@frxjs/ngx-timeline';
import { DeveloperJourneyComponent } from './about-me/developer-journey/developer-journey.component';
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';
import { QuoteComponent } from './shared/quote/quote.component';
import { ProjectPreviewComponent } from './projects/project-preview/project-preview.component';
import { ContactComponent } from './contact/contact.component';
import { ProjectsComponent } from './projects/projects.component';
import { MetronomeComponent } from './projects/music/metronome/metronome.component';
import { SelectorButtonsComponent } from './shared/selector-buttons/selector-buttons.component';
import { DrumpadComponent } from './projects/music/drumpad/drumpad.component';
import { BeatComponent } from './projects/music/drumpad/beat/beat.component';
import { TrackComponent } from './projects/music/drumpad/track/track.component';
import { EditableTextComponent } from './shared/editable-text/editable-text.component';
import { DropdownComponent } from './shared/dropdown/dropdown.component';
import { SelectSoundComponent } from './projects/music/drumpad/select-sound/select-sound.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SelectSavedRhythmComponent } from './projects/music/drumpad/select-saved-rhythm/select-saved-rhythm.component';
export function playerFactory(): any {  
  return import('lottie-web');
}

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
    EchartsComponent,
    PieChartComponent,
    LeetcodePluginComponent,
    SpinnerComponent,
    SocialMediaLinksComponent,
    SkillBarComponent,
    SkillsComponent,
    JournalComponent,
    DeveloperJourneyComponent,
    QuoteComponent,
    ProjectPreviewComponent,
    ContactComponent,
    ProjectsComponent,
    MetronomeComponent,
    SelectorButtonsComponent,
    DrumpadComponent,
    BeatComponent,
    TrackComponent,
    EditableTextComponent,
    DropdownComponent,
    SelectSoundComponent,
    SelectSavedRhythmComponent,
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
    FontAwesomeModule,
    NgxTimelineModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts') // Import the echarts library
    }),
    LottieModule.forRoot({ player: playerFactory }),
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
