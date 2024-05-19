import { AppService } from 'src/app/app.service';
import { Component, OnInit } from '@angular/core';
import { Task } from '../../models/task.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less']
})
export class ListComponent implements OnInit {

  public taskForm: FormGroup;
  public taskList: Task[] = [];
  public taskEdicao: Task | null = null;

  constructor(private appService: AppService, private fb: FormBuilder) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      hour: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.getAllTask();
  }

  getAllTask() {
    this.appService.getAll().subscribe(
      tasks => this.taskList = tasks
    );
  }

  saveTask() {
    if (this.taskForm.valid) {
      const task: Task = { ...this.taskForm.value };

      if (this.taskEdicao) { // Se estiver editando
        task.id = this.taskEdicao.id;
        this.appService.update(task).subscribe({
          next: () => {
            alert('Edições salvas com sucesso');
            this.getAllTask();
            this.closeModal();
            this.taskEdicao = null;
          },
          error: () => {
            alert('Erro ao tentar editar');
          }
        });
      } else { // Se for uma nova tarefa
        this.appService.save(task).subscribe({
          next: () => {
            alert('Salvo com sucesso');
            this.getAllTask();
            this.taskForm.reset();
          },
          error: () => {
            alert('Erro ao tentar salvar');
          }
        });
      }
    } else {
      alert("Preencha todos os campos para salvar uma nova tarefa");
    }
  }

  CapturaTaskEditar(task: Task) {
    this.taskEdicao = { ...task };
    this.taskForm.patchValue(this.taskEdicao);
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

  closeModal() {
    const closeModalButton = document.getElementById('closeModal');
    if (closeModalButton) {
      closeModalButton.click();
    }
  }
}
