import { Component, OnInit } from '@angular/core';
import { Navigate } from '@ngxs/router-plugin';
import { Store } from '@ngxs/store';
import { GetAuthUrl } from 'src/app/store/actions/spotify.action';
import { SpotifyState } from 'src/app/store/state/spotify.state';
import { parseToken } from 'src/app/utils/helper';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  title = 'frontend';
  authUrl: string = '';

  constructor(private store: Store) {}

  ngOnInit() {
    const user = parseToken();
    if(user && user.id) {
      this.store.dispatch(new Navigate(['/dashboard']))
    } else {
      this.store.dispatch(new GetAuthUrl())
      this.store
        .select(SpotifyState.getAuthUrl)
        .subscribe((url: string) => {
          this.authUrl = url;
        });
    }
    
  }

  openLoginPage() {
    window.open(this.authUrl, '_self');
  }
}
