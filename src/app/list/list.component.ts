import { Component, OnInit } from '@angular/core';
import { ClothingService, ClothingItem } from '../services/clothing.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list',
  standalone: true,
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  imports: [CommonModule, RouterModule]
})
export class ListComponent implements OnInit {
  clothingItems: ClothingItem[] = [];
  loading = false;
  error: string | null = null;
  reviewsVisibility: { [key: string]: boolean } = {};

  constructor(
    private clothingService: ClothingService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchItems();
  }

  fetchItems(): void {
    this.loading = true;
    this.clothingService.getClothingItems().subscribe({
      next: (items) => {
        this.clothingItems = items;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error fetching clothing items';
        this.loading = false;
      }
    });
  }

  toggleReviews(id: string): void {
    this.reviewsVisibility[id] = !this.reviewsVisibility[id];
  }

  deleteItem(id: string): void {
    if (confirm('Are you sure you want to delete this item?')) {
      this.clothingService.deleteClothingItem(id).subscribe({
        next: () => this.fetchItems(),
        error: (err) => {
          this.error = 'Error deleting item';
          console.error(err);
        }
      });
    }
  }
}