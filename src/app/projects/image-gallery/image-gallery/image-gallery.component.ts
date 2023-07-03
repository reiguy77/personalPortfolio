import { Component, SimpleChange } from '@angular/core';

@Component({
  selector: 'app-image-gallery',
  templateUrl: './image-gallery.component.html',
  styleUrls: ['./image-gallery.component.less']
})
export class ImageGalleryComponent {
  title = "Customizable Image Gallery";
  description =`I had tried to import and integrate a masonry-image gallery, but in the time I wasted trying to get those to work and look good I could have built my own basic version. 
  So that's what I decided to do.`

  items = [
    {
      id: '1',
      size: '1400-933',
      src:
        'https://images.unsplash.com/photo-1542103749-8ef59b94f47e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80',
      thumb:
        'https://static.wixstatic.com/media/d39b69_4d3d5f7165464835b00f24d328d88bb1~mv2.jpg/v1/fill/w_205,h_274,fp_0.51_0.5,q_90/d39b69_4d3d5f7165464835b00f24d328d88bb1~mv2.jpg',
      subHtml: `<div class="lightGallery-captions">
            <h4>Photo by <a href="https://unsplash.com/@dann">Dan</a></h4>
            <p>Published on November 13, 2018</p>
        </div>`,
        description: 'This is a picture'
    },
    {
      id: '2',
      size: '1400-933',
      src:
        'https://images.unsplash.com/photo-1473876988266-ca0860a443b8?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80',
      thumb:
        'https://static.wixstatic.com/media/d39b69_5fd38209cff44e3590c10630dbee8f44~mv2.jpeg/v1/fill/w_1025,h_1370,fp_0.45_0.37,q_90/d39b69_5fd38209cff44e3590c10630dbee8f44~mv2.webp',
      subHtml: `<div class="lightGallery-captions">
            <h4>Photo by <a href="https://unsplash.com/@kylepyt">Kyle Peyton</a></h4>
            <p>Published on September 14, 2016</p>
        </div>`,
        description: 'This is a picture'
    },
    {
      id: '3',
      size: '1400-932',
      src:
        'https://static.wixstatic.com/media/d39b69_6df39ebb90b44e5da7d5997a0af84b24~mv2.jpg/v1/fill/w_1466,h_978,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Headshot.jpg',
      thumb:
        'https://static.wixstatic.com/media/d39b69_af7c2221ed624863bcf1d7011a0858df~mv2.jpeg/v1/fill/w_1025,h_1370,fp_0.36_0.34,q_90/d39b69_af7c2221ed624863bcf1d7011a0858df~mv2.webp',
      subHtml: `<div class="lightGallery-captions">
            <h4>Photo by <a href="https://unsplash.com/@jxnsartstudio">Garrett Jackson</a></h4>
            <p>Published on May 8, 2020</p>
        </div>`,
        description: 'This is a picture'
    },
    {
      id: '4',
      size: '1400-932',
      src:
        'https://static.wixstatic.com/media/d39b69_6df39ebb90b44e5da7d5997a0af84b24~mv2.jpg/v1/fill/w_1466,h_978,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Headshot.jpg',
      thumb:
        'https://static.wixstatic.com/media/d39b69_f80daca7b71d4179987885b9db33f7ad~mv2.jpg/v1/fill/w_1025,h_1370,fp_0.45_0.18,q_90/d39b69_f80daca7b71d4179987885b9db33f7ad~mv2.jpg',
      subHtml: `<div class="lightGallery-captions">
            <h4>Photo by <a href="https://unsplash.com/@jxnsartstudio">Garrett Jackson</a></h4>
            <p>Published on May 8, 2020</p>
        </div>`,
        description: 'This is a picture'
    },
    {
      id: '5',
      size: '1400-932',
      src:
        'https://static.wixstatic.com/media/d39b69_6df39ebb90b44e5da7d5997a0af84b24~mv2.jpg/v1/fill/w_1466,h_978,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Headshot.jpg',
      thumb:
        'https://static.wixstatic.com/media/d39b69_41d8707f1b174f74aedf8da510e7e7fb~mv2.jpg/v1/fill/w_1025,h_1370,q_90/d39b69_41d8707f1b174f74aedf8da510e7e7fb~mv2.jpg',
      subHtml: `<div class="lightGallery-captions">
            <h4>Photo by <a href="https://unsplash.com/@jxnsartstudio">Garrett Jackson</a></h4>
            <p>Published on May 8, 2020</p>
        </div>`,
        description: 'This is a picture'
    },
    {
      id: '6',
      size: '1400-932',
      src:
        'https://static.wixstatic.com/media/d39b69_6df39ebb90b44e5da7d5997a0af84b24~mv2.jpg/v1/fill/w_1466,h_978,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Headshot.jpg',
      thumb:
        'https://static.wixstatic.com/media/d39b69_ce8fef70336e4c51b518af42e430850f~mv2.jpg/v1/fill/w_1025,h_1370,q_90/d39b69_ce8fef70336e4c51b518af42e430850f~mv2.jpg',
      subHtml: `<div class="lightGallery-captions">
            <h4>Photo by <a href="https://unsplash.com/@jxnsartstudio">Garrett Jackson</a></h4>
            <p>Published on May 8, 2020</p>
        </div>`,
        description: 'This is a picture'
    }
    
  ];

  hoverOptions = {
    showZoom : true,
    showOverlay : true,
    overlayColor : 'rgba(106, 53, 0, 0.225)',
    numColumns : '6'
  }

  showEditGalleryModal = false;

  logDetails(){
    console.log(this.hoverOptions);
  }

  ngOnChange(changes:SimpleChange){
    console.log(changes);
  }

  updateHoverOptions(){
    this.hoverOptions = {
      ...this.hoverOptions
    }
    console.log('changed',this.hoverOptions);
  }

  color:string = '#FFFFFF';

}
