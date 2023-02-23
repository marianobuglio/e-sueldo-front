import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from 'app/core/auth/auth.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent implements OnInit{
  token:string
  snapshot : ActivatedRouteSnapshot
  constructor(
    private _router: ActivatedRoute,
    private _authService: AuthService
  ){
    this.snapshot = _router.snapshot
  }

  ngOnInit(): void {
    this.token = this.snapshot.paramMap.get('token')
    if(!this.token){
      console.log("no hay token")
    }else{
      this._authService.verifyEmail(this.token).subscribe(
        (res) => {
          console.log(res)
        },
        (err) => {
          console.error(err)
        }
      )
    }
    
  }
}
