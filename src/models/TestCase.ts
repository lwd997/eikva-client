export interface TestCaseGroup {
    id: number;
    uuid: string;
    name: string;
    status: string;
    creator: string;
    creator_uuid: string;
}

export interface TestCase {
    id: number;
    uuid: string;
    created_at: string;
    creator: string;
    creator_uuid: string;
    test_case_group: string;
    status: string;
    name: string;
    pre_condition: string;
    post_condition: string;
    description: string;
    source_ref: string;
}

export type TestCaseUpdatePayload = Pick<
    TestCase,
    "uuid" |
    "name" |
    "pre_condition" |
    "post_condition" |
    "description"
>

