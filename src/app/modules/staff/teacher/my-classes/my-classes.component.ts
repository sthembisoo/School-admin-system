import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClassService } from '@services/grade.service';

@Component({
  selector: 'app-my-classes',
  templateUrl: './my-classes.component.html',
  styleUrls: ['./my-classes.component.scss']
})
export class MyClassesComponent implements OnInit {

  classes: any[] = [];
  gradeInfo = {
      gradeId: '',
      grade: null,
  };
  number = Math.floor(Math.random() * 4);

  isLoaded: boolean;

  constructor(
      private classService: ClassService,
      private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
      this.getListOfClasses('hYHNk7D0fxtH3obuGcYm');
  }

  getListOfClasses(teacherId: string) {
      return this.classService
          .getListFiltered('TeacherInChargeId', teacherId)
          .subscribe((response) => {
              this.classes = [];
              this.classes = response.map((a) => {
                  const data = a.payload.doc.data();
                  const id = a.payload.doc.id;
                  const type = a.type;
                  return { id, type, ...data };
              });
              this.classes.sort(function (a, b) {
                  return a.Type - b.Type;
              });
              this.isLoaded = true;
              console.log(this.classes);
          });
  }

}
