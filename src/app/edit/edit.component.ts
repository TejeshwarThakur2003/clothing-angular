import { Component, OnInit } from '@angular/core'; // For component and lifecycle hook
import { ActivatedRoute, Router } from '@angular/router'; // To access route params and navigation
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'; // For reactive forms
import { CommonModule } from '@angular/common';
import { ClothingService } from '../services/clothing.service'; // Service for API calls

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  clothingForm!: FormGroup; // Form declaration
  id!: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private clothingService: ClothingService
  ) {}

  ngOnInit(): void {
    // Get the clothing item ID from the route
    this.id = this.route.snapshot.paramMap.get('id')!;
    // Initialize form controls
    this.clothingForm = this.fb.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      size: ['', Validators.required],
      color: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      brand: ['', Validators.required]
    });
    // Load the existing clothing item data to populate the form
    this.clothingService.getClothingById(this.id).subscribe({
      next: (data: any) => {
        this.clothingForm.patchValue(data);
      },
      error: () => {
        alert('Failed to fetch clothing item data.');
      }
    });
  }

  onSubmit(): void {
    // Update the clothing item with the form's current value
    this.clothingService.updateClothing(this.id, this.clothingForm.value).subscribe({
      next: () => {
        alert('Clothing item updated successfully!');
        this.router.navigate(['/list']);
      },
      error: () => {
        alert('Failed to update clothing item.');
      }
    });
  }
}