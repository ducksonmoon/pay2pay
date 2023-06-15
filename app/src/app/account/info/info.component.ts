import { Component, OnInit } from '@angular/core';
import { InfoService } from './info.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css'],
})
export class InfoComponent implements OnInit {
  public email: string;
  public file: File;

  constructor(private service: InfoService) {}

  ngOnInit(): void {
    this.service.info().subscribe((res: any) => (this.email = res.email));
  }

  // inputChange(fileInputEvent: any) {
  //   const file: File = fileInputEvent.target.files[0];

  //   const reader = new FileReader();
  //   reader.addEventListener('load', (event: any) => {
  //     this.selectedFile = new ImageSnippet(event.target.result, file);
  //   });

  //   this.service.upload(this.selectedFile.file).subscribe(
  //     (res) => {
  //       console.log(res);
  //     },
  //     (err) => {
  //       console.log(err);
  //     }
  //   );
  //   reader.readAsDataURL(file);
  // }

  // uploadField() {
  //   this.service.upload(this.file).subscribe((res) => console.log(res));
  // }

  processFile(imageInput: any) {
    this.file = imageInput.files[0];
  }

  uploadFile() {
    this.service.upload(this.file).subscribe((res) => console.log(res));
  }
}
