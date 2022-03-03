import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Navigate } from '@ngxs/router-plugin';
import { Store } from '@ngxs/store';
import { GetAlbums } from 'src/app/store/actions/spotify.action';
import { SpotifyState } from 'src/app/store/state/spotify.state';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit {

  selectedArtist: any = null;
  albums: any[] = []

  constructor(private route: ActivatedRoute, private store: Store) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const { artistsId } = params;
      this.store.dispatch(new GetAlbums(artistsId));
    })

    this.store
      .select(SpotifyState.getArtistAlbums)
      .subscribe((albums) => {
        this.albums = albums;
      })
  }

  toDetailsPage(album: any) {
    this.store.dispatch(new Navigate([`/albumDetails/${album.id}`]))
  }
}
