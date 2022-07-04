import { Component, OnInit } from '@angular/core'
import { Subject, takeUntil } from 'rxjs';
import { GolfPostsService } from 'src/app/core/services/golf-data.service';

@Component({
    selector: 'golf-posts',
    templateUrl: './golf-posts.component.html',
    styleUrls: ['./golf-posts.component.sass'],
})
export class GolfPostsComponent implements OnInit  {
    private unsubscribe$: Subject<any> = new Subject<any>();
    loading: boolean = false
    panelOpenState: boolean = false
    currentPage: number = 0

    // I would probably move the before and after state into the 
    // golfPostsService and update the states from the response there
    // instead.
    after: string = ''
    before: string = ''
    golfPosts = []

    constructor(
        private golfPostsService: GolfPostsService,
    ) {}

    ngOnInit(): void {
        this.golfPostsService.getCurrentPage().pipe(
            takeUntil(this.unsubscribe$)
        ).subscribe(page => this.currentPage = page)
        this.getGolfPosts()
    }

    public getGolfPosts(after?: string, before?: string) {
        this.loading = true
        this.golfPostsService.getGolfPosts(after, before).subscribe(
            (golfPostResponse: any) => {
                // Not sure what to do with the "stickied" posts, so just filtering them out for now
                this.golfPosts = golfPostResponse.data.children.filter(
                    ({ data }: { data: any }) => !data.stickied
                )
                this.after = golfPostResponse.data.after
                this.before = golfPostResponse.data.before
                this.loading = false
            }
        )
    }

    public goToNextPage() {
        this.golfPostsService.setCurrentPage(this.currentPage + 1)
        this.getGolfPosts(this.after)
    }

    public goToPreviousPage() {
        this.golfPostsService.setCurrentPage(this.currentPage - 1)
        this.getGolfPosts(undefined, this.before)
    }

    ngOnDestroy() {
        this.unsubscribe$.next(true);
        this.unsubscribe$.complete();
    }
}