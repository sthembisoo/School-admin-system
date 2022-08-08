import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Extra_Mural_Activity } from '../../tools/models/extraMuralActivity';
import { ExtraMuralActivitiesService } from '@services/extra-mural-activities.service';

@Component({
    selector: 'app-activities',
    templateUrl: './activities.component.html',
    styleUrls: ['./activities.component.scss'],
})
export class ActivitiesComponent implements OnInit {
    activities: any[];
    constructor(
        private activityService: ExtraMuralActivitiesService,
        private router: Router
    ) {}

    ngOnInit(): void {
      this.getActivities();
    }


    getActivities(): void {
        this.activityService.getList().then((response) => {
            this.activities = [];
           
            // this.eventTypes = [...data.docs];

            response.docs.forEach((type) => {
                this.activities.push({ ...type.data(), id: type.id });
              });

    }).catch((error) => {
       
    });
}

    //navigate to pupil list page
    goToPupilList(id: number, name: string): void {
        this.router.navigate(['pupil/activities',id], { queryParams: { activityName: name } });
    }
}
