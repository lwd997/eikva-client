import type { UploadedFile } from "../../models/File";
import Icon from "../universal/Icon/Icon";

type FileElementProps = UploadedFile & {
    currentUserUUID: string;
    onPreview: (uuid: string) => void;
    onDelete: (uuid: string) => void;
    onCompress: (uuid: string) => void;
    onSelect: (f: UploadedFile) => void;
}

export const FileElement = ({
    currentUserUUID,
    onPreview,
    onDelete,
    onCompress,
    onSelect,
    ...file
}: FileElementProps) => {
    return (
        <div className="file">
            <div className="file" onClick={() => onSelect(file)}>
                <Icon name="docs"/>
                <div>{file.name}</div>
            </div>
            <Icon name="compress" onClick={() => onCompress(file.uuid)}/>
            <Icon name="search" onClick={() => onPreview(file.uuid)}/>
        </div>
    );
}


export const FileElementSelected = ({
    onDelete,
    ...file
}: UploadedFile & Pick<FileElementProps, 'onDelete'>) => {
    return (
        <div className="file">
            <Icon name="docs" />
            <div>{file.name}</div>
            <Icon name="close" onClick={() => onDelete(file.uuid)} />
        </div>
    );
}



