import { useState, useEffect } from "react";
import {
  useGetFolderListQuery,
  useCreateFolderMutation,
  useGetFolderMutation,
  useUploadDocumentMutation,
  useDeleteFolderMutation,
  useDownloadFileMutation,
  useDeleteDocumentMutation,
} from "../store/slice";
import { CoPresentOutlined } from "@mui/icons-material";

interface File {
  id: string;
  name: string;
  type: string;
}

function isEmpty(value: any) {
  return (
    value == null || (typeof value === "string" && value.trim().length === 0)
  );
}

function removeEmptyProperty(obj: any) {
  return Object.entries(obj).reduce((acc: any, [key, value]) => {
    if (!isEmpty(value)) {
      acc[key] = typeof value === "object" ? removeEmptyProperty(value) : value;
    }
    return acc;
  }, {});
}

export function useFileManager() {
  const [files, setFiles] = useState<File[]>([]);

  const [folderStack, setFolderStack] = useState<File[]>([]);

  const [open, setOpen] = useState<boolean>(false);

  const folderListResult = useGetFolderListQuery({});
  const [uploadFile, uploadFileResult] = useUploadDocumentMutation();
  const [downloadFile, downloadFileResult] = useDownloadFileMutation();
  // const [shareFile, shareFileResult] =
  const [folderInfo, folderInfoResult] = useGetFolderMutation();
  const [createFolder, createFolderResult] = useCreateFolderMutation();
  const [deleteFolder, deleteFolderResult] = useDeleteFolderMutation();

  const [deleteDocument, deleteDocumentResult] = useDeleteDocumentMutation();

  //handles begin
  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const formData = new FormData();
      Array.from(event.target.files).forEach((file) => {
        formData.append("files", file);
      });
      if (folderStack.length) {
        formData.append("folder", folderStack[folderStack.length - 1].id);
      }
      uploadFile(formData);
    }
  };

  const handleCreate = (event: any) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    const folderName = formJson.folderName as string;

    createFolder(
      removeEmptyProperty({
        name: folderName,
        parentFolder: folderStack[folderStack.length - 1].id,
      })
    );
  };

  const fetchFolder = (id: string) => {
    if (id) {
      folderInfo(id);
    } else {
      folderListResult.refetch();
    }
  };
  const handleFolderClick = (id: string) => {
    if (!id) return;

    const file = files.find((file) => file.id === id);
    if (!file) return;
    setFolderStack([...folderStack, file]);
    console.log(id);
    fetchFolder(id);
  };

  const handleBackClick = () => {
    setFolderStack(folderStack.length > 0 ? folderStack.slice(0, -1) : []);
    fetchFolder(
      folderStack.length > 1 ? folderStack[folderStack.length - 2].id : ""
    );
  };

  const handleBreadcrumbsClick = (id: string) => {
    if (id) {
      const pos = folderStack.findIndex((folder) => folder.id === id);
      setFolderStack(folderStack.slice(0, pos + 1));
    } else {
      setFolderStack([]);
    }
    fetchFolder(id);
  };
  const handleDownload = (id: string) => {};

  const handleDelete = (id: string, type: string) => {
    console.log(id);
    if (type === "folder") {
      deleteFolder(id);
    } else if (type === "file") {
      deleteDocument(id);
    }
  };

  const handleDialogOpen = () => {
    setOpen(true);
  };

  const handleDialogClose = () => {
    setOpen(false);
  };
  //handles end

  const parseFolder = (folderInfo: {
    folder: object;
    folders: any;
    documents: any;
  }) => {
    removeEmptyProperty(folderInfo);
    const hasFolder = isEmpty(folderInfo?.folders);
    const hasDocs = isEmpty(folderInfo?.documents);

    if (hasFolder && hasDocs) return;

    let folderFiles: File[] = [];
    if (!hasFolder)
      folderInfo.folders.map((folder: any) => {
        folderFiles.push({
          id: folder._id,
          name: folder.name,
          type: "folder",
        });
      });

    if (!hasDocs)
      folderInfo.documents.map((file: any) => {
        folderFiles.push({
          id: file._id,
          name: file.name,
          type: "file",
        });
      });
    setFiles(folderFiles);
  };

  useEffect(() => {
    if (folderListResult.isSuccess) {
      parseFolder(folderListResult.data);
    }
  }, [folderListResult]);

  useEffect(() => {
    if (folderInfoResult.isSuccess) {
      parseFolder(folderInfoResult.data);
    }
  }, [folderInfoResult]);

  useEffect(() => {
    if (createFolderResult.isSuccess) {
      handleDialogClose();
      const id =
        folderStack.length > 0 ? folderStack[folderStack.length - 1].id : "";
      fetchFolder(id);
    }
  }, [createFolderResult]);

  useEffect(() => {
    if (uploadFileResult.isSuccess) {
      const id =
        folderStack.length > 0 ? folderStack[folderStack.length - 1].id : "";
      fetchFolder(id);
    }
  }, [uploadFileResult]);

  useEffect(() => {
    if (deleteFolderResult.isSuccess) {
      const id =
        folderStack.length > 0 ? folderStack[folderStack.length - 1].id : "";
      fetchFolder(id);
    }
  }, [deleteFolderResult]);

  useEffect(() => {
    if (deleteDocumentResult.isSuccess) {
      const id =
        folderStack.length > 0 ? folderStack[folderStack.length - 1].id : "";
      fetchFolder(id);
    }
  });
  return {
    open,
    files,
    folderStack,
    folderListResult,
    createFolderResult,
    fetchFolder,
    handleCreate,
    handleDelete,
    handleUpload,
    handleDownload,
    handleBackClick,
    handleFolderClick,
    handleDialogOpen,
    handleDialogClose,
    handleBreadcrumbsClick,
  };
}
