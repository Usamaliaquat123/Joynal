import { Directive, Input, ElementRef, Renderer, OnInit, Component} from '@angular/core';

@Directive({
  selector: '[hide-header]', // Attribute selector
  host: {
    '(ionScroll)': 'onContentScroll($event)'
  }
})
export class HideHeaderDirective implements OnInit {

  @Input("header") header: HTMLElement;
  headerHeight;
  scrollContent;

  constructor(public element: ElementRef, public renderer: Renderer) {
    console.log('Hello HideHeaderDirective Directive');
  }

  ngOnInit(){
    this.headerHeight = this.header.clientHeight;
    this.renderer.setElementStyle(this.header, 'webkitTransition', 'top 500ms');
    this.scrollContent = this.element.nativeElement.getElementsByClassName("scroll-content")[0];
    this.renderer.setElementStyle(this.scrollContent, 'webkitTransition', 'margin-top 500ms');
  }

  onContentScroll(event){
    if(event.scrollTop > 40){
      this.renderer.setElementStyle(this.header, "top", "-450px")
      this.renderer.setElementStyle(this.scrollContent, "margin-top", "0px")
    } else {
      this.renderer.setElementStyle(this.header, "top", "0px");
      this.renderer.setElementStyle(this.scrollContent, "margin-top", "300px")
    }
  }
}