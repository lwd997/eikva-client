import { DocListItem } from "../DocListItem/DocListItem";
import "./DocList.css";
export const DocList = () => {
  return (
    <div className="doc-list">
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((_, index) => {
        return <DocListItem key={index} />;
      })}
    </div>
  );
};
