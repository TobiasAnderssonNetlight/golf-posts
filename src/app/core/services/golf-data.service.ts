import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class GolfPostsService {
    private api = 'https://www.reddit.com/r/golf.json'
    private currentPage$: BehaviorSubject<number> = new BehaviorSubject(
        1
    )

    private pageSize = 10
    constructor(private http: HttpClient) {}

    getGolfPosts(currentPage: number, after?: string, before?: string): Observable<any>  {
        const params = { 
            limit: this.pageSize,
            count: this.pageSize * currentPage,
            ...(after && { after }),
            ...(before && { before }) 
        }

        return this.http.get(this.api, { responseType: 'json', params: params })
    }

    getCurrentPage(): Observable<number> {
        return this.currentPage$.asObservable()
    }

    setCurrentPage(newPage: number): void {
        this.currentPage$.next(newPage)
    }

}
