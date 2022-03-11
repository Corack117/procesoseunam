import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';

@Component({
  selector: 'app-matrix',
  templateUrl: './matrix.component.html',
  styleUrls: ['./matrix.component.scss']
})

export class MatrixComponent implements OnInit {
  private initialSize: number = 4;
  // private actualMatrix: number[][] = [];
  // private newMatrix: number[][] = [];
  private finalMatrix: number[][] = [];
  private vector: number[] = [];
  public formControl!: FormGroup;
  public actualSize: number = 0;
  public finalVectors: number[][] = [];

  @ViewChild('swalError') swalError!: SwalComponent;
  @ViewChild('matrixResults') matrixResults!: ElementRef;

  constructor(
    private formBuilder: FormBuilder,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
    this.formControl = this.formBuilder.group({
      size: [this.initialSize, Validators.required],
      inicialState: [0, Validators.required],
      finalState: [0, Validators.required],
      periods: [1, Validators.required],
      showMatrix: [false]
    })
    this.setMatrixSize();
  }

  // PRIVATE FUNCTIONS

  private upSize = (size: number) => {
    for (let i = 0; i < size; i++) {
      if (i < this.actualSize) {
        for (let j = this.actualSize; j < size; j++) {
          const group = this.getGroup('row' + i);
          group.addControl('column' + j, this.newControl());
        }
      } else if (i >= this.actualSize) {
        this.formControl.addControl('row' + i, this.formBuilder.group({}));
        const group = this.getGroup('row' + i);
        for (let j = 0; j < size; j++) {
          group.addControl('column' + j, this.newControl());
        }
      }
    }
  }

  private downSize = (size: number) => {
    const actualSize = this.actualSize - 1;
    for (let i = actualSize; i >= size; i--) {
      this.formControl.removeControl('row' + i);
      for (let j = 0; j < size; j++) {
        const group = this.getGroup('row' + j);
        group.removeControl('column' + i);
      }
    }
  }

  private newControl = () => {
    return this.formBuilder.control(0, Validators.required);
  }

  private validateMatrix = (): Object => {
    let invalid: any = {
      rangeOut: [],
      rowError: []
    };
    for (let i = 0; i < this.actualSize; i++) {
      const row = this.getGroup('row' + i).controls;
      for (let j = 0; j < this.actualSize; j++) {
        if (row['column' + j].invalid) {
          invalid.rangeOut.push('Fila '+ (i+1) + ' - ' + 'Columna ' + (j+1));
        }
      }
    }
    invalid.rowError.push(...this.validateRows());
    return invalid;
  }

  private validateRows = (): string[] => {
    const invalidRows: string[] = [];
    for(let i = 0; i < this.actualSize; i++) {
      const group = this.getGroup('row' + i);
      let rowSum = 0;
      for (let j = 0; j < this.actualSize; j++) {
        rowSum +=  group.get('column' + j)!.value;
      }
      if (parseFloat(rowSum.toFixed(4)) != 1)
        invalidRows.push('Fila ' + (i+1));
    }
    return invalidRows;
  }

  private showAlert = (invalidMatrix: any): boolean => {
    if (invalidMatrix.rangeOut.length !== 0) {
      this.swalError.title = 'Error, datos invalidos';
      let text = document.createElement('p');
      text.innerHTML = 'Elementos fuera del rango ';
      text.innerHTML += `[1, ${this.actualSize}]: <br/><br/>`;
      for (let element of invalidMatrix.rangeOut) {
        text.innerHTML += `${element} <br/>`
      }
      this.swalError.html = text;
      this.swalError.fire();
      return false;
    }
    if (invalidMatrix.rowError.length !== 0) {
      this.swalError.title = 'Error, datos invalidos';
      let text = document.createElement('p');
      text.innerHTML = 'La suma de los valores de las filas <br/>';
      text.innerHTML += ` son desiguales a 1:  <br/><br/>`;
      for (let element of invalidMatrix.rowError) {
        text.innerHTML += `${element}, `
      }
      text.innerHTML = text.innerHTML.substring(0, text.innerHTML.length - 2)
      this.swalError.html = text;
      this.swalError.fire();
      return false;
    }
    if (this.formControl.controls['inicialState'].invalid) {
      this.swalError.title = 'Error, datos invalidos';
      let text = document.createElement('p');
      text.innerHTML = 'Estado inicial fuera del rango ';
      this.swalError.html = text;
      this.swalError.fire();
      return false;
    }
    if (this.formControl.controls['finalState'].invalid) {
      this.swalError.title = 'Error, datos invalidos';
      let text = document.createElement('p');
      text.innerHTML = 'Estado final fuera del rango ';
      this.swalError.html = text;
      this.swalError.fire();
      return false;
    }
    if (this.formControl.controls['periods'].invalid) {
      this.swalError.title = 'Error, datos invalidos';
      let text = document.createElement('p');
      text.innerHTML = 'Número de periodos fuera de rango ';
      this.swalError.html = text;
      this.swalError.fire();
      return false;
    }
    return true;
  }

