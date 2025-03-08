import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FashionAPIService } from '../services/fashion-api.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-fashion-detail',
  standalone: false,
  templateUrl: './fashion-detail.component.html',
  styleUrls: ['./fashion-detail.component.css']
})
export class FashionDetailComponent {
  fashionId: string = '';
  fashion: any = null;
  errMessage: string = '';

  constructor(
    private _service: FashionAPIService, 
    private route: ActivatedRoute,
    private _router: Router) {
    this.route.params.subscribe(params => {
      this.fashionId = params['id'];
      console.log("ID nhận được:", this.fashionId); 
      if (this.fashionId) {
        this.getFashionDetail();
      } else {
        this.errMessage = "ID không hợp lệ!";
      }
    });
  }

  getFashionDetail() {
    this._service.getFashion(this.fashionId).subscribe({
      next: (data: any) => { this.fashion = data; },
      error: (err: any) => { this.errMessage = "Không tìm thấy Fashion."; }
    });
  }

  goBack() {
    this._router.navigate(['/fashion']);
  }
}
