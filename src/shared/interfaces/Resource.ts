// Interface representing an individual result entry.
export interface ResourceListItem {
  uid: string;
  name: string;
  url: string;
}

// Interface representing the full API response.
export interface ResourceListResponse {
  message: string;
  total_records: number;
  total_pages: number;
  previous: string | null;
  next: string | null;
  results: ResourceListItem[];
}
