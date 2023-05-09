import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { HomePageComponent } from "./home-page/home-page.component";
import { HomeRoutingModule } from "./home-routing.module";

@NgModule({
  declarations: [HomePageComponent],
  imports: [CommonModule, HttpClientModule, RouterModule, HomeRoutingModule],
  exports: [HomePageComponent],
})
export class HomeModule {}
