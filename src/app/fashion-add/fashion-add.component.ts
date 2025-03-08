import { Component } from '@angular/core';
import { FashionAPIService } from '../services/fashion-api.service';  
import { Fashion } from '../fashion';  
import { Router } from '@angular/router';

@Component({
  selector: 'app-fashion-add',
  standalone: false,
  templateUrl: './fashion-add.component.html',
  styleUrls: ['./fashion-add.component.css']
})
export class FashionAddComponent {
  fashion: Fashion = new Fashion();  
  errMessage: string = '';
  quillConfig = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],  
      [{ 'header': [1, 2, 3, false] }],         
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],  
      [{ 'align': [] }],                        
      ['link', 'image', 'video'],                
      ['clean']                                  
    ]
  };
  

  constructor(private _service: FashionAPIService, private _router: Router) {}

  onFileSelected(event: any) { 
    let file = event.target.files[0];
    let reader = new FileReader();
    
    reader.onload = () => { 
      if (this.fashion) {
        this.fashion.fashion_image = reader.result!.toString(); 
      }
    }; 

    reader.onerror = (error) => { 
      console.error('Lỗi khi đọc file:', error); 
    };

    reader.readAsDataURL(file);
  }
  
  postFashion() {
    console.log("Dữ liệu trước khi gửi:", this.fashion);

    if (!this.fashion.style || !this.fashion.fashion_subject || !this.fashion.fashion_detail) {
        this.invalidFashion();
        return;
    }

    this.fashion.created_at = new Date(); 

    this._service.postFashion(this.fashion).subscribe({
        next: (data: any) => {  
            console.log("Fashion đã thêm thành công:", data);
            window.alert('Thêm Fashion thành công!');

            this.fashion = new Fashion();  

                       this._router.navigate(['/fashion']).then(() => {
                window.location.reload(); 
            });
        },
        error: (err: any) => {  
            console.error("Lỗi khi thêm Fashion:", err);
            this.errMessage = "Lỗi khi thêm Fashion: " + err.message; 
        }
    });
}


  invalidFashion() {
    this.errMessage = 'Dữ liệu không hợp lệ. Vui lòng nhập đủ thông tin!';
  }

  success() {
    window.alert('Thêm Fashion thành công!');
    
    this.fashion = new Fashion();  

    setTimeout(() => {
      this._router.navigate(['/fashion']);
    }, 1000); 
  }

    goBack() {
      this._router.navigate(['/fashion']);
    }
  }
  


