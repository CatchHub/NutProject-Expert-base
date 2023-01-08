import { Component } from '@angular/core';
import { Blog } from '../models/blog.model';
import { ExpertServicesService } from '../services/expert-services.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  Blogs: Array<Blog> = [];
  constructor(expertService: ExpertServicesService) {
    this.Blogs = expertService.getBlogs();
    console.log(this.Blogs);

    // this.Blogs = [
    //   {
    //     title: 'Youtube',
    //     link: 'https://www.youtube.com/',
    //     text: 'YouTube is a global online video sharing and social media platform headquartered in San Bruno, California.',
    //   },
    //   {
    //     title: 'Netflix',
    //     link: 'https://www.netflix.com/',
    //     text: 'Netflix, Inc. is an American subscription video on-demand over-the-top streaming service and production company based in Los Gatos, California.',
    //   },
    // ];
  }
}
