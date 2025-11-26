import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { BloggerService } from '../services/blogger.service';

@Component({
  selector: 'app-foro-detalle',
  templateUrl: './foro-detalle.component.html',
  styleUrls: ['./foro-detalle.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class ForoDetalleComponent implements OnInit {

  post: any;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private bloggerService: BloggerService
  ) { }

  ngOnInit() {

    const id = this.route.snapshot.paramMap.get('id')!;

    this.bloggerService.getPostById(id).subscribe(res =>{
      this.post = res;
      this.loading = false;
    });
  }
}
