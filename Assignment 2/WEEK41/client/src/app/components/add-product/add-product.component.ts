import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { Category } from 'src/app/models/category.model';
import { ProductService } from 'src/app/services/product.service';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  product: Product = {
    name: '',
    description: '',
    price: 0,
    published: undefined,
    category: ''
  };
  submitted = false;

  categories: Category[] = []


  constructor(private productService: ProductService, private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.categoryService.getAll().subscribe(categories => {
      this.categories = categories;
    });
  }

  saveProduct(): void {
    const data = {
      name: this.product.name,
      description: this.product.description,
      price: this.product.price,
      published: this.product.published,
      category: this.product.category
    };

    this.productService.create(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
        },
        error: (e) => console.error(e)
      });
  }

  newProduct(): void {
    this.submitted = false;
    this.product = {
      name: '',
      description: '',
      price: 0,
      published: undefined,
      category: ''
    };
  }
}
