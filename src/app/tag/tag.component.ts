import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { TagService } from '../services/tag.service';
import { ITag } from '../models/tag';

@Component({
  selector: 'app-tag',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css']
})
export class TagComponent implements OnInit {
  tagForm!: FormGroup;
  tags: ITag[] = [];

  constructor(private fb: FormBuilder,
              private tagService: TagService,
              private router: Router) { }

  ngOnInit(): void {
    this.tagForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      number: [0, [Validators.required, Validators.min(1)]],
      idUsuario: ['', Validators.required]
    });

    this.loadTags(); // Cargar las etiquetas cuando el componente se inicie
  }

  loadTags(): void {
    // Método para cargar todas las etiquetas
    this.tagService.getAllTags().subscribe(tags => {
      this.tags = tags;
    });
  }

  onCreateTag(): void {
    if (this.tagForm.invalid) {
      this.tagForm.markAllAsTouched();
      return;
    }

    const newTag: ITag = this.tagForm.value;
    this.tagService.createTag(newTag).subscribe({
      next: (tag: ITag) => {
        alert('Etiqueta creada exitosamente.');
        this.loadTags();  // Recargar etiquetas
        this.router.navigate(['/tags']);
      },
      error: (err: any) => {
        console.error(err);
        alert(err.error?.message || 'Error al crear etiqueta');
      }
    });
  }

  onDeleteTag(tagId: string): void {
    if (!tagId) {
      alert('ID de la etiqueta no válido.');
      return;
    }

    this.tagService.deleteTag(tagId).subscribe({
      next: () => {
        alert('Etiqueta eliminada exitosamente.');
        this.loadTags();  // Recargar etiquetas después de eliminar
      },
      error: (err: any) => {
        console.error(err);
        alert(err.error?.message || 'Error al eliminar etiqueta');
      }
    });
  }

  onUpdateTag(tagId: string): void {
    if (!tagId) {
      alert('ID de la etiqueta no válido.');
      return;
    }

    const updatedTag: Partial<ITag> = this.tagForm.value;  // Solo se envían los campos que se han actualizado
    this.tagService.updateTag(tagId, updatedTag).subscribe({
      next: (tag: ITag) => {
        alert('Etiqueta actualizada exitosamente.');
        this.loadTags();  // Recargar etiquetas después de actualizar
        this.router.navigate(['/tags']);
      },
      error: (err: any) => {
        console.error(err);
        alert(err.error?.message || 'Error al actualizar etiqueta');
      }
    });
  }
}
