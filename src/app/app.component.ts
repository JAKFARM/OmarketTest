import { Component, OnInit } from '@angular/core';
import {CommonService} from '../app/common.service';
import {toDoTask, msg} from '../app/interface';
import { FormGroup, FormControl } from '@angular/forms';
import {VALUE} from '../app/constant';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'tech-test';
  toDoList:toDoTask[] = [];
  msg: msg;
  searchContent: string;
  selectedViewData: any;
  searchtoDoList: toDoTask[] = [];
  showViewData: boolean = false;
  taskData;
  columns: any = [];
  constructor(private _service: CommonService){}

  ngOnInit() {
    this.taskData = new FormGroup({
      id: new FormControl(this.toDoList.length),
      label: new FormControl(),
      description: new FormControl(),
      category: new FormControl(),
      done: new FormControl()
   });
   this.loadTaskData();
  }

  editData(data: toDoTask) {
    this.taskData.setValue(data);
  }

  onClickSubmit(data) {
    if(data && data.id) {
      this._service.updateTask(data).subscribe(res => {
        if(res) {
          this.msg = {
            content: VALUE.UPDATE,
            isSuccess: true
          }
          this.loadTaskData();
          this.clearMsg();
          this.resetFormData()
        }
      })
    } else if(data && !data.id) {
      this._service.postData(data).subscribe(res => {
        if(res) {
          this.loadTaskData();
          this.msg = {
            content: VALUE.ADDED,
            isSuccess: true
          }
          this.clearMsg();
          this.resetFormData()
        }
      })
    }
  }

  loadTaskData() {
    this._service.getTask().subscribe((res: toDoTask[]) => {
      if(res && res.length > 0) {
        this.toDoList = res;
        this.searchtoDoList = res;
        this.columns = Object.keys(res[0]);
      }
    })
  }

  deleteData(id) {
    this._service.deleteTask(id).subscribe(res => {
      if(res) {
        this.loadTaskData();
        this.msg = {
          content: VALUE.DELETE,
          isSuccess: true
        }
        this.clearMsg();
      }
    })
  }

  clearMsg() {
    setTimeout(() => {
      this.msg = undefined
    }, 3000)
  }

  viewData(data) {
    this.selectedViewData = data;
    this.showViewData = true;
  }

  resetFormData() {
    this.taskData.reset();
  }

  searchData() {
    if(this.searchContent) {
      this.searchtoDoList = this.toDoList.filter(data =>
        {
          return (data.label.indexOf(this.searchContent) > -1)
        });
    } else {
      this.searchtoDoList = this.toDoList;
    }
  }
}
