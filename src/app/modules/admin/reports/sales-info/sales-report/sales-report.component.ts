import { Component, OnInit } from '@angular/core';
import { ProductService } from '@services/product.service';
import { Location } from '@angular/common';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-sales-report',
  templateUrl: './sales-report.component.html',
  styleUrls: ['./sales-report.component.scss']
})
export class SalesReportComponent implements OnInit {

    data: any[];
    sale: any;
    todaysDate: Date;
    show: boolean = false;

  constructor(
    private Productservice: ProductService,
    private location: Location,
  ) { }

  ngOnInit(): void {
    this.getSale()
    this.show = true

  }

  getSale()
  {
    this.todaysDate = new Date();
      this.sale = this.Productservice.sales;
}

public downloadAsPDF() {
  let DATA: any = document.getElementById('htmlData');
  html2canvas(DATA).then((canvas) => {
    let fileWidth = 208;
    let fileHeight = (canvas.height * fileWidth) / canvas.width;
    const FILEURI = canvas.toDataURL('image/png');
    let PDF = new jsPDF('p', 'mm', 'a4');
    let position = 0;
    PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
    PDF.save('Invoice.pdf');
  });
   
}

back(): void {
  this.location.back();
}

}
