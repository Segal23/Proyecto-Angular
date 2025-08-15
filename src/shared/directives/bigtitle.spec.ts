// import { Bigtitle } from './bigtitle';
// import { ElementRef, Renderer2 } from '@angular/core';

// describe('Bigtitle', () => {
//   let directive: Bigtitle;
//   let elRefMock: ElementRef;
//   let rendererMock: Renderer2;

//   beforeEach(() => {
//     // Mock de ElementRef
//     elRefMock = {
//       nativeElement: document.createElement('div')
//     };

//     // Mock de Renderer2
//     rendererMock = {
//       setStyle: jasmine.createSpy('setStyle')
//     } as any;

//     directive = new Bigtitle(elRefMock, rendererMock);
//   });

//   it('should create an instance', () => {
//     expect(directive).toBeTruthy();
//   });

//   it('should set font-size on init', () => {
//     directive.ngOnInit();
//     expect(rendererMock.setStyle).toHaveBeenCalledWith(elRefMock.nativeElement, 'font-size', '50px');
//   });
// });
