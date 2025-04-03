// Import necessary Angular modules and types
import { Component, OnInit } from '@angular/core';  // OnInit for lifecycle hook
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';  // Reactive forms support
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
// Import the ClothingService to interact with the backend API
import { ClothingService } from '../services/clothing.service';

@Component({
  selector: 'app-add',
  standalone: true, 
  imports: [CommonModule, ReactiveFormsModule], 
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  // Declare the form property without immediate initialization.
  clothingForm!: FormGroup;

  // Inject FormBuilder, ClothingService, and Router via the constructor.
  constructor(
    private fb: FormBuilder,
    private clothingService: ClothingService,  // Service for API calls
    private router: Router
  ) {}

  // Lifecycle hook that runs once the component is initialized.
  ngOnInit(): void {
    // Initialize the reactive form with default values and validators.
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

  // Function to handle form submission.
  onSubmit(): void {
    // Retrieve the form's current value.
    const formValue = this.clothingForm.value;
    // Prepare the data object to send to the backend.
    const clothingData: any = {
      name: formValue.name,
      category: formValue.category,
      size: formValue.size,
      color: formValue.color,
      price: formValue.price,
      brand: formValue.brand
    };

    // If review information is provided, include it as an initial review.
    if (formValue.reviewUsername && formValue.reviewRating && formValue.reviewComment) {
      clothingData.reviews = [{
        username: formValue.reviewUsername,
        rating: formValue.reviewRating,
        comment: formValue.reviewComment
      }];
    }

    // Call the addClothing method from the service to send data to the backend.
    this.clothingService.addClothing(clothingData).subscribe({
      next: () => {
        // Inform the user of success and navigate to the list view.
        alert('Clothing item added successfully!');
        this.router.navigate(['/list']);
      },
      error: () => {
        // Show an error alert if the API call fails.
        alert('Failed to add clothing item.');
      }
    });
  }
}