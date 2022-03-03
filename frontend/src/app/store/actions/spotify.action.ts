export class GetAuthUrl {
    static readonly type = '[Spotify] Get Auth Url';
}

export class LoginUser {
    static readonly type = '[Spotify] Login User';
    constructor(public code: string) {}
}

export class SearchArtists {
    static readonly type = '[Spotify] Search Artists';
    constructor(public query: string) {}
}

export class GetAlbums {
    static readonly type = '[Spotify] Get Artist Albums';
    constructor(public artistId: string) {}
}

export class GetAlbumDetails {
    static readonly type = '[Spotify] Get Album Details';
    constructor(public albumId: string) {}
}