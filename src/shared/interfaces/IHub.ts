/* eslint-disable @typescript-eslint/no-explicit-any */
// types/videoHub.ts
export interface VideoHubGroup {
    code: number;
    msg: string;
    count: number;
    next: string;
    previous: string;
    result: Record<string, any>; // Pode ajustar se souber a estrutura real
}

export interface VideoHubContent {
    groupName: string;
    thumbnail: string;
    transmissions: any;
    categories: any[];
    lastWatched: any[];
}

export interface VideoHubResponse {
    videHubGroups: VideoHubGroup;
    videHubContent1: VideoHubContent;
    videHubContent2: VideoHubContent;
}
