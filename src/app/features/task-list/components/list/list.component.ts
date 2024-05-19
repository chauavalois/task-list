import { AppService } from 'src/app/app.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less']
})
export class ListComponent implements OnInit {

  constructor(private appService: AppService) { }
  closeModal: ElementRef
  @ViewChild('closeModal') 

  public taskList: Task[] = [];
  public taskNovo: Task = new Task();
  public taskEdicao: Task = new Task();

  ngOnInit() {
    this.getAllTask();
  }

  getAllTask() {
    this.appService.getAll().subscribe(
      tasks => this.taskList = tasks
    );
  }

  saveTask(task: Task) {
    if (task.title && task.description && task.hour) {
      if (task.id) { //editar tarefa
        this.appService.update(task).subscribe({
          next: () => {
            alert('Edições salvas com sucesso');
            this.getAllTask();
            this.closeModal.nativeElement.click();
          },
          error: () => {
            alert('Erro ao tentar editar');
          }
        });
      } else { //nova tarefa
        this.appService.save(task).subscribe({
          next: () => {
            alert('Salvo com sucesso');
            this.getAllTask();
            this.taskNovo = new Task();
          },
          error: () => {
            alert('Erro ao tentar salvar');
          }
        });
      }
    } else {
      alert("Prencha todos os campos para salvar uma nova tarefa")
    }
  }

  CapturaTaskEditar(task: Task) {
    this.taskEdicao.id = task.id;
    this.taskEdicao.title = task.title;
    this.taskEdicao.description = task.description;
    this.taskEdicao.hour = task.hour;
  }


  deleteTask(taskId: number) {
    if (confirm('Tem certeza que deseja excluir a tarefa?')) {
      this.appService.delete(taskId).subscribe({
        next: () => {
          alert('Excluído com sucesso');
          this.getAllTask();
        },
        error: () => {
          alert('Erro ao tentar excluir');
        }
      });
    }
  }
}
