import { CaseListItem } from "../CaseListItem/CaseListItem";
import "./CaseList.css";
export const CaseList = () => {
  return (
    <div className="case-list">
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((_, index) => {
        return <CaseListItem key={index} />;
      })}
    </div>
  );
};
