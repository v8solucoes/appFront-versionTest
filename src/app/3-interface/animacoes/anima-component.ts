import { trigger, state, style, transition, animate } from '@angular/animations';

export const AnimaComponent = [
  trigger('flyInOut', [

    state('true', style({
      width: '*',
    })),
    state('false', style({
      width: '*',
    })),
    transition('* => *', [
      animate('0.5s ease-in-out', style({
         transform: 'translateX(-110%)',
         opacity: 0.5
         })),
      animate('0.5s ease-in-out', style({
        transform: 'translateX(0)',
        opacity: 1.0
        }))
    ]),
  ]),

]
