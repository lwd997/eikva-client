import Button from "../universal/Button/Button";
import "./UploadDetails.css";
export const UploadDetails = () => {
  return (
    <div className="upload-details">
      <div className="text-field">TextField</div>
      <div className="actions-group">
        {[0, 1, 2, 3].map((_, index) => {
          return (
            <Button className="action" key={index}>
              Action 01
            </Button>
          );
        })}
      </div>
    </div>
  );
};
