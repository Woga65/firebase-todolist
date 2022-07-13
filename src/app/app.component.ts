import { Component } from '@angular/core';
import { Firestore, collectionData, collection, setDoc, doc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  todos$: Observable<any>;
  todos: Array<any>;
  todoText: string = '';

  constructor(private firestore: Firestore) {
    const coll = collection(this.firestore, 'todos');
    this.todos$ = collectionData(coll);

    this.todos$.subscribe(( newTodos ) => {
      console.log('Neue Daten sind verfügbar: ', newTodos);
      this.todos = newTodos;
    });
  }

  addTodo() {
    const coll = collection(this.firestore, 'todos');
    setDoc(doc(coll), { name: this.todoText });
    // setDoc(doc(coll, 'unique ID goes here'), { name: this.todoText });
  }
}
