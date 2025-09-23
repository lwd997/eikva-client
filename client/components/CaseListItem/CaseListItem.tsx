import { useState } from "react";
import "./CaseListItem.css";
import Button from "../universal/Button/Button";
export const CaseListItem = ({
  caseId,
  detailedCase,
  handleActivateCase,
  handleDisactivateCase,
  handleDeleteCase,
  isActive,
  ...props
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isApproved, setIsApproved] = useState(false);
  const [caseField, setCaseField] = useState(
    `${caseId + 1}. ${detailedCase.name}\nAuthor: ${
      detailedCase.author
    }\nCreation date: ${detailedCase.creationDate}\nPrecondition: ${
      detailedCase.precondition
    }\nSteps:\n  Step 1:\n    Description: To do something\n    Expected result: Everythyng should work\n  Step 2:\n    Description: To do something\n    Expected result: Everythyng should work\n  Step 3:\n    Description: To do something\n    Expected result: Everythyng should work\nPostcondition: ${
      detailedCase.postcondition
    }\nStatus: ${detailedCase.status}`
  );
  const [refineField, setRefineField] = useState("Refine...");
  return (
    <>
      <div
        className={
          isActive ? "case-list-item active" : "case-list-item non-active"
        }
        {...props}
        data-bs-toggle="collapse"
        data-bs-target={"#collapse" + caseId}
        style={{ zIndex: isActive ? "2" : "0" }}
      >
        <div className="position-relative">
          <textarea
            className={
              isActive && isExpanded
                ? "form-control w-100 d-block"
                : "form-control w-100 d-block form-control-plaintext overflow-hidden"
            }
            value={caseField}
            onChange={(e) => {
              setCaseField(e.target.value);
            }}
            readOnly={(!isActive || !isExpanded) && "true"}
            style={{
              cursor:
                (isExpanded && isActive && "text") ||
                (isExpanded && !isActive && "pointer") ||
                "default",
              padding: "1rem",
              height: isExpanded ? "26.125rem" : "5.75rem",
            }}
            onClick={() => {
              if (isExpanded && !isActive) {
                handleActivateCase();
              }
            }}
          />
          <div
            className="position-absolute d-flex"
            style={{ top: "0.5rem", right: "0.5rem", columnGap: "0.5rem" }}
          >
            <Button
              icon={isExpanded ? "expand_less" : "expand_more"}
              className="button-small button-square"
              onClick={(e) => {
                e.stopPropagation();
                setIsExpanded(!isExpanded);
                if (isExpanded && isActive) {
                  handleDisactivateCase();
                }
              }}
              style={{ bottom: "0.5rem", right: "0.5rem" }}
            />
            <Button
              icon={isApproved ? "check_box" : "check_box_outline_blank"}
              className="button-small button-square"
              onClick={(e) => {
                e.stopPropagation();
                setIsApproved(!isApproved);
              }}
            />
            <Button
              icon="delete"
              className="button-small button-square"
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteCase();
              }}
              style={{ bottom: "0.5rem", right: "0.5rem" }}
            />
          </div>
        </div>
        {isActive && isExpanded && (
          <div className="position-relative">
            <textarea
              className="form-control w-100 d-block mt-2"
              value={refineField}
              onChange={(e) => {
                setRefineField(e.target.value);
              }}
              style={{
                padding: "1rem",
                height: "6rem",
              }}
            />
            <Button
              icon="send"
              className="position-absolute button-small button-square"
              style={{ bottom: "0.5rem", right: "0.5rem" }}
              onClick={(e) => {
                setCaseField(
                  caseField +
                    `\n Additional information about ${refineField}: additional information...`
                );
              }}
            />
          </div>
        )}
      </div>
    </>
  );
};
