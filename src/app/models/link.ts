export class Link {
    id: number;
    name: string;
    ordering: number;
    items: LinkItem[]
}

export interface LinkItem {
    id: number;
    name: string;
    href: string;
    ordering: number;
    linkId: number;
}