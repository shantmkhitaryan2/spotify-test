import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import { ApiResponse } from '../models/response.model';
import { getToken } from '../utils/helper';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  spotifyUrl: string = 'http://localhost:8000/spotify/';

  constructor(private http: HttpClient) { }

  public static getHeaders() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: getToken()
    });
    return headers;
  }

  getAuthUrl() {
    return this.http.get<ApiResponse>(`${this.spotifyUrl}getOAuthUrl`);
  }

  loginUser(code: string) {
    return this.http.post<ApiResponse>(`${this.spotifyUrl}login`, { code });
  }

  searchArtist(query: string) {
    return this.http.get<ApiResponse>(`${this.spotifyUrl}search?query=${query}`, { headers: SpotifyService.getHeaders() });
  }

  getArtistAlbums(artistId: string) {
    return this.http.get<ApiResponse>(`${this.spotifyUrl}albums/${artistId}`, { headers: SpotifyService.getHeaders() });
  }

  getAlbumDetails(albumId: string) {
    return this.http.get<ApiResponse>(`${this.spotifyUrl}album/${albumId}`, { headers: SpotifyService.getHeaders() });
  }
}
