import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentsService } from '../../../../../documents.service';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { searchImports } from '../search.declarations';

@Component({
  selector: 'app-search-by-book-and-page',
  standalone: true,
  imports: [CommonModule, MatSnackBarModule, searchImports],
  templateUrl: './search-by-type.component.html',
  styleUrls: ['./search-by-type.component.css'],
})
export class SearchByTypeComponent {
  title = 'Search By Document Type';
  selectedValues: string[] = [];
  loading: boolean = false;
  documents: any[] = [];
  noResultsFound: boolean = false;

  displayedColumns = [
    'grantor',
    'grantee',
    'kind',
    'book',
    'page',
    'date',
    'actions',
  ];

  documentTypes = [
    { label: 'ALL INSTRUMENT TYPES', value: '0' },
    { label: 'AFDT OF SEVERANCE', value: 'AOS' },
    { label: 'AFFIDAVIT OF CONVERSION', value: 'AOC' },
    { label: 'AFFIDAVIT OF DESCENT', value: 'AFDT' },
    { label: 'AGREEMENT', value: 'AGR' },
    { label: 'AMEND SUBORD AGREE', value: 'SUBA' },
    { label: 'AMENDED DEED', value: 'DEEDA' },
    { label: 'AMENDED EASEMENT', value: 'EASMA' },
    { label: 'AMENDED ENCUMBRANCE', value: 'ENCA' },
    { label: 'AMENDED PROTECTIVE COVENANT', value: 'COVAM' },
    { label: 'ARTICLES OF INCORPORATION', value: 'AC' },
    { label: 'ASSIGNMENT', value: 'ASGN' },
    { label: 'ASSIGNMENT OF RENTS / LEASES', value: 'RENT' },
    { label: 'ASSIGNMENT RENT', value: 'ASRNT' },
    { label: 'ASSUMED NAME', value: 'AN' },
    { label: 'ASSUMPTION AGREE', value: 'ASUAG' },
    { label: 'AVOID LIEN', value: 'AVOID' },
    { label: 'BAIL BOND', value: 'BB' },
    { label: 'BAIL BOND RELEASE', value: 'BBR' },
    { label: 'BOND MECH LIEN RELEASE', value: 'MLBR' },
    { label: 'CITY LIEN', value: 'CL' },
    { label: 'CITY LIEN ADMENDMENT', value: 'CLA' },
    { label: 'CITY LIEN ASSIGNMENT', value: 'CLAS' },
    { label: 'CITY LIEN PARTIAL RELEASE', value: 'CLPR' },
    { label: 'CITY LIEN RELEASE', value: 'CLR' },
    { label: 'CONTINUATION STATEMENT', value: 'CT' },
    { label: 'CONTRACT', value: 'CONT' },
    { label: 'CORRECTED AFFIDAVIT OF DESCENT', value: 'CAFDT' },
    { label: 'CORRECTED ARTICLE', value: 'CAC' },
    { label: 'CORRECTED ASSIGNMENT', value: 'CASGN' },
    { label: 'CORRECTED COVENANT', value: 'CCOV' },
    { label: 'CORRECTED LEASE', value: 'LEASC' },
    { label: 'CORRECTED RELEASE', value: 'CREL' },
    { label: 'DEED', value: 'DEED' },
    { label: 'DEED - NO TAX', value: 'DEEDN' },
    { label: 'DEED AFFIDAVIT', value: 'DAFDT' },
    { label: 'DEED OF CORRECTION', value: 'DOC' },
    { label: 'EASEMENT', value: 'EASM' },
    { label: 'EASEMENT RELEASE', value: 'REASM' },
    { label: 'ENCUMBRANCE', value: 'ENC' },
    { label: 'ENCUMBRANCE ASSIGNMENT', value: 'ENCAS' },
    { label: 'ENCUMBRANCE PARTIAL RELEASE', value: 'ENCPR' },
    { label: 'ENCUMBRANCE RELEASE', value: 'ENCR' },
    { label: 'FEDERAL TAX LIEN', value: 'FLIEN' },
    { label: 'FEDERAL TAX LIEN RELEASE', value: 'FLR' },
    { label: 'FINANCING STATEMENT', value: 'FS' },
    { label: 'FINANCING STATEMENT - NO STATE FEE', value: 'FSN' },
    { label: 'FIXTURE FILING', value: 'FIX' },
    { label: 'FIXTURE FILING AMENDMENT', value: 'FFAM' },
    { label: 'FIXTURE FILING ASSIGNMENT', value: 'FFA' },
    { label: 'FIXTURE FILING CONTINUATION', value: 'FFC' },
    { label: 'FIXTURE FILING PARTIAL RELEASE', value: 'FFPR' },
    { label: 'FIXTURE FILING RELEASE', value: 'FFR' },
    { label: 'GUARDIANSHIP ORDER', value: 'GUARD' },
    { label: 'LAND USE RESTRICTIONS', value: 'LR' },
    { label: 'LD', value: 'LD' },
    { label: 'LEASE', value: 'LEASE' },
    { label: 'LEASE - NO TAX', value: 'LEASN' },
    { label: 'LEASE AMENDMENT', value: 'LEASA' },
    { label: 'LEASE ASSIGNMENT', value: 'LEASEA' },
    { label: 'LEASE RELEASE', value: 'LEASER' },
    { label: 'MASTER DEED', value: 'DEEDM' },
    { label: 'MASTER MORTGAGE', value: 'MMTG' },
    { label: 'MECHANIC LIEN RELEASE', value: 'MLR' },
    { label: 'MECHANICS LIEN', value: 'MEC' },
    { label: 'MECHANICS LIEN ASSIGNMENT', value: 'MLA' },
    { label: 'MISCELLANEOUS RECORD', value: 'MIS' },
    { label: 'MODIFICATION AGREEMENT', value: 'MODAG' },
    { label: 'MORTGAGE', value: 'MTG' },
    { label: 'MORTGAGE - NO STATE FEE', value: 'MTGN' },
    { label: 'MORTGAGE AGREEMENT', value: 'MTGAG' },
    { label: 'MORTGAGE AMENDMENT', value: 'MTGAM' },
    { label: 'MORTGAGE CORRECTION', value: 'MTGC' },
    { label: 'MORTGAGE MODIFICATION', value: 'MTGM' },
    { label: 'MORTGAGE W/ ASSIGNMENT', value: 'MTGWA' },
    { label: 'NAME CHANGE', value: 'NC' },
    { label: 'NOTARY BOND', value: 'NB' },
    { label: 'NOTARY BOND CHANGE', value: 'NOTARY BON' },
    { label: 'NOTARY BOND RELEASE', value: 'NBR' },
    { label: 'OPTION', value: 'OPT' },
    { label: 'ORDER', value: 'ORDER' },
    { label: 'ORDER', value: 'ORD' },
    { label: 'PARTIAL RELEASE', value: 'PREL' },
    { label: 'PLAT', value: 'PL' },
    { label: 'POWER OF ATTORNEY', value: 'PA' },
    { label: 'PROTECTIVE COVENANT', value: 'COV' },
    { label: 'RE-RECORDED MORTGAGE', value: 'REMTG' },
    { label: 'RELEASE', value: 'REL' },
    { label: 'RELEASE MISCELLANEOUS', value: 'RMIS' },
    { label: 'REVOCABLE POWER OF ATTORNEY', value: 'RPOA' },
    { label: 'STATE TAX LIEN', value: 'SLIEN' },
    { label: 'STATE TAX LIEN PARTIAL RELEASE', value: 'SLPR' },
    { label: 'STATE TAX LIEN RELEASE', value: 'SLR' },
    { label: 'SUBORDINATION AGREEMENT', value: 'SUB' },
    { label: 'TAX LIEN', value: 'TLIEN' },
    { label: 'TAX LIEN ASSIGNMENT', value: 'TLA' },
    { label: 'TAX LIEN RELEASE', value: 'TREL' },
    { label: 'TITLE LIEN AMENDMENT', value: 'TLSAM' },
    { label: 'TITLE LIEN STATEMENT ASSIGNMENT', value: 'TLSA' },
    { label: 'TITLE LIEN STATMENT PARTIAL RELEASE', value: 'TLSPR' },
    { label: 'WILL', value: 'WILL' },
    { label: 'WILL CODICIL', value: 'WILLC' },
    { label: 'WILL DISCLAIMER', value: 'WD' },
    { label: 'WILL NOTICE OF CONTEST', value: 'WILLN' },
    { label: 'WILL RENUNCIATION', value: 'WILLR' },
  ];

  constructor(
    private documentsService: DocumentsService,
    private snackBar: MatSnackBar
  ) {}

  searchDocuments(): void {
    this.loading = true;
    this.noResultsFound = false;
    this.documentsService.getDocumentsByType(this.selectedValues).subscribe(
      (data) => {
        if (data && Array.isArray(data) && data.length > 0) {
          this.documents = data;
        } else {
          this.documents = [];
          this.noResultsFound = true;
        }
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching documents', error);
        this.snackBar.open(`Error fetching documents: ${error}`, 'Close', {
          duration: 3000,
        });
        this.loading = false;
      }
    );
  }
}
