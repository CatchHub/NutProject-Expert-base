import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Blog } from '../models/blog.model';
import { Profile } from '../models/profile.model';
import { Reccomendation } from '../models/reccomendation.model';

@Injectable({
  providedIn: 'root',
})
export class ExpertServicesService {
  private profiles: Array<Profile> = [];
  private selectedProfile: Profile;
  private profileRec: Reccomendation;
  private Blogs: Array<Blog> = [];
  private profilesSubject: Subject<Array<Profile>>;
  constructor(private http: HttpClient) {
    this.profilesSubject = new Subject<Array<Profile>>();
  }

  getUserInfo() {
    this.http.get('http://localhost:3000/getUserInfo').subscribe((response) => {
      response['users'].forEach((el) => {
        this.profiles.push(el);
        this.profilesSubject.next(this.profiles);
      });
    });
  }

  postUserInfo(profile) {
    console.log(profile);
    this.http
      .post('http://localhost:3000/postUserInfo', profile)
      .subscribe((response) => {
        console.log('Post Response: ' + response);
      });
  }
  getProfileSub() {
    return this.profilesSubject;
  }
  getProfiles() {
    return this.profiles;
  }
  getProfileByID(id: number): any {
    return this.profiles.find((el) => {
      return el.id === id;
    });
  }
  alterUserInfo(profile) {
    console.log(profile);
    this.http
      .post('http://localhost:3000/alterUser', profile)
      .subscribe((response) => {
        console.log('Post Response: ' + response);
      });
  }

  getRecommendation(profileID) {
    this.selectedProfile = this.getProfileByID(profileID);
    console.log(this.selectedProfile);
    this.http
      .post('http://localhost:3000/expert', this.selectedProfile)
      .subscribe((response) => {
        console.log(response);
      });
    setTimeout(() => {
      this.http
        .post('http://localhost:3000/getRec', this.selectedProfile)
        .subscribe((response) => {
          console.log(response);
          this.profileRec = response as Reccomendation;
        });
    }, 3000);
  }
  recommendation() {
    console.log(this.selectedProfile);
    console.log(this.profileRec);
    return this.profileRec;
  }

  setBlogs() {
    this.http
      .post('http://localhost:3000/blogs', this.selectedProfile)
      .subscribe((response) => {
        this.Blogs = response as Array<Blog>;
        console.log(this.Blogs);
      });
  }
  getBlogs() {
    return this.Blogs;
  }
}
