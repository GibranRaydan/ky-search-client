import {
  ChangeDetectionStrategy,
  Component,
  signal,
  viewChild,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { Faq } from '../../models/faq.model';

@Component({
  selector: 'app-faqs',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    MatButtonModule,
    MatExpansionModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
  ],
  templateUrl: './faqs.component.html',
  styleUrl: './faqs.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FaqsComponent {
  faqsList = signal<Faq[]>([
    {
      id: 0,
      question: 'Search By Name',
      isOpen: true,
      answer:
        'This selection will allow you to search for documents by a person’s name or by a company’s name. You will be able to narrow your search by choosing to search for a Grantor’s name, a Grantee’s name or search for both the Grantor’s and Grantee’s name. If you know the date range for the document you are searching for, you can limit the search by entering in a Starting and Ending Date to your search.',
    },
    {
      id: 1,
      question: 'Search By Book And Page / File #',
      isOpen: false,
      answer:
        'If you know the book and page number of the document that you wish to view, use this option to enter the Book Code, Book Number and the Page Number to retrieve the document image.',
    },
    {
      id: 2,
      question: 'Search By Instrument Type',
      isOpen: false,
      answer:
        'If you are looking for a particular type of document that has been recorded, such as a DEED or DEED OF TRUST, use this search option. Select the type of instrument that you are looking for and enter a date range that the document was recorded. Limiting the date range to just a few days is highly recommended as this search returns a large volume of recorded documents.',
    },
    {
      id: 3,
      question: 'View Daily Notebook',
      isOpen: false,
      answer:
        'To view the last 500 documents that have been recorded, use the View Daily Notebook option.',
    },
    {
      id: 4,
      question: 'Search Old Index Books',
      isOpen: false,
      answer:
        'This option allows you to view the index books that have been scanned into the system. First, you will choose a date range then; choose an alphabetical range in either the Grantor or Grantee section. Thirdly, you will choose a name (this can be a company’s name or an individual’s name). This will display the index page which contains the name and book and page numbers of any documents that have been recorded. The Individual SetOut column will list the most frequently used names so it is usually best to start your search here. If the name that you are searching for is not found in this column, then look for the less frequently used names in the Individual Mixed column.',
    },
    {
      id: 5,
      question: 'View Backscanned Deeds',
      isOpen: false,
      answer:
        'This search option contains images from the books that have no indexes. Use this option if you know the book and page number of the document that you wish to view or to just browse the old books.',
    },
    {
      id: 6,
      question: 'UCC File Number / Name Search',
      isOpen: false,
      answer:
        'This search option allows you to search the UCC financing statements by name or by the UCC file number. The UCC index is from 07/03/1967 to 06/29/2001. UCC’s filed on a later date can be found in the Real Estate Index. If you do not have a UCC file number conduct your search by choosing to search for a Grantor’s name, a Grantee’s name or search for both the Grantor’s and Grantee’s name. If you know the date range for the document you are searching for, you can limit the search by entering in a Starting and Ending Date to your search.',
    },
    {
      id: 7,
      question: 'Viewing Images',
      isOpen: false,
      answer:
        'To view images on this site you will need a TIFF (an image format) viewer or a PDF viewer. A free TIFF viewer can be downloaded at www.alternatiff.com and a free PDF viewer, Adobe Acrobat Reader, can be downloaded at www.adobe.com.',
    },
  ]);
}
