import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ClothingService } from '../services/clothing.service';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  clothingItems: any[] = [];
  loading = false;
  error = '';

  // Object to track review visibility for each clothing item by its ID
  reviewsVisibility: { [id: string]: boolean } = {};

  constructor(private clothingService: ClothingService) {}

  ngOnInit() {
    this.getClothingItems();
  }

  getClothingItems() {
    this.loading = true;
    this.clothingService.getAllClothing().subscribe({
      next: (data: any[]) => {
        this.clothingItems = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Error fetching items';
        this.loading = false;
      }
    });
  }

  deleteItem(id: string) {
    if (confirm('Are you sure you want to delete this item?')) {
      this.clothingService.deleteClothing(id).subscribe({
        next: () => {
          this.clothingItems = this.clothingItems.filter(item => item._id !== id);
        },
        error: () => {
          alert('Failed to delete the item.');
        }
      });
    }
  }

  // Toggle the visibility of reviews for a given clothing item by ID
  toggleReviews(itemId: string) {
    this.reviewsVisibility[itemId] = !this.reviewsVisibility[itemId];
  }
}