import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';

import { DataService } from '../../../services/data.service';
import { Router, NavigationExtras } from '@angular/router';


@Component({
  selector: 'app-popular',
  templateUrl: './popular.component.html',
  styleUrls: ['./popular.component.scss']
})
export class PopularComponent implements OnInit {

  private threadList: any;
  private isMax: boolean = false;
  private nowData: Array<any> = [];

  // 韩国日本的标志
  private flag: any = 1;

  constructor(
    private dataService: DataService,
    private router: Router
  ) { }

  ngOnInit() {
    this.dataService.getThreadList().subscribe((response) => {
      // debugger;
      this.threadList = response;
      this.nowData = this.threadList.slice(0, 2);
      console.log(this.threadList);
      console.log(this.nowData);
      if (this.nowData.length == this.threadList.length) {
        this.isMax = true;
      } else {
        this.isMax = false;
      }
    });
  }

  read(item) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        topicID: item.thread.ID,
      },
    }
    this.router.navigate(['/post'], navigationExtras)
  }

  more() {
    this.nowData = this.threadList.slice(0, this.nowData.length + 5);
    console.log(this.nowData);
    if (this.nowData.length == this.threadList.length) {
      this.isMax = true;
    }
  }

}

@Pipe({
  name: 'myPipe',
})
export class myPipe implements PipeTransform {
  transform(data: Array<any>, args?: string): Array<any> {
    let newArray: Array<any> = [];
    for (let i = 0; i < data.length; i++) {
      const element = data[i];
      if (element.thread.Japanorkorea === args) {
        newArray.push(element);
      }
    }
    return newArray;
  }
}