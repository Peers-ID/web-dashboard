import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';

export const fadingTransition =
  trigger('fading', [
    state('in', style({
      transform: 'scale(1)',
      opacity: '1'
    })),
    transition('void => *', [
      style({transform: 'scale(1.025)', opacity: '0'}),
      animate(2000)
    ]),
    transition('* => void', [
      style({transform: 'scale(0.95)', opacity: '0', position: 'absolute'}),
      animate(2000)
    ])
  ]);

export const flatFadingTransition =
  trigger('fade', [
    state('in', style({
      opacity: 1
    })),
    transition('void => *', [
      style({opacity: 0}),
      animate(300)
    ])
  ]);

export const slideFadeTransition =
  trigger('slideFade', [
    state('void', style({
      transform: 'translateX(-1rem)',
      opacity: '0'
    })),
    state('in', style({
      transform: 'translateX(0rem)',
      opacity: '1'
    })),
    state('void', style({
      transform: 'translateX(1rem)',
      opacity: '0'
    })),
    transition('void => in', animate('200ms ease-in')),
    transition('in => out', animate('200ms ease-in'))
  ]);

export const topSlideTransition =
  trigger('topSlide', [
    state('void', style({
      transform: 'translateY(-.5rem)',
      opacity: 0
    })),
    state('in', style({
      transform: 'translateY(0)',
      opacity: 1
    })),
    transition('void => in', animate('200ms ease'))
  ]);

export const bottomSlideTransition =
  trigger('bottomSlide', [
    state('void', style({
      transform: 'translateY(.5rem)',
      opacity: 0
    })),
    state('in', style({
      transform: 'translateY(0)',
      opacity: 1
    })),
    transition('void => in', animate('200ms ease'))
  ]);

export const hangingTransition =
  trigger('swap', [
    state('in', style({
      opacity: 1,
      transform: 'translateY(0)',
      position: 'relative'
    })),
    transition('void => *', [
      animate('.3s ease', keyframes([
        style({opacity: 0, transform: 'translateY(-2rem)', offset: 0 }),
        style({opacity: 1, transform: 'translateY(.5rem)', offset: 0.7 }),
        style({opacity: 1, transform: 'translateY(0)', offset: 1.0 })
      ]))
    ])
  ]);

export const poppingTransition =
  trigger('pop', [
    state('in', style({
      opacity: 1,
      transform: 'scale(1)',
      position: 'relative'
    })),
    transition('void => *', [
      animate('.3s ease-in-out', keyframes([
        style({opacity: 0, transform: 'scale(1)', offset: 0 }),
        style({opacity: 1, transform: 'scale(1.02)', offset: 0.7 }),
        style({opacity: 1, transform: 'scale(1)', offset: 1.0 })
      ]))
    ]),
    transition('* => void', [
      animate('0.2s 0.1s ease-out', style({
        opacity: 0,
        transform: 'scale(.9)',
        position: 'absolute',
        transformOrigin: 'top'
      }))
    ])
  ]);
