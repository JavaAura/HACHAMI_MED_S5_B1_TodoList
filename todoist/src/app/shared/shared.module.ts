import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { RightSidebarComponent } from './right-sidebar/right-sidebar.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    SidebarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    HeaderComponent,
    RightSidebarComponent
  ],
  exports: [
    SidebarComponent,
    HeaderComponent,
    RightSidebarComponent
  ]
})
export class SharedModule { }
