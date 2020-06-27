import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccesibilidadService {

  constructor() { }

  activeAccess: boolean = false;

  getSpeech(msg: string)
  {
    if(this.activeAccess)
    {
      speechSynthesis.speak(new SpeechSynthesisUtterance(msg));
    }
  }

}
