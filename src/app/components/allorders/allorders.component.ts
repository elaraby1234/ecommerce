import { threadId } from 'node:worker_threads';
import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { inherits } from 'util';
import { OrdersService } from '../../core/services/orders.service';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { ICart } from '../../core/interfaces/icart';
import Swal from 'sweetalert2';
import { CurrencyPipe } from '@angular/common';
import { AllordersService } from '../../core/services/allorders.service';
import { IAllorders } from '../../core/interfaces/iallorders';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-allorders',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.css'
})
export class AllordersComponent implements OnInit {


private readonly _OrdersService = inject(OrdersService)
private readonly _AuthService = inject(AuthService)



userid:string = '';
AllOrdersList : WritableSignal<IAllorders[]> = signal([])

ngOnInit(): void {

  this._AuthService.SaveUserData()
  this.userid = this._AuthService.userData.id
  this._OrdersService.getUserOrders(this.userid).subscribe({
    next:(res)=>{
      console.log(res);
      this.AllOrdersList.set(res)
      
    }
  })
}
  

  

}
