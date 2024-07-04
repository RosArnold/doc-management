import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FolderState {
  folders: object;
}

const initialState: FolderState = {
  folders: [],
};

const fileSlice = createSlice({
  name: "file",
  initialState,
  reducers: {
    retriveFolderList(state, action) {},
    retriveSpecificFolder(state, action) {},
    createFolder(state, action) {},
    deleteFolder(state, action) {},
    updateFolder(state, action) {},
  },
});

export const {
  createFolder,
  deleteFolder,
  retriveFolderList,
  retriveSpecificFolder,
} = fileSlice.actions;

export default fileSlice.reducer;
