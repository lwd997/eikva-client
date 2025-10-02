import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import type { TestCase } from "../models/TestCase";
import { CaseListItem } from "../components/CaseListItem/CaseListItem";
import { http } from "../http";
import Button from "../components/universal/Button/Button";

export const Group = () => {
    const { group } = useParams();
    const [testCaseList, setTestCaseList] = useState<TestCase[]>([]);

    const getTestCases = async () => {
        if (!group) {
            return;
        }

        const response = await http.request<{ test_cases: TestCase[] }>("groups/get-test-cases/" + group);

        if (response.status === 200) {
            setTestCaseList(response.body.test_cases);
        }
    }

    const addTestCase = async () => {
        if (!group) {
            return;
        }

        const response = await http.request<TestCase>("/test-cases/add", {
            method: "POST",
            body: {
                test_case_group: group
            }
        });

        if (response.status === 200) {
            setTestCaseList([...testCaseList, response.body]);
        }
    }

    useEffect(() => {
        getTestCases();
    }, [group]);

    return (
        <div className="display-flex flex-direction-column">
            {testCaseList.map((tc) => <CaseListItem key={tc.uuid} {...tc} />)}
            <div className="display-flex justify-content-end">
                <Button onClick={addTestCase}>Добавить новый тест-кейс</Button>
            </div>
        </div>
    );
}
