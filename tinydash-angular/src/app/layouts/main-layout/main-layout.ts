import { Component, HostBinding } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar';
import { SidebarComponent } from '../../components/sidebar/sidebar';
import { FooterComponent } from '../../components/footer/footer';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, SidebarComponent, FooterComponent],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.scss'
})
export class MainLayoutComponent { 
  isCollapsed = false;

  toggleSidebar(){
    this.isCollapsed = !this.isCollapsed;
    if (this.isCollapsed) {
      document.body.classList.add('collapsed');
    } else {
      document.body.classList.remove('collapsed');
    }
  }

  onMouseEnter(){
    if(this.isCollapsed){
      this.isCollapsed = false;
      document.body.classList.remove('collapsed');  
    }
  }


}
