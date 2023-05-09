import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable, map } from "rxjs";
import { SeriesDataWrapper } from "../models/series.interfaces";
import { Series } from "../models/series.interfaces";
import { md5 } from "src/app/core/utils/utils";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class ListService {
  apiUrl = "http://gateway.marvel.com/v1/public/series";
  ts = 1;
  hash = "bc2909e59101bfc0ba79e0f37a8cdf01";
  urlAcces =
    "http://gateway.marvel.com/v1/public/series?ts=1&apikey=0a96d4363b0c58d41704bcd4aa21e4c1&hash=bc2909e59101bfc0ba79e0f37a8cdf01";

  constructor(private http: HttpClient) {}

  getAllCharacters(
    offset: number,
    limit: number
  ): Observable<SeriesDataWrapper> {
    const params = new HttpParams().set("offset", offset).set("limit", limit);
    // console.log(params);

    md5(this.ts + environment.privateKey + environment.publicKey);
    // console.log(this.hash);
    return this.http.get<SeriesDataWrapper>(this.urlAcces, { params });
  }

  getCharacterById(id: string): Observable<Series> {
    return this.http
      .get<SeriesDataWrapper>(
        `${this.apiUrl}/${id}?ts=${this.ts}&apikey=${environment.publicKey}&hash=${this.hash}`
      )
      .pipe(
        map((response) => {
          console.log(response);

          return response.data.results?.[0];
        })
      );
  }

  getCharactersByNameStartsWith(
    nameStartsWith: string
  ): Observable<SeriesDataWrapper> {
    const params = new HttpParams().set("nameStartsWith", nameStartsWith);
    return this.http.get<SeriesDataWrapper>(this.urlAcces, { params });
  }
}