  private setNewMatrix = (): number[][] => {
    const actualMatrix: number[][] = [];
    this.finalMatrix = [];
    this.vector = [];
    for (let i = 0; i < this.actualSize; i++) {
      const row: number[] = [];
      const group = this.getGroup('row' + i);
      for (let j = 0; j < this.actualSize; j++) {
        row.push(group.get('column' + j)!.value);
      }
      if (this.getVal('inicialState') != i)
        this.vector.push(0);
      else
        this.vector.push(1);
      actualMatrix.push(row);
    }
    this.finalMatrix = this.cloneMatrix(actualMatrix);
    return actualMatrix;
  }

  private cloneMatrix = (array: number[][]): number[][] => {
    array = array.map(function(arr) {
        return [...arr];
    });
    return array;
  }

  // PUBLIC FUNCTIONS

  public setMatrixSize = () => {
    const size = this.formControl.get('size')!.value;
    if (this.formControl.controls['size'].invalid) {
      this.swalError.title = 'Error, datos invalidos';
      let text = document.createElement('p');
      text.innerHTML = 'Número de estados fuera del rango ';
      text.innerHTML += '[1, 30]';
      this.swalError.html = text;
      this.swalError.fire();
      return ;
    }
    if (size > this.actualSize)
      this.upSize(size);
    else if (size < this.actualSize)
      this.downSize(size);
    this.actualSize = size;
  }

  public getGroup = (key: string) => {
    return this.formControl.get(key) as FormGroup;
  }

  public getVal = (key: string) => {
    return this.formControl.get(key)!.value;
  }

  public setVal = (key: string) => {
    return this.formControl.get(key)!.setValue(!this.getVal(key));
  }

  public printVector = (vector: number[]): string => {
    return vector.toString().replace(/,/g, ', ');
  }

  public printMatrix = (period: number = 1) => {
    const title = document.createElement('h4');
    title.innerHTML = `P<sup>${period}</sup> :`
    title.style.marginTop = '30px';
    this.matrixResults.nativeElement.appendChild(title);
    for (let row of this.finalMatrix) {
      const tr = document.createElement('tr');
      tr.style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
      for (let column of row) {
        const td = document.createElement('td');
        td.style.width = '80px';
        td.style.maxWidth = '80px';
        td.style.padding = '10px';
        td.style.textAlign = 'center';
        td.innerHTML = column.toString();
        tr.appendChild(td);
      }
      this.matrixResults.nativeElement.appendChild(tr);
    }
  }

  public resolve = () => {
    const invalidMatrix: any = this.validateMatrix();
    const isValid: boolean = this.showAlert(invalidMatrix);
    if (!isValid)
      return;
    const actualMatrix = this.setNewMatrix();
    let newMatrix = this.cloneMatrix(actualMatrix);
    let tempVector: number[] = [...this.vector];
    this.finalVectors = [];
    for (let i = 0; i < this.actualSize; i++) {
      let posVal: number = 0;
      for (let j = 0; j < this.actualSize; j++) {
        posVal += tempVector[j] * this.finalMatrix[j][i];
      }
      this.vector[i] = parseFloat(posVal.toFixed(4));
    }
    const matrixPrinted = this.matrixResults.nativeElement.children;
    for (let child of matrixPrinted)
      if (child.tagName != 'H2')
        this.renderer.removeChild(this.matrixResults.nativeElement, child);
    this.printMatrix();
    this.finalVectors.push([...this.vector])
    const periods = this.getVal('periods') - 1;
    for (let period = 0; period < periods; period++) {
      for (let i = 0; i < this.actualSize; i++) {
        for (let j = 0; j < this.actualSize; j++) {
          let posVal: number = 0;
          for (let k = 0; k < this.actualSize; k++) {
            posVal += actualMatrix[i][k] * newMatrix[k][j];
          }
          this.finalMatrix[i][j] = parseFloat(posVal.toFixed(4));
        }
      }
      for (let i = 0; i < this.actualSize; i++) {
        let posVal: number = 0;
        for (let j = 0; j < this.actualSize; j++) {
          posVal += tempVector[j] * this.finalMatrix[j][i];
        }
        this.vector[i] = parseFloat(posVal.toFixed(4));
      }
      this.finalVectors.push([...this.vector])
      this.printMatrix(period+2);
      newMatrix = this.cloneMatrix(this.finalMatrix);
    }
  }
}
