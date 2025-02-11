
export interface Blog {
  id: number;
  authorID: number;
  title: string;
  description: string | null;
  thumbnail: string | null;
  content: string;
  createdAt: Date;
}

export interface History {
  id: number;
  authorID: number;
  blogID: number;
  readAt: Date;
}

export interface AnalyticRecord{
  id:number;
  blogID: number;
  date: Date;
  views: number;
  reads: number;
  totalHoursRead:number;
}

