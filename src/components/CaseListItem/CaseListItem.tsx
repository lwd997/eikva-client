import { useState } from "react";
import type { TestCase } from "../../models/TestCase";
import { useDebounceCallback } from "../../hooks/useDebounceCallback";
import { http } from "../../http";
import Button from "../universal/Button/Button";

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
        <div className="card display-flex flex-direction-column">
            <div>
                <input
                    onChange={(e) => onChange("name", e.target.value)}
                    value={state.name}
                />
            </div>
            <div>
                <div className="label">Источник</div>
                <input
                    onChange={(e) => onChange("source_ref", e.target.value)}
                    value={state.source_ref}
                />
            </div>

            <div>
                <div className="label">Описание</div>
                <textarea
                    rows={10}
                    className="textarea"
                    onChange={(e) => onChange("description", e.target.value)}
                    value={state.description}
                />
            </div>

            <div className="display-flex width-100">
                <div className="width-50">
                    <div className="label">Предусловие</div>
                    <textarea
                        rows={5}
                        className="textarea"
                        onChange={(e) => onChange("pre_condition", e.target.value)}
                        value={state.pre_condition}
                    />
                </div>

                <div className="width-50">
                    <div className="label">Постусловие</div>
                    <textarea
                        rows={5}
                        className="textarea"
                        onChange={(e) => onChange("post_condition", e.target.value)}
                        value={state.post_condition}
                    />
                </div>
            </div>

            <div className="margin-top-1">
                <Button>
                    Показать шаги
                </Button>
            </div>
        </div>
    );
};
