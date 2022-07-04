import { Component, Input } from '@angular/core'
import { trigger, state, style, transition, animate } from '@angular/animations';


@Component({
    selector: 'golf-card',
    templateUrl: './golf-card.component.html',
    styleUrls: ['./golf-card.component.sass'],
    animations: [
        trigger('bodyExpansion', [
          state('collapsed, void', style({ height: '0px', visibility: 'hidden' })),
          state('expanded', style({ height: '*', visibility: 'visible' })),
          transition('expanded <=> collapsed, void => collapsed',
            animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
        ])
      ]
})
export class GolfCardComponent  {
    @Input() golfPost: any
    state = 'collapsed';

    constructor() {}

    toggle(): void {
      this.state = this.state === 'collapsed' ? 'expanded' : 'collapsed';
    }

    hasLength(text: string): boolean {
        return !!(text && text.length)
    }

    getPostText(): string {
        return this.hasLength(this.golfPost?.data?.selftext) ? 
        this.golfPost?.data?.selftext : 
        this.golfPost?.data?.title
    }

    isImage(url: string): boolean {
      return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
    }

   

}