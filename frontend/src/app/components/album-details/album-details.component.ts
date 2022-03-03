import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import { GetAlbumDetails } from 'src/app/store/actions/spotify.action';
import { SpotifyState } from 'src/app/store/state/spotify.state';

@Component({
  selector: 'app-album-details',
  templateUrl: './album-details.component.html',
  styleUrls: ['./album-details.component.scss']
})
export class AlbumDetailsComponent implements OnInit {
  album: any = null;

  constructor(private route: ActivatedRoute, private store: Store) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const { albumId } = params;
      this.store.dispatch(new GetAlbumDetails(albumId));
    })

    this.store
      .select(SpotifyState.getAlbumDetails)
      .subscribe((album: any) => {
        this.album = album;
      })
  }

  openPreview(link: string) {
    console.log(link)
    window.open(link, '_blank')
  }
}
