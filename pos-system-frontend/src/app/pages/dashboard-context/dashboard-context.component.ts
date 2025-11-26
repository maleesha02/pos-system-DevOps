import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {MatIcon} from '@angular/material/icon';
import {MatAnchor, MatIconButton} from '@angular/material/button';
import {MatToolbar} from '@angular/material/toolbar';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {MatDivider} from '@angular/material/divider';

@Component({
  selector: 'app-dashboard-context',
  imports: [
    RouterOutlet,
    MatIcon,
    MatAnchor,
    RouterLink,
    RouterLinkActive,
    MatToolbar,
    MatIconButton,
    MatMenuTrigger,
    MatMenu,
    MatDivider,
    MatMenuItem
  ],
  templateUrl: './dashboard-context.component.html',
  styleUrl: './dashboard-context.component.scss'
})
export class DashboardContextComponent {

  logout() {

  }
}
