import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { HomeComponent } from './home.component';
import { HeaderComponent } from './header/header.component';
import { MatIconModule } from '@angular/material/icon';
import { ChatboxComponent } from './chatbox/chatbox.component';
import { TruncatePipe } from '../pipes/truncate.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule
  ],
  declarations: [HomeComponent, HeaderComponent, ChatboxComponent, TruncatePipe]
})
export class HomeModule { }
