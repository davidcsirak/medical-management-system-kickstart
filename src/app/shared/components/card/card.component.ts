import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ChangeTypeEnum } from '../../enums/change-type.enum';
import { UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input({ required: true }) title!: string;

  @Input({ required: true }) changeType!: ChangeTypeEnum;

  @Input({ required: true }) formGroup!: UntypedFormGroup;

  @Input() showSaveButtonOnEditMode = true;

  @Input() showDeleteButtonOnEditMode = true;

  @Input() showActions = true;

  @Output() create = new EventEmitter<void>();

  @Output() delete = new EventEmitter<void>();

  @Output() save = new EventEmitter<void>();

  @Output() edit = new EventEmitter<void>();

  public ChangeTypeEnum = ChangeTypeEnum;

  createBtnOnClick(): void {
    this.create.emit();
  }

  deleteBtnOnClick(): void {
    this.delete.emit();
  }

  saveBtnOnClick(): void {
    this.save.emit();
  }

  editBtnOnClick(): void {
    this.edit.emit();
  }
}
