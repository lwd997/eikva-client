export interface UploadedFile {
    uuid: string;
    name: string;
    content?: string;
    status?: string;
    token_count: number;
    creator: string;
    test_case_group: string;
}

