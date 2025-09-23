import { useState } from "react";
import { MOCK_CASE } from "../../assets/mocks";
import { CaseListItem } from "../CaseListItem/CaseListItem";
import "./CaseList.css";
export const CaseList = ({ activeSidebarItemId }) => {
  const [activeCase, setActiveCase] = useState(null);
  const [cases, setCases] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  const [newGroupCases, setNewGroupCases] = useState([]);

  return (
    <div className="case-list">
      {activeSidebarItemId !== null &&
        activeSidebarItemId < 10 &&
        cases.map((caseItem) => {
          return (
            <CaseListItem
              key={caseItem}
              caseId={caseItem}
              detailedCase={MOCK_CASE}
              handleActivateCase={() => {
                if (caseItem === activeCase) {
                  setActiveCase(null);
                } else {
                  setActiveCase(caseItem);
                }
              }}
              handleDisactivateCase={() => {
                setActiveCase(null);
              }}
              handleDeleteCase={() => {
                setCases(
                  cases.filter((item) => {
                    return item !== caseItem;
                  })
                );
                console.log("unregistred handleDeleteCase");
              }}
              isActive={activeCase === caseItem}
            />
          );
        })}
      {activeSidebarItemId >= 10 &&
        newGroupCases.map((caseItem) => {
          return (
            <CaseListItem
              key={caseItem}
              caseId={caseItem}
              detailedCase={MOCK_CASE}
              handleActivateCase={() => {
                if (caseItem === activeCase) {
                  setActiveCase(null);
                } else {
                  setActiveCase(caseItem);
                }
              }}
              handleDisactivateCase={() => {
                setActiveCase(null);
              }}
              handleDeleteCase={() => {
                setCases(
                  cases.filter((item) => {
                    return item !== caseItem;
                  })
                );
                console.log("unregistred handleDeleteCase");
              }}
              isActive={activeCase === caseItem}
            />
          );
        })}
    </div>
  );
};
