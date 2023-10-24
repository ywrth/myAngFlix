import { trigger, state, style, transition, animate } from '@angular/animations';

export const fadeInAnimation =
  trigger('fadeInAnimation', [
    state('void', style({ opacity: 0 })),
    transition(':enter', [
      animate('1s', style({ opacity: 1 })),
    ]),
  ]);
