import {Subscription} from "rxjs";
import {HttpClient, HttpEventType} from "@angular/common/http";
import {environment} from "../environments/environment";
import {tap} from "rxjs/operators";

export class UploadAdapter {
  private httpObservable: Subscription;

  constructor(private loader: any, private http: HttpClient) {
  }

  upload() {
    return this.loader.file.then(file => new Promise((resolve, reject) => {
      const data = new FormData();
      data.append('file', file);
      this.httpObservable = this.http.post(`${environment.worldskillsApiEndpoint}/images`, data, {
        reportProgress: true,
        observe: 'events'
      }).pipe(tap(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.loader.uploadTotal = event.total;
          this.loader.uploaded = event.loaded;
        }
      })).subscribe({
        next: event => {
          if (event.type === HttpEventType.Response) {
            resolve({default: (event.body as any).thumbnail});
          }
        },
        error: error => {
          reject(error);
        }
      });
    }));
  }

  abort() {
    this.httpObservable.unsubscribe();
  }

}

export const editorConfig = {
  toolbar: ['bold', 'italic', 'link', 'imageUpload']
};

export function onEditorReady(eventData, http: HttpClient) {
  eventData.plugins.get('FileRepository').createUploadAdapter = loader => {
    return new UploadAdapter(loader, http);
  };
}
