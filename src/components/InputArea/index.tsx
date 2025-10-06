import { useEffect, useState } from "react";
import type { TestCase } from "../../models/TestCase";
import Button from "../universal/Button/Button";
import { http } from "../../http";
import { useDropzone } from "react-dropzone";
import Icon from "../universal/Icon/Icon";
import type { UploadedFile } from "../../models/File";
import { FileElement, FileElementSelected } from "./File";
import "./InputArea.css";

interface InputAreaPorps {
    currentUserUUID: string;
    testCaseGroupUUID: string;
    addTestCases: (testCases: TestCase[]) => void;
}

export const InputArea = ({ addTestCases, testCaseGroupUUID, currentUserUUID }: InputAreaPorps) => {
    const [textInput, setTextInput] = useState("");
    const [fileList, setFileList] = useState<UploadedFile[]>([]);
    const [selectedFileList, setSelectedFileList] = useState<UploadedFile[]>([]);
    const [isHidden, setIsHidden] = useState(true);
    const [outputCount, setOutputCount] = useState(5);
    const [preview, setPreview] = useState("");

    useEffect(() => {
        const listener = async (e: CustomEvent<string[]>) => {

            const localUUIDs = e.detail.filter((el) => fileList.some((f) => f.uuid === el));
            if (localUUIDs.length) {
                const updates = await Promise.all(localUUIDs.map(getFileInfo));

                setFileList(fileList.map((el) => {
                    const match = updates.find((u) => u?.uuid === el.uuid);
                    if (match) {
                        el = match;
                    }

                    return el;
                }));
            }
        }

        window.addEventListener('upload-update', listener);
        return () => {
            window.removeEventListener('upload-update', listener);
        }

    }, [fileList]);

    useEffect(() => {
        getGroupFiles();
    }, [testCaseGroupUUID]);

    const onDrop = async (files: File[]) => {
        if (!files.length) {
            return;
        }

        const uploads = await uploadFiles(files)
        setFileList([
            ...fileList,
            ...uploads.filter(Boolean) as never[]
        ]);
    }

    const { getRootProps, getInputProps } = useDropzone({
        onDrop
    });

    const selectFileForRequest = (f: UploadedFile) => {
        if (!selectedFileList.some((s) => s.uuid === f.uuid)) {
            setSelectedFileList([...selectedFileList, f]);
        }
    }

    const removeSelectedFile = (uuid: string) => {
        setSelectedFileList(selectedFileList.filter((f) => f.uuid !== uuid));
    }

    const getGroupFiles = async () => {
        const response = await http.request<{ files: UploadedFile[] }>("/groups/uploads/" + testCaseGroupUUID);
        if (response.status === 200) {
            setFileList(response.body.files);
        }
    }

    const previewFile = async (uuid: string) => {
        let entry = fileList.find((f) => f.uuid === uuid)
        if (!entry) {
            return;
        }

        if (!entry.content) {
            const info = await getFileInfo(uuid);

            if (!info?.content) {
                return
            }

            entry = info;

            setFileList(fileList.map((f) =>
                f.uuid === info.uuid
                    ? info
                    : f
            ));
        }

        setPreview(entry.content!)
    }

    const getFileInfo = async (uuid: string) => {
        const response = await http.request<UploadedFile>("/uploads/" + uuid);
        return response.body
    }

    const uploadFiles = async (files: File[]) => {
        const fd = new FormData();

        fd.append("group", testCaseGroupUUID);

        for (const f of files) {
            fd.append('files[]', f);
        }

        const response = await http.request<{ files: UploadedFile[] }>("/groups/upload", {
            method: "POST",
            body: fd
        })

        if (response.status === 200) {
            return response.body.files;
        }

        return [];
    }

    const deleteFile = async (uuid: string) => {
        const response = await http.request("/uploads/delete", {
            method: "POST",
            body: { uuid }
        });

        if (response.status === 200) {
            setFileList(fileList.filter((f) => f.uuid !== uuid));
        }
    }

    const generate = async () => {
        const response = await http.request<{ test_cases: TestCase[] }>("/test-cases/start-generation", {
            method: "POST",
            body: {
                amount: outputCount,
                user_input: textInput,
                files: selectedFileList.map((el) => el.uuid),
                test_case_group: testCaseGroupUUID
            }
        });

        if (response.status === 200) {
            addTestCases(response.body.test_cases);
        }
    };

    const compressFile = (uuid: string) => {
        http.request("/uploads/compress", {
            method: "POST",
            body: { uuid }
        });
    }

    const toggleIsHidden = () => setIsHidden(!isHidden);

    if (isHidden) {
        return (
            <div className="show-input-area-container">
                <Button
                    icon="keyboard_double_arrow_up"
                    className="show-input-area-button"
                    onClick={toggleIsHidden}
                />
            </div>
        );
    }

    const { onClick: uploadClick, ...dndRoot } = getRootProps()

    return (
        <div className="input-area card display-flex flex-direction-column">
            <div {...dndRoot} className="filezone display-flex">
                <div className="file-side">
                    <input {...getInputProps()} />
                    <div>
                        <Button
                            icon="upload"
                            onClick={uploadClick}
                            className="margin-bottom-1"
                        >
                            Загрузить
                        </Button>
                    </div>
                    <div className="file-panel">
                        {fileList.length < 1
                            ? (
                                <div className="width-100 text-align-center">
                                    <Icon name="attach_file_add" />
                                    Перетащите файлы сюда или нажмите для выбора
                                </div>
                            )
                            : fileList.map((f) => (
                                <FileElement
                                    key={f.uuid}
                                    currentUserUUID={currentUserUUID}
                                    onSelect={selectFileForRequest}
                                    onCompress={compressFile}
                                    onDelete={deleteFile}
                                    onPreview={previewFile}
                                    {...f}
                                />
                            ))
                        }
                    </div>
                </div>
                <div className="preview">{preview}</div>
            </div>
            <textarea
                className="textarea"
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
            > </textarea>

            <div className="display-flex align-items-center justify-content-space-between">
                <div className="display-flex align-items-center justify-content-start">
                    <Button className="hide-input-area-button" icon="keyboard_double_arrow_down" onClick={toggleIsHidden} />
                    {selectedFileList.map((f) => (
                        <FileElementSelected
                            key={f.uuid}
                            onDelete={removeSelectedFile}
                            {...f}
                        />
                    ))}

                </div>

                <div className="display-flex align-items-center justify-content-end">
                    <div className="display-flex align-items-center">
                        <div>{outputCount}</div>
                        <input
                            min="1"
                            max="10"
                            type="range"
                            className="glass-range"
                            value={outputCount}
                            onChange={(e) => setOutputCount(+e.target.value)}
                        />
                    </div>
                    <Button onClick={generate}>
                        Начать герерацию
                    </Button>
                </div>
            </div>

        </div>
    );
};
