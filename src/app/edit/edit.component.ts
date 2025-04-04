import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ClothingService, ClothingItem } from '../services/clothing.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  standalone: true,
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
  imports: [ReactiveFormsModule]
})
export class EditComponent implements OnInit {
  clothingForm: FormGroup;
  itemId!: string;

  constructor(
    private fb: FormBuilder,
    private clothingService: ClothingService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    // Initialize form controls
    this.clothingForm = this.fb.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      size: ['', Validators.required],
      color: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      brand: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Retrieve the ID from route parameters
    this.itemId = this.route.snapshot.paramMap.get('id')!;
    // Fetch the clothing item using the correct service method name
    this.clothingService.getClothingItem(this.itemId).subscribe({
      next: (item: ClothingItem) => {
        // Pre-fill the form with the fetched item data
        this.clothingForm.patchValue({
          name: item.name,
          category: item.category,
          size: item.size,
          color: item.color,
          price: item.price,
          brand: item.brand
        });
      },
      error: (err) => console.error('Error fetching clothing item:', err)
    });
  }

  onSubmit(): void {
    if (this.clothingForm.invalid) {
      return;
    }
    const updatedItem: ClothingItem = this.clothingForm.value;
    this.clothingService.updateClothingItem(this.itemId, updatedItem).subscribe({
      next: (item) => this.router.navigate(['/list']),
      error: (err) => console.error('Error updating clothing item:', err)
    });
  }
}