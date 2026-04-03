import { Component, EventEmitter, input, Output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss'
})
export class SidebarComponent {
  @Output() onMouseEnterSidebar = new EventEmitter<void>();
  isCollapsed = input(false);

  onMouseEnter(){
    this.onMouseEnterSidebar.emit();
  }
}
