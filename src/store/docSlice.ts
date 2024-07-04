import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DocumentState {}

const initialState: DocumentState = {};

const authSlice = createSlice({
  name: "document",
  initialState,
  reducers: {
    // Retrieve a list of documents
    retrieveDocumentList(state, action) {},

    retrieveSpecificDocument(state, action) {},
    // Upload a new document
    createDocument(state, action) {},
    // Delete a document
    deleteDocument(state, action) {},
    // Update a document (e.g., rename, move)
    updateDocument(state, action) {},
    // Share a document
    shareDocument(state, action) {},
  },
});

export const {} = authSlice.actions;

export default authSlice.reducer;
