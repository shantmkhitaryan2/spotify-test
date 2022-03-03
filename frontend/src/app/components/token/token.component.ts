import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { ActivatedRoute } from '@angular/router';
import { LoginUser } from 'src/app/store/actions/spotify.action';
import { SpotifyState } from 'src/app/store/state/spotify.state';
import { UserInterface } from 'src/app/models/user.model';
import { Navigate } from '@ngxs/router-plugin';

@Component({
  selector: 'app-token',
  templateUrl: './token.component.html',
  styleUrls: ['./token.component.scss']
})
export class TokenComponent implements OnInit {

  code: string = '';

  constructor(private route: ActivatedRoute, private store: Store) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.code = params.code;
      this.store.dispatch(new LoginUser(this.code));
      this.store
        .select(SpotifyState.getUser)
        .subscribe((userData: UserInterface | null) => {
          if(userData) {
            this.store.dispatch(new Navigate(['/dashboard']))
          } else {
            this.store.dispatch(new Navigate(['/login']))
          }
        });
    })
  }

}
