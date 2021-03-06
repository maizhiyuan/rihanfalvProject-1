import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {HttpClient} from "@angular/common/http";
import{DosearchService}from "../../components/search/dosearch.service"


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
public Nowcountry:string=localStorage.getItem("JapanOrKorea");   //当前模块 日/韩 用于进行筛选显示
public KeyWord:string="";//搜索关键词
public HistoryList:any[]=[];//搜索历史
public IfHistory=false;//是否存在历史记录
public getkey:any={}
public searchlist=["全部","法律条文","论文","案例"]
public searchgroup="全部"
public ifsearch=false//搜索状态,false显示搜索历史,true显示搜索内容

  constructor(public router: Router,public http:HttpClient,public m_search:DosearchService) { }

  ngOnInit() {this.readHistory()

}
readHistory(){
  let SearchList=JSON.parse(localStorage.getItem('HistoryList'));//读取历史记录
  if(!SearchList){
    //不存在则return
  this.IfHistory=false
  return
  }
  if(SearchList.length>0) {
    //存在则获取记录
  this.HistoryList=SearchList
  this.IfHistory=true
  }else{ 
  this.IfHistory=false
  }
}

nullkeyword(){  //判断是否为纯空字符串
  const Reg = new RegExp(" ", 'gi');    
  let str=this.KeyWord.replace(Reg,"")
  if(str==""){
    return true
  }
  return false
}


doSearch(){//搜索按键
  if(!this.KeyWord)return;
  if(this.nullkeyword()==true)return;
  if(this.HistoryList.indexOf(this.KeyWord)==-1)//判断是否有重复
  this.HistoryList.push(this.KeyWord)//无重复则pushKeyWord进List
  if(this.HistoryList.length==10)
  this.HistoryList.splice(0,1)//当记录到达10时删除第一条
  localStorage.setItem('HistoryList',JSON.stringify(this.HistoryList));//储存进localstorage
  this.readHistory() 
  this.m_search.list=null;
  this.m_search.Order="all";
  this.m_search.KeyWord=this.KeyWord
  this.m_search.Classify=this.searchgroup
  this.m_search.Nowcountry=this.Nowcountry
  this.m_search.searchtogo()//传数据给后端
  //this.router.navigate(['searchresult'])
  let that=this
  setTimeout( function() { 
     that.ifsearch=true } , 300);  


}
deleteHistory(key){//删除某项历史记录
  this.HistoryList.splice(key,1) //删除localstorage里key所在项
  localStorage.setItem('HistoryList',JSON.stringify(this.HistoryList));//重新储存进localstorage
  this.readHistory()
}
reSearch(item){//点击历史记录查询
  this.KeyWord=item
  this.doSearch()
}
remove(){//清除历史记录
  localStorage.removeItem('HistoryList')//清空localstorage
  this.HistoryList=[]
  this.readHistory()
}

setInfo(item){
  this.searchgroup=item
  this.doSearch()
}

getJapanKorea(isJapan:boolean){
  if(isJapan){
    this.Nowcountry="Japan"
    this.doSearch()
  }
  else{
    this.Nowcountry="Korea"
    this.doSearch()

  }
}
order(order){//排序方式传递
if(!this.KeyWord)return;
this.m_search.Order=order;
this.m_search.KeyWord=this.KeyWord
this.m_search.Classify=this.searchgroup
this.m_search.Nowcountry=this.Nowcountry
this.m_search.searchtogo()//传数据给后端
}
clear(){
  this.ifsearch=false 
   this.KeyWord=""

}
}
