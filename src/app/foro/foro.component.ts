import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // <--- IMPORTANTE
import { BloggerService } from '../services/blogger.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-foro',
  templateUrl: './foro.component.html',
  styleUrls: ['./foro.component.scss'],
  standalone: true,
  imports: [CommonModule], // <--- IMPORTANTE: Aquí vive el 'date' pipe
})
export class ForoComponent implements OnInit {

  posts: any[] = [];
  loading = true;

  constructor(
    private bloggerService: BloggerService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.loadPosts();
  }

  loadPosts(){
    this.bloggerService.getPosts().subscribe((data: any) => {
      this.posts = data.items || [];
      this.loading = false;
    });
  }

  openPost(id: string){
    this.router.navigate(['/foro', id]);
  }
}
