import { Component } from '@angular/core';

import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material/icon';
import { ToolbarDataService } from './toolbar-data.service';

const  THUMBUP_ICON =
`
<svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px">
  <path d="M0 0h24v24H0z" fill="none"/>
  <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.` +
`44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5` +
`1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-1.91l-.01-.01L23 10z"/>
</svg>
`;

const BARS_ICON = 
`
<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"/></svg>
`

@Component({
  selector: 'toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.less']
})
export class ToolbarComponent {
  activePage = 'Home';
  toolbarData: any;
  title = 'rmclaren-website';
  logoText = 'Reilly McLaren'
  pages = [
    {
      name:'Home',
      link: 'home'
    },
    {
      name:'About Me',
      link: 'about-me'
    },
    {
      name:'Resume',
      link: 'resume'
    },
    {
      name:'Projects',
      link: 'projects',
      subPages: [{
        name: 'Personal Website',
        link:'#'
      },
      {
        name : 'Robinhood',
        link:'#'
      },
      {
        name : 'Image Gallery',
        link:'image-gallery'
      },
      {
        name:'Spotify Project',
        link: 'spotify-project'
      }]
    },
    // {
    //   name:'Hobbies',
    //   link: 'hobbies',
    //   subpages: [
    //     {
    //       name:'Music',
    //       link: 'music'
    //     },
    //     {
    //       name:'Math',
    //       link: 'math'
    //     },
    //     {
    //       name:'Writing',
    //       link: 'writing'
    //     }
    //   ]
    // }
    {
      'name':'Spotify',
      'link': 'spotify-project'
    }
  ]

  updateCurrentPage(newPage:string){
    console.log('UPDATING PAGE:', newPage)
    this.activePage = newPage;
    this.updateToolbarData();
  }
  
  toggleNavbarDropdown() {
    console.log('hello');
    let toolbarDropdown = document.getElementById('navbarSupportedContent');
    if(toolbarDropdown){
      toolbarDropdown.classList.toggle('collapsed');
    }
  }

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, private toolbarDataService: ToolbarDataService) {
    iconRegistry.addSvgIconLiteral('thumbs-up', sanitizer.bypassSecurityTrustHtml(THUMBUP_ICON));
    iconRegistry.addSvgIconLiteral('bars', sanitizer.bypassSecurityTrustHtml(BARS_ICON));
    this.toolbarData = this.toolbarDataService.getToolbarData();
    if(this.toolbarData.activePage == null){
      this.updateCurrentPage('Home');
    }
  }


  updateToolbarData() {
    // Update the toolbar data and save it to the shared service
    this.toolbarData = { activePage: this.activePage};
    console.log(this.toolbarData)
    this.toolbarDataService.setToolbarData(this.toolbarData);
  }
  isMenuOpen: boolean = false;
  
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

 
  
}
