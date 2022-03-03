import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { SearchArtists } from 'src/app/store/actions/spotify.action';
import { debounceTime } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { SpotifyState } from 'src/app/store/state/spotify.state';
import { UserInterface } from 'src/app/models/user.model';
import { Navigate } from '@ngxs/router-plugin';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  private onChangeSubject = new Subject<string>();

  userData: UserInterface | null = null;
  artists: any[] = [];
  searchValue: string = "";

  constructor(private store: Store) { }

  ngOnInit(): void {
    //debounce search subscription
    this.onChangeSubject.pipe(
      debounceTime(500)
    ).subscribe((value: string) => {
      this.store.dispatch(new SearchArtists(value));
    })

    // select artists subscription
    this.store
      .select(SpotifyState.getArtists)
      .subscribe((artists: any) => {
        this.artists = artists?.items || this.artists;
      });

    // select user subscription
    this.store
      .select(SpotifyState.getUser)
      .subscribe((userData: UserInterface | null) => {
        console.log(this.userData);
        this.userData = userData;
      });
  }

  search(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    const value = input.value;
    this.onChangeSubject.next(value);
  }

  moveToArtistPage(artist: any) {
    this.store.dispatch(new Navigate([`/album/${artist.id}`]))
  }

  searchItem(query: string) {
    this.onChangeSubject.next(query);
    this.searchValue = query;
  }
}
