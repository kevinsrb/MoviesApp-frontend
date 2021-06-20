import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Clasification } from '../models/clasification';

@Injectable({
  providedIn: 'root'
})
export class ClasificationService {
  selectedClasification: Clasification;
  clasifications: Clasification[];
  readonly URL_API = '/api/Clasificacion';

  constructor(private http: HttpClient) {
    this.selectedClasification = new Clasification();
  }

  getClasifications() {
    return this.http.get<Clasification[]>(this.URL_API)
  }

  postClasification(clasification: Clasification) {
    return this.http.post(this.URL_API, clasification);
  }
  
  updateClasification(clasification: Clasification) {
    return this.http.put(this.URL_API + `/${clasification._id}`, clasification);
  }

  deleteClasification(_id: string) {
    return this.http.delete(this.URL_API + `/${_id}`);
  }
}
