import { Component } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { GetAuthUrl } from './store/actions/spotify.action';
import { SpotifyState } from './store/state/spotify.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend';
  authUrl: string = '';

  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(new GetAuthUrl())
    this.store
      .select(SpotifyState.getAuthUrl)
      .subscribe((url: string) => {
        this.authUrl = url;
      });
  }

  openLoginPage() {
    window.open(this.authUrl);
  }
}
