import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  standalone: true,
  imports: [
    
    RouterOutlet,
    SidebarComponent,
    CommonModule
  ],
})
export class TabsComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
