
import { Component, OnInit, Output } from '@angular/core';
import { User } from './user';
import { HttpClient } from '@angular/common/http';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  constructor(
    private Rhttp: HttpClient,
  ) { }

  ngOnInit() {
  }

  posturl = 'http://blackcardriver.cn:7080/register';      //注册的url
  getVerificationUrl = 'http://blackcardriver.cn:7080/sendVerification'

  confirmPassword: string                       //确认密码
  Verification: string                       //后端生成验证码
  formVerification: string                  //前端输入验证码
  user = new User(null, null)               //用户注册数据
  VerificationButtonValid: boolean = true;         //获取验证码按钮可点击判断条件



  onSubmit() {
    if (this.user.Password != this.confirmPassword) {
      alert("两次密码不一致")
      this.user.Password = null
      this.confirmPassword = null

    } else {
      if (this.formVerification != this.Verification || this.formVerification == null) {
        alert("验证码错误")
        this.formVerification = null
      } else {//两次密码相同和验证码相同
        this.Rhttp.post<User>(this.posturl, JSON.stringify(this.user)).subscribe((data: User) => {
          this.user = data
          if (data.Email == "0") {
            alert("用户已存在 ")
            this.user.Email = null;
          } else {
            if (this.user.Email == "1") {
              alert("邮箱格式不正确")
              this.user.Email = null;
            } else {
              if (data.Email == "2") {
                alert("密码含有空格")
                this.user.Email = null
                this.user.Password = null;
                this.confirmPassword = null;
              } else {
                alert("注册成功")
                this.event.emit(0)
              }
            }
          }
        })
      }
    }
  } //注册功能按钮

  getVerification() {
    if (this.user.Password != this.confirmPassword) {
      alert("两次密码不一致")
      this.user.Password = null
      this.confirmPassword = null
    } else {
      this.Rhttp.post<string>(this.getVerificationUrl, JSON.stringify(this.user)).subscribe((data: string) => {

        if (data == "0") {
          alert("邮箱格式不正确")
          this.user.Email = null
          this.Verification = null
          this.VerificationButtonValid = true;
        } else {
          if (data == "1") {
            alert('验证码发送失败，请稍后再试')
          } else {
            this.Verification = data;
            this.VerificationButtonValid = false;
            this.changeVerificationButton();
          }
        }
      })
    }
  }//获取验证码按钮

  @Output() event = new EventEmitter()

  interval: any;
  timeNumber: number;

  changeVerificationButton() {
    clearInterval(this.interval)
    this.timeNumber = 60
    this.interval = setInterval(() => {
      this.timeNumber = this.timeNumber - 1
      if (this.timeNumber <= 0) { this.VerificationButtonValid = true; this.timeNumber = null; return }
    }, 1000)//每一秒倒数，六十秒停止，把“获取验证码”按钮设为可按
  }

  gotoLand() {
    this.event.emit(0)
  }//跳转到“登录”

  gotoForgetPassword() {
    this.event.emit(2)
  }//跳转到“忘记密码”

}