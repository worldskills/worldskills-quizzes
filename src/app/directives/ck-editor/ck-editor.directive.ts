import {Directive, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {FormControl} from '@angular/forms';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpEventType} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {Subscription} from 'rxjs';

class UploadAdapter {
  private httpObservable: Subscription;

  constructor(private loader: any, private http: HttpClient) {
  }

  upload() {
    return this.loader.file.then(file => new Promise((resolve, reject) => {
      const data = new FormData();
      data.append('file', file);
      this.httpObservable = this.http.post(environment.worldskillsApiImages, data, {
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

@Directive({
  selector: '[appCkEditor]'
})
export class CkEditorDirective implements OnInit, OnChanges, OnDestroy {
  @Input() formControl: FormControl;
  private editor;
  private subscription: Subscription;

  constructor(private elementRef: ElementRef, private http: HttpClient) {
  }

  ngOnInit(): void {
    ClassicEditor.create(this.elementRef.nativeElement, {
      extraPlugins: [UploadAdapter]
    }).then(
      editor => {
        this.editor = editor;
        if (this.formControl) {
          this.subscription = this.formControl.valueChanges.subscribe(value => {
            if (this.editor.getData() !== value) {
              this.editor.setData(value || '');
            }
          });
        }
        this.editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
          return new UploadAdapter(loader, this.http);
        };
        this.editor.model.document.on('change:data', () => {
          if (this.formControl) {
            this.formControl.setValue(this.editor.getData());
          } else {
            this.elementRef.nativeElement.setValue(this.editor.getData());
          }
        });
      }
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.formControl) {
      if (this.editor) {
        if (this.subscription) {
          this.subscription.unsubscribe();
        }
        this.subscription = this.formControl.valueChanges.subscribe(value => {
          if (this.editor.getData() !== value) {
            this.editor.setData(value || '');
          }
        });
        this.editor.setData(this.formControl.value);
      }
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.editor.destroy();
  }

}
