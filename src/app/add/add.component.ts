import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ClothingService, ClothingItem } from '../services/clothing.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  standalone: true,
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
  imports: [ReactiveFormsModule]
})
export class AddComponent implements OnInit {
  clothingForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private clothingService: ClothingService,
    private router: Router
  ) {
    // Initialize the reactive form with required controls
    this.clothingForm = this.fb.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      size: ['', Validators.required],
      color: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      brand: ['', Validators.required],
      // Optional fields for an initial review
      reviewUsername: [''],
      reviewRating: [null],
      reviewComment: ['']
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.clothingForm.invalid) {
      return;
    }
    const formValue = this.clothingForm.value;
    // Build a new clothing item object 
    const newItem: ClothingItem = {
      name: formValue.name,
      category: formValue.category,
      size: formValue.size,
      color: formValue.color,
      price: formValue.price,
      brand: formValue.brand
    };

    // Call the service method to add the new clothing item
    this.clothingService.addClothingItem(newItem).subscribe({
      next: (item) => {
        if (formValue.reviewUsername && formValue.reviewRating && formValue.reviewComment) {
          this.clothingService.addReview(item._id!, {
            username: formValue.reviewUsername,
            rating: formValue.reviewRating,
            comment: formValue.reviewComment
          }).subscribe({
            next: () => this.router.navigate(['/list']),
            error: (err) => console.error('Error adding review:', err)
          });
        } else {
          this.router.navigate(['/list']);
        }
      },
      error: (err) => console.error('Error adding clothing item:', err)
    });
  }
}