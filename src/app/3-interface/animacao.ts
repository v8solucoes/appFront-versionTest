import { trigger, state, style, transition, animate } from '@angular/animations';

export const Animacoes = [
  trigger('listaHorizontalScroll', [

    state('true', style({
      width: '*',
      scrollBehavior: 'smooth'

    })),
    state('false', style({
      width: '*',
      scrollBehavior: 'smooth'
    })),
    transition('* => true', [
      animate('0.3.5s')
    ]),
    transition('false => *', [
      animate('0.3.5s')
    ]),

  ]),
  trigger('barra', [

    state('true', style({
      margin: '*',
      overflow: 'hidden'
    })),
    state('false', style({
      height: '0px',
      overflow: 'hidden'
    })),
    transition('* => true', [
      animate('0.3.5s')
    ]),
    transition('false => *', [
      animate('0.3.5s')
    ]),

  ]),
  trigger('navAbrirRodape', [

    state('true', style({
      margin: '*',
      overflow: 'hidden'
    })),
    state('false', style({
      height: '0px',
      overflow: 'hidden'
    })),
    transition('* => true', [
      animate('0.3.5s')
    ]),
    transition('false => *', [
      animate('0.3.5s')
    ]),

  ]),

  trigger('navAbrirTopo', [

    state('true', style({
      marginTop: '*',
      overflow: 'hidden'
    })),
    state('false', style({
      marginTop: '-70px',
      overflow: 'hidden'
    })),
    transition('* => true', [
      animate('0.3.5s')
    ]),
    transition('false => *', [
      animate('0.3.5s')
    ]),

  ]),

  trigger('entrarHorizontal', [

    transition('void => *', [
      style({ transform: 'translateY(100%)', opacity: 0, }),
      animate('0.3.5s ease-in-out', style({ height: 0 })),
      animate('0.3.5s ease-in-out')
    ]),
    transition('* => void', [
      animate('0.1.5s ease-in-out', style({ transform: 'translateY(50%)', opacity: 0, })),
      animate('0.1.5s ease-in-out', style({ height: 0 }))
    ])
  ]),
  trigger('entrarSair', [

    transition('void => *', [
      style({ transform: 'translateY(-100%)', opacity: 0, }),
      animate('0.3.5s ease-in-out', style({ height: '56px' })),
      animate('0.3.5s ease-in-out')
    ]),
    transition('* => void', [
      animate('0.3.5s ease-in-out', style({ transform: 'translateX(50%)', opacity: 0, })),
      animate('0.3.5s ease-in-out', style({ height: 0 }))
    ])
  ]),

  trigger('icone', [

    state('true', style({
      transform: 'rotate(180deg)'
    })),
    state('false', style({
      transform: 'rotate(0)'
    })),
    transition('* => true', [
      animate('0.1s')
    ]),
    transition('* => false', [
      animate('0.1s')
    ]),
  ]),

  trigger('conteudo', [
    state('true', style({
      height: '*',
      opacity: 1,
    })),
    state('false', style({
      height: '0px',
      overflow: 'hidden',
      opacity: 0,

    })),
    transition('* => true', [
      animate('0.8.5s ease-in-out')
    ]),
    transition('* => false', [
      animate('0.3.5s ease-in-out')
    ]),

  ]),
  trigger('conteudoMenu', [
    state('true', style({
      height: '*',
      opacity: 1,
    })),
    state('false', style({
      height: '0px',
      overflow: 'hidden',
      opacity: 0,

    })),
    transition('* => true', [
      animate('0.1.5s ease-in-out')
    ]),
    transition('* => false', [
      animate('0.1.5s ease-in-out')
    ]),

  ]),

  /*      state('entrar-sair', style({ transform: 'translateX(0)', opacity: 1, })),

     transition('void => *', [
       style({ transform: 'translateY(-100%)', opacity: 0, }),
       animate('0.3.5s ease-in-out', style({ height: '56px' })),
       animate('0.3.5s ease-in-out')
     ]),

     transition('* => void', [
       animate('0.3.5s ease-in-out', style({ transform: 'translateX(50%)', opacity: 0, })),
       animate('0.3.5s ease-in-out', style({ height: 0 }))
     ]), */


]
