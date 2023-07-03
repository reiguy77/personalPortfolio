import { style, animate } from '@angular/animations';
import { Component, Input, ChangeDetectorRef, ChangeDetectionStrategy, SimpleChanges, ViewChild, Output, EventEmitter, HostBinding, OnChanges } from '@angular/core';
import { BeforeSlideDetail } from 'lightgallery/lg-events';
import lgZoom from 'lightgallery/plugins/zoom';
import lgThumbnail from 'lightgallery/plugins/thumbnail'
import lightGallery from 'lightgallery';
import { LightGallery } from 'lightgallery/lightgallery';
import { NgxMasonryComponent, NgxMasonryModule, NgxMasonryOptions } from 'ngx-masonry';
import { LightGallerySettings } from 'lightgallery/lg-settings';
// Look into using lightgallery

@Component({
  selector: 'photo-gallery',
  templateUrl: './photo-gallery.component.html',
  styleUrls: ['./photo-gallery.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhotoGalleryComponent implements OnChanges {
  @Input () items : {id: String, size: String, src: String, 
    thumb:String,  subHtml:String, description:String}[] = [];
  @Input() hoverOptions : {numColumns: string, showZoom:Boolean, showOverlay:Boolean, overlayColor:string} = {numColumns: '4', showZoom: true, showOverlay: true, overlayColor: 'rgba(0, 0, 0, 0.158)'};
  @Input() type? : string = "";
  @Input() hoverColor :string = '';
  @Output() imageClicked: EventEmitter<any> = new EventEmitter();

  @HostBinding('style.--num-columns')
      num_columns = this.hoverOptions.numColumns;
    
  @HostBinding('style.--hover-zoom')
      hover_zoom = '1';

  @HostBinding('style.--hover-opacity')
    hover_opacity = '0';

  @HostBinding('style.--hover-color')
    hover_color = this.hoverOptions.overlayColor;
  
  



  limit = 15;
  showInformation : Boolean = false;
  imageObjects: {'url':String, 'description': String, 'tags': [], 'showInformation': Boolean}[] = [];

  private lightGallery!: LightGallery;
  private needRefresh = false;
  ngAfterViewChecked(): void {
    if (this.needRefresh) {
      this.lightGallery.refresh();
      this.needRefresh = false;
    }
  }
  title = 'angular-demo';
  settings = {
    counter: false,
    plugins: [],
    thumbnail: true,

    galleryId: "nature",
    captions: true,
    lastRow: "hide",
    margins: 5
  };


  
  gallery:any;

  constructor (){
  }

  onInit = (detail:any): void => {
    this.lightGallery = detail.instance;    
  };



  ngOnInit() {
    this.setCSSProperties();
  }

  setCSSProperties() {
    console.log(this.hoverOptions, "AJHHHH");
    let zoomRatio = '1.1';
    let opacity = '1';
    this.num_columns = this.hoverOptions.numColumns;
    this.hover_color = this.hoverOptions.overlayColor;
    if(this.hoverOptions.showZoom){
      this.hover_zoom = zoomRatio;
    }
    if(this.hoverOptions.showOverlay){
      this.hover_opacity = opacity
    }
  }

  ngAfterViewInit() {
    const lgSettings: LightGallerySettings = {
      ...{ onBeforeSlide: this.onBeforeSlide,
      onInit: this.onInit,
     }, 
     ...this.settings,
     subHtmlSelectorRelative: true,
    };
    setTimeout(() => {

    const masonry = document.getElementById('image-gallery')
      if(masonry){
        console.log(masonry);
        this.lightGallery = lightGallery(masonry, lgSettings);
      }
    });
  
  }

  addImage = () => {
    this.items = [
      ...this.items,
      this.items[this.items.length-2]
    ];
    this.needRefresh = true;
  };


  onBeforeSlide = (detail: BeforeSlideDetail): void => {
    const { index, prevIndex } = detail;
  };

  ngOnChanges(changes: SimpleChanges) {
    console.log('Change:',changes);
      if (changes['hoverOptions'] && changes['hoverOptions'].currentValue) {
        console.log(changes['hoverOptions'].currentValue);
      }
    this.setCSSProperties();
  }


  // What I want is an image gallery that has select photos that should stand out
  // The others will fit in around these
}