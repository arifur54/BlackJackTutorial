export interface PreviousScore {
    _id?: string;
    user_id: string;
    result: string;
    winningCards: any[];
    playedAt: Date;
}