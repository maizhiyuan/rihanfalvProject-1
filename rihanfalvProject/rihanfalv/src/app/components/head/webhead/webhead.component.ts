import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import {InputData} from '../langing/land/input'
import { Input } from '@angular/compiler/src/core';

@Component({
  selector: 'app-webhead',
  templateUrl: './webhead.component.html',
  styleUrls: ['./webhead.component.css']
})
export class WebheadComponent implements OnInit {
  JapanOrKoreaBool:boolean=true;//true代表日本，false代表韩国
  JapanOrKorea:string="日"

  @Output() isJapan=new EventEmitter<boolean>();
  wasJapan:boolean=true;

  BackgroundImage:string="../../../../assets/背景图片1.png";
  IfLogin:boolean=false;  //是否已经登录


  In:InputData={ID:'',IfLogin:false,Tip:"",Image,Token:''}

  constructor() { }

  ngOnInit() {
  }
  //日韩转换的按钮
  JapanKoreaChange(){
    this.JapanOrKoreaBool=!this.JapanOrKoreaBool;
    if(this.JapanOrKoreaBool){
      this.JapanOrKorea="日";
      this.BackgroundImage="../../../../assets/背景图片1.png"
      this.wasJapan=true;
    }
    else{
      this.JapanOrKorea="韩"
      this.BackgroundImage="../../../../assets/背景图片2.png"
      this.wasJapan=false
    }
    // 弹出日韩状态
    this.isJapan.emit(this.wasJapan);
  }
  login(){
    this.IfLogin=true;
  }

  close(){
    this.IfLogin=false;
  }

  getLoginData(input:InputData){
    this.In=input;
  }

}
