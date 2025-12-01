import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BloggerService } from '../services/blogger.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-foro-detalle',
  templateUrl: './foro-detalle.component.html',
  styleUrls: ['./foro-detalle.component.scss'],
  imports: [DatePipe]
})
export class ForoDetalleComponent implements OnInit {

  post: any;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private bloggerService: BloggerService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.bloggerService.getPostById(id).subscribe(res => {
      this.post = res;
      this.loading = false;
    });
  }
}
