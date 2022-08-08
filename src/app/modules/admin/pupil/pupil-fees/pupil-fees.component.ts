import { Location } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Fees } from '@models/fees.model';
import { PupilFeesService } from '@services/pupil-fees.service';

//PDF  
import jsPDF from 'jspdf';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import htmlToPdfmake from 'html-to-pdfmake';
@Component({
    selector: 'app-pupil-fees',
    templateUrl: './pupil-fees.component.html',
    styleUrls: ['./pupil-fees.component.scss'],
})
export class PupilFeesComponent implements OnInit {
    id: string | null;
    fees: Fees;
    @ViewChild('fees') pdfTable: ElementRef;
    currentDate =  new Date()

    constructor(
        private pupilFeesService: PupilFeesService,
        private activatedRoute: ActivatedRoute,
        private location: Location,

    ) {}

    ngOnInit() {
        this.id = this.activatedRoute.snapshot.params.id;
        this.getLearnerFeeInfo(this.id);
    }

    async getLearnerFeeInfo(id: string) {
        console.log(this.id);
        await (
            await this.pupilFeesService.getLearnerFees(id)
        ).subscribe(
            (result) => {
                console.log(result);
                this.fees = result;
            },
            (err) => {
                console.log(err);
            }
        );
    }

    Sum() {
        let sum =
            this.fees.AfterCare +
            this.fees.NewLearnerFee +
            this.fees.StationaryAndWorkbookFee +
            this.fees.YearFee;
            // console.log(sum)
        return sum;
    }

    public downloadAsPDF() {
      const doc = new jsPDF();
     
      const pdfTable = this.pdfTable.nativeElement;
     
      var html = htmlToPdfmake(pdfTable.innerHTML);
       
      const documentDefinition = { content: html };
      pdfMake.createPdf(documentDefinition).open(); 
       
    }


    back(): void {
      this.location.back();
  }
}

