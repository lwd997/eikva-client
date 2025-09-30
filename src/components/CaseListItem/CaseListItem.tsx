import { useState } from "react";
import type { TestCase } from "../../models/TestCase";
import { useDebounceCallback } from "../../hooks/useDebounceCallback";
import { http } from "../../http";
import "./CaseListItem.css";

export const CaseListItem = ({ ...testCase }: TestCase) => {
    const [state, setState] = useState<TestCase>(testCase);

    const onChange = <T extends keyof TestCase>(field: T, value: TestCase[T]) => {
        setState((s) => {
            s = { ...s, [field]: value };
            sync(s);
            return s;
        })
    }

    const sync = useDebounceCallback((tc: TestCase) => {
        http.request("/test-cases/update", {
            method: "POST",
            body: {
                description: tc.description,
                post_condition: tc.post_condition,
                pre_condition: tc.pre_condition,
                name: tc.name,
                uuid: tc.uuid,
                source_ref: tc.source_ref
            }
        });
    }, 500)

    return (
        <div
            style={{
                padding: '5px',
                border: '1px solid pink'
            }}
        >
            <div>
                <div>Название</div>
                <textarea
                    onChange={(e) => onChange("name", e.target.value)}
                    value={state.name}
                />
            </div>

            <div>
                <div>Описание</div>
                <textarea
                    onChange={(e) => onChange("description", e.target.value)}
                    value={state.description}
                />
            </div>

            <div>
                <div>Предусловие</div>
                <textarea
                    onChange={(e) => onChange("pre_condition", e.target.value)}
                    value={state.pre_condition}
                />
            </div>

            <div>
                <div>Постусловие</div>
                <textarea
                    onChange={(e) => onChange("post_condition", e.target.value)}
                    value={state.post_condition}
                />
            </div>

            <div>
                <div>Источник</div>
                <textarea
                    onChange={(e) => onChange("source_ref", e.target.value)}
                    value={state.source_ref}
                />
            </div>
        </div>
    );
};
