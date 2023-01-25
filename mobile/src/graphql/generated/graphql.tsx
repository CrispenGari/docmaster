import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Upload: any;
};

export type ConvertPdfToWordDocInputType = {
  file: Scalars['Upload'];
  saveName?: InputMaybe<Scalars['String']>;
  sessionId: Scalars['String'];
};

export type ConvertPdfToWordDocType = {
  __typename?: 'ConvertPDFToWordDocType';
  documentName: Scalars['String'];
  sessionId: Scalars['String'];
  sessionType: Scalars['String'];
  url: Scalars['String'];
};

export type ConvertPdfToWordDocument = {
  __typename?: 'ConvertPDFToWordDocument';
  error?: Maybe<ErrorType>;
  response?: Maybe<ConvertPdfToWordDocType>;
  success: Scalars['Boolean'];
};

export type ConvertWordDocToPdfInputType = {
  file: Scalars['Upload'];
  saveName?: InputMaybe<Scalars['String']>;
  sessionId: Scalars['String'];
};

export type ConvertWordDocToPdfType = {
  __typename?: 'ConvertWordDocToPDFType';
  documentName: Scalars['String'];
  sessionId: Scalars['String'];
  sessionType: Scalars['String'];
  url: Scalars['String'];
};

export type ConvertWordDocumentToPdf = {
  __typename?: 'ConvertWordDocumentToPDF';
  error?: Maybe<ErrorType>;
  response?: Maybe<ConvertWordDocToPdfType>;
  success: Scalars['Boolean'];
};

export type CreateSession = {
  __typename?: 'CreateSession';
  error?: Maybe<ErrorType>;
  sessionId?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type DecryptPdfDocument = {
  __typename?: 'DecryptPDFDocument';
  error?: Maybe<ErrorType>;
  response?: Maybe<DecryptPdfFileType>;
  success: Scalars['Boolean'];
};

export type DecryptPdfFileType = {
  __typename?: 'DecryptPDFFileType';
  documentName: Scalars['String'];
  sessionId: Scalars['String'];
  sessionType: Scalars['String'];
  url: Scalars['String'];
};

export type DecryptPdfInputType = {
  file: Scalars['Upload'];
  password: Scalars['String'];
  sessionId: Scalars['String'];
};

export type DeleteSession = {
  __typename?: 'DeleteSession';
  error?: Maybe<ErrorType>;
  success: Scalars['Boolean'];
};

export type DeleteSessionInputType = {
  sessionId: Scalars['String'];
};

export type EncryptPdfDocument = {
  __typename?: 'EncryptPDFDocument';
  error?: Maybe<ErrorType>;
  response?: Maybe<EncryptPdfFileType>;
  success: Scalars['Boolean'];
};

export type EncryptPdfFileType = {
  __typename?: 'EncryptPDFFileType';
  documentName: Scalars['String'];
  sessionId: Scalars['String'];
  sessionType: Scalars['String'];
  url: Scalars['String'];
};

export type EncryptPdfInputType = {
  file: Scalars['Upload'];
  password: Scalars['String'];
  sessionId: Scalars['String'];
};

export type ErrorType = {
  __typename?: 'ErrorType';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type ExtractImages = {
  __typename?: 'ExtractImages';
  error?: Maybe<ErrorType>;
  response?: Maybe<ExtractImagesType>;
  success: Scalars['Boolean'];
};

export type ExtractImagesInputType = {
  file: Scalars['Upload'];
  pageNumber: Scalars['Int'];
  sessionId: Scalars['String'];
};

export type ExtractImagesType = {
  __typename?: 'ExtractImagesType';
  documentName: Scalars['String'];
  images: Array<Scalars['String']>;
  sessionId: Scalars['String'];
  sessionType: Scalars['String'];
};

export type GetPdfMetaData = {
  __typename?: 'GetPDFMetaData';
  error?: Maybe<ErrorType>;
  response?: Maybe<PdfMetaDataType>;
  success: Scalars['Boolean'];
};

export type GetPdfMetaDataInputType = {
  file: Scalars['Upload'];
  sessionId: Scalars['String'];
};

export type MergePdfFilesInputType = {
  pdfs: Array<MergePdfInputType>;
  saveName: Scalars['String'];
  sessionId: Scalars['String'];
};

export type MergePdfFilesMutation = {
  __typename?: 'MergePDFFilesMutation';
  error?: Maybe<ErrorType>;
  response?: Maybe<MergePdfFilesType>;
  success: Scalars['Boolean'];
};

export type MergePdfFilesType = {
  __typename?: 'MergePDFFilesType';
  documentName: Scalars['String'];
  sessionId: Scalars['String'];
  sessionType: Scalars['String'];
  url: Scalars['String'];
};

export type MergePdfInputType = {
  documentNumber: Scalars['Int'];
  file: Scalars['Upload'];
  pages: Array<InputMaybe<Scalars['Int']>>;
  sessionId: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  convertDocToPDF?: Maybe<ConvertWordDocumentToPdf>;
  convertPDFToDocx?: Maybe<ConvertPdfToWordDocument>;
  createSession?: Maybe<CreateSession>;
  decryptPDF?: Maybe<DecryptPdfDocument>;
  deleteSession?: Maybe<DeleteSession>;
  encryptPDF?: Maybe<EncryptPdfDocument>;
  extractImages?: Maybe<ExtractImages>;
  getPDFMetaData?: Maybe<GetPdfMetaData>;
  mergePDFs?: Maybe<MergePdfFilesMutation>;
  reducePDFSize?: Maybe<ReducePdfSize>;
  setMetaData?: Maybe<SetPdfMetaData>;
};


export type MutationConvertDocToPdfArgs = {
  input: ConvertWordDocToPdfInputType;
};


export type MutationConvertPdfToDocxArgs = {
  input: ConvertPdfToWordDocInputType;
};


export type MutationDecryptPdfArgs = {
  input: DecryptPdfInputType;
};


export type MutationDeleteSessionArgs = {
  input: DeleteSessionInputType;
};


export type MutationEncryptPdfArgs = {
  input: EncryptPdfInputType;
};


export type MutationExtractImagesArgs = {
  input: ExtractImagesInputType;
};


export type MutationGetPdfMetaDataArgs = {
  input: GetPdfMetaDataInputType;
};


export type MutationMergePdFsArgs = {
  input: MergePdfFilesInputType;
};


export type MutationReducePdfSizeArgs = {
  input: ReducePdfSizeInputType;
};


export type MutationSetMetaDataArgs = {
  input: SetPdfMetaDataInputType;
};

export type PdfMetaDataType = {
  __typename?: 'PDFMetaDataType';
  author?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['String']>;
  creator?: Maybe<Scalars['String']>;
  documentName: Scalars['String'];
  isLocked?: Maybe<Scalars['Boolean']>;
  modifiedAt?: Maybe<Scalars['String']>;
  pageLabels?: Maybe<Array<Maybe<Scalars['Int']>>>;
  pageLayout?: Maybe<Scalars['String']>;
  pageMode?: Maybe<Scalars['String']>;
  pages?: Maybe<Scalars['Int']>;
  pdfHeader?: Maybe<Scalars['String']>;
  producer?: Maybe<Scalars['String']>;
  sessionId: Scalars['String'];
  sessionType: Scalars['String'];
};

export type PdfMetaResponse = {
  __typename?: 'PDFMetaResponse';
  error?: Maybe<ErrorType>;
  response?: Maybe<PdfMetaDataType>;
  success: Scalars['Boolean'];
};

export type Query = {
  __typename?: 'Query';
  hello?: Maybe<Scalars['String']>;
  meta?: Maybe<PdfMetaResponse>;
};


export type QueryMetaArgs = {
  input: GetPdfMetaDataInputType;
};

export type ReducePdfSize = {
  __typename?: 'ReducePDFSize';
  error?: Maybe<ErrorType>;
  response?: Maybe<ReducePdfSizeType>;
  success: Scalars['Boolean'];
};

export type ReducePdfSizeInputType = {
  file: Scalars['Upload'];
  saveName?: InputMaybe<Scalars['String']>;
  sessionId: Scalars['String'];
};

export type ReducePdfSizeType = {
  __typename?: 'ReducePDFSizeType';
  documentName: Scalars['String'];
  inputSize: Scalars['String'];
  outputSize: Scalars['String'];
  sessionId: Scalars['String'];
  sessionType: Scalars['String'];
  url: Scalars['String'];
};

export type SetPdfMetaData = {
  __typename?: 'SetPDFMetaData';
  error?: Maybe<ErrorType>;
  response?: Maybe<SetPdfMetaDataType>;
  success: Scalars['Boolean'];
};

export type SetPdfMetaDataInputType = {
  author?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['String']>;
  creator?: InputMaybe<Scalars['String']>;
  file: Scalars['Upload'];
  producer?: InputMaybe<Scalars['String']>;
  saveName?: InputMaybe<Scalars['String']>;
  sessionId: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['String']>;
};

export type SetPdfMetaDataType = {
  __typename?: 'SetPDFMetaDataType';
  author?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['String']>;
  creator?: Maybe<Scalars['String']>;
  documentName: Scalars['String'];
  isLocked?: Maybe<Scalars['Boolean']>;
  modifiedAt?: Maybe<Scalars['String']>;
  pageLabels?: Maybe<Array<Maybe<Scalars['Int']>>>;
  pageLayout?: Maybe<Scalars['String']>;
  pageMode?: Maybe<Scalars['String']>;
  pages?: Maybe<Scalars['Int']>;
  pdfHeader?: Maybe<Scalars['String']>;
  producer?: Maybe<Scalars['String']>;
  sessionId: Scalars['String'];
  sessionType: Scalars['String'];
  url: Scalars['String'];
};

export type ErrorFragmentFragment = { __typename?: 'ErrorType', message: string, field: string };

export type CreateSessionMutationVariables = Exact<{ [key: string]: never; }>;


export type CreateSessionMutation = { __typename?: 'Mutation', createSession?: { __typename?: 'CreateSession', success: boolean, sessionId?: string | null, error?: { __typename?: 'ErrorType', message: string, field: string } | null } | null };

export type DecryptPdfMutationVariables = Exact<{
  input: DecryptPdfInputType;
}>;


export type DecryptPdfMutation = { __typename?: 'Mutation', decryptPDF?: { __typename?: 'DecryptPDFDocument', success: boolean, error?: { __typename?: 'ErrorType', message: string, field: string } | null, response?: { __typename?: 'DecryptPDFFileType', url: string, sessionId: string, sessionType: string, documentName: string } | null } | null };

export type DeleteSessionMutationVariables = Exact<{
  input: DeleteSessionInputType;
}>;


export type DeleteSessionMutation = { __typename?: 'Mutation', deleteSession?: { __typename?: 'DeleteSession', success: boolean, error?: { __typename?: 'ErrorType', message: string, field: string } | null } | null };

export type EncryptPdfMutationVariables = Exact<{
  input: EncryptPdfInputType;
}>;


export type EncryptPdfMutation = { __typename?: 'Mutation', encryptPDF?: { __typename?: 'EncryptPDFDocument', success: boolean, error?: { __typename?: 'ErrorType', message: string, field: string } | null, response?: { __typename?: 'EncryptPDFFileType', url: string, sessionId: string, sessionType: string, documentName: string } | null } | null };

export type ExtractImagesMutationVariables = Exact<{
  input: ExtractImagesInputType;
}>;


export type ExtractImagesMutation = { __typename?: 'Mutation', extractImages?: { __typename?: 'ExtractImages', success: boolean, error?: { __typename?: 'ErrorType', message: string, field: string } | null, response?: { __typename?: 'ExtractImagesType', images: Array<string>, sessionId: string, sessionType: string, documentName: string } | null } | null };

export type ReadPdfMetaMutationVariables = Exact<{
  input: GetPdfMetaDataInputType;
}>;


export type ReadPdfMetaMutation = { __typename?: 'Mutation', getPDFMetaData?: { __typename?: 'GetPDFMetaData', success: boolean, error?: { __typename?: 'ErrorType', message: string, field: string } | null, response?: { __typename?: 'PDFMetaDataType', sessionId: string, sessionType: string, documentName: string, pages?: number | null, author?: string | null, producer?: string | null, creator?: string | null, createdAt?: string | null, modifiedAt?: string | null, pageLayout?: string | null, pageLabels?: Array<number | null> | null, isLocked?: boolean | null, pdfHeader?: string | null, pageMode?: string | null } | null } | null };

export type MergePdFsMutationVariables = Exact<{
  input: MergePdfFilesInputType;
}>;


export type MergePdFsMutation = { __typename?: 'Mutation', mergePDFs?: { __typename?: 'MergePDFFilesMutation', success: boolean, error?: { __typename?: 'ErrorType', message: string, field: string } | null, response?: { __typename?: 'MergePDFFilesType', sessionId: string, documentName: string, sessionType: string, url: string } | null } | null };

export type ConvertPdf2WordMutationVariables = Exact<{
  input: ConvertPdfToWordDocInputType;
}>;


export type ConvertPdf2WordMutation = { __typename?: 'Mutation', convertPDFToDocx?: { __typename?: 'ConvertPDFToWordDocument', success: boolean, error?: { __typename?: 'ErrorType', field: string, message: string } | null, response?: { __typename?: 'ConvertPDFToWordDocType', url: string, sessionId: string, sessionType: string, documentName: string } | null } | null };

export type ReducePdfSizeMutationVariables = Exact<{
  input: ReducePdfSizeInputType;
}>;


export type ReducePdfSizeMutation = { __typename?: 'Mutation', reducePDFSize?: { __typename?: 'ReducePDFSize', success: boolean, error?: { __typename?: 'ErrorType', message: string, field: string } | null, response?: { __typename?: 'ReducePDFSizeType', url: string, sessionId: string, sessionType: string, documentName: string, inputSize: string, outputSize: string } | null } | null };

export type SetPdfMetaMutationVariables = Exact<{
  input: SetPdfMetaDataInputType;
}>;


export type SetPdfMetaMutation = { __typename?: 'Mutation', setMetaData?: { __typename?: 'SetPDFMetaData', success: boolean, error?: { __typename?: 'ErrorType', message: string, field: string } | null, response?: { __typename?: 'SetPDFMetaDataType', url: string, sessionId: string, sessionType: string, pages?: number | null, author?: string | null, producer?: string | null, createdAt?: string | null, modifiedAt?: string | null, creator?: string | null, documentName: string } | null } | null };

export type ConvertWord2PdfMutationVariables = Exact<{
  input: ConvertWordDocToPdfInputType;
}>;


export type ConvertWord2PdfMutation = { __typename?: 'Mutation', convertDocToPDF?: { __typename?: 'ConvertWordDocumentToPDF', success: boolean, error?: { __typename?: 'ErrorType', message: string, field: string } | null, response?: { __typename?: 'ConvertWordDocToPDFType', url: string, sessionId: string, sessionType: string, documentName: string } | null } | null };

export type GetPdfMetaDataQueryVariables = Exact<{
  input: GetPdfMetaDataInputType;
}>;


export type GetPdfMetaDataQuery = { __typename?: 'Query', meta?: { __typename?: 'PDFMetaResponse', success: boolean, error?: { __typename?: 'ErrorType', message: string, field: string } | null, response?: { __typename?: 'PDFMetaDataType', sessionId: string, sessionType: string, documentName: string, pages?: number | null, author?: string | null, producer?: string | null, creator?: string | null, createdAt?: string | null, modifiedAt?: string | null, pageLayout?: string | null, pageLabels?: Array<number | null> | null, isLocked?: boolean | null, pdfHeader?: string | null, pageMode?: string | null } | null } | null };

export const ErrorFragmentFragmentDoc = gql`
    fragment ErrorFragment on ErrorType {
  message
  field
}
    `;
export const CreateSessionDocument = gql`
    mutation CreateSession {
  createSession {
    error {
      ...ErrorFragment
    }
    success
    sessionId
  }
}
    ${ErrorFragmentFragmentDoc}`;
export type CreateSessionMutationFn = Apollo.MutationFunction<CreateSessionMutation, CreateSessionMutationVariables>;

/**
 * __useCreateSessionMutation__
 *
 * To run a mutation, you first call `useCreateSessionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSessionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSessionMutation, { data, loading, error }] = useCreateSessionMutation({
 *   variables: {
 *   },
 * });
 */
export function useCreateSessionMutation(baseOptions?: Apollo.MutationHookOptions<CreateSessionMutation, CreateSessionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateSessionMutation, CreateSessionMutationVariables>(CreateSessionDocument, options);
      }
export type CreateSessionMutationHookResult = ReturnType<typeof useCreateSessionMutation>;
export type CreateSessionMutationResult = Apollo.MutationResult<CreateSessionMutation>;
export type CreateSessionMutationOptions = Apollo.BaseMutationOptions<CreateSessionMutation, CreateSessionMutationVariables>;
export const DecryptPdfDocument = gql`
    mutation DecryptPDF($input: DecryptPDFInputType!) {
  decryptPDF(input: $input) {
    error {
      ...ErrorFragment
    }
    success
    response {
      url
      sessionId
      sessionType
      documentName
    }
  }
}
    ${ErrorFragmentFragmentDoc}`;
export type DecryptPdfMutationFn = Apollo.MutationFunction<DecryptPdfMutation, DecryptPdfMutationVariables>;

/**
 * __useDecryptPdfMutation__
 *
 * To run a mutation, you first call `useDecryptPdfMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDecryptPdfMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [decryptPdfMutation, { data, loading, error }] = useDecryptPdfMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDecryptPdfMutation(baseOptions?: Apollo.MutationHookOptions<DecryptPdfMutation, DecryptPdfMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DecryptPdfMutation, DecryptPdfMutationVariables>(DecryptPdfDocument, options);
      }
export type DecryptPdfMutationHookResult = ReturnType<typeof useDecryptPdfMutation>;
export type DecryptPdfMutationResult = Apollo.MutationResult<DecryptPdfMutation>;
export type DecryptPdfMutationOptions = Apollo.BaseMutationOptions<DecryptPdfMutation, DecryptPdfMutationVariables>;
export const DeleteSessionDocument = gql`
    mutation DeleteSession($input: DeleteSessionInputType!) {
  deleteSession(input: $input) {
    error {
      ...ErrorFragment
    }
    success
  }
}
    ${ErrorFragmentFragmentDoc}`;
export type DeleteSessionMutationFn = Apollo.MutationFunction<DeleteSessionMutation, DeleteSessionMutationVariables>;

/**
 * __useDeleteSessionMutation__
 *
 * To run a mutation, you first call `useDeleteSessionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteSessionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteSessionMutation, { data, loading, error }] = useDeleteSessionMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteSessionMutation(baseOptions?: Apollo.MutationHookOptions<DeleteSessionMutation, DeleteSessionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteSessionMutation, DeleteSessionMutationVariables>(DeleteSessionDocument, options);
      }
export type DeleteSessionMutationHookResult = ReturnType<typeof useDeleteSessionMutation>;
export type DeleteSessionMutationResult = Apollo.MutationResult<DeleteSessionMutation>;
export type DeleteSessionMutationOptions = Apollo.BaseMutationOptions<DeleteSessionMutation, DeleteSessionMutationVariables>;
export const EncryptPdfDocument = gql`
    mutation EncryptPDF($input: EncryptPDFInputType!) {
  encryptPDF(input: $input) {
    error {
      ...ErrorFragment
    }
    success
    response {
      url
      sessionId
      sessionType
      documentName
    }
  }
}
    ${ErrorFragmentFragmentDoc}`;
export type EncryptPdfMutationFn = Apollo.MutationFunction<EncryptPdfMutation, EncryptPdfMutationVariables>;

/**
 * __useEncryptPdfMutation__
 *
 * To run a mutation, you first call `useEncryptPdfMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEncryptPdfMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [encryptPdfMutation, { data, loading, error }] = useEncryptPdfMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useEncryptPdfMutation(baseOptions?: Apollo.MutationHookOptions<EncryptPdfMutation, EncryptPdfMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EncryptPdfMutation, EncryptPdfMutationVariables>(EncryptPdfDocument, options);
      }
export type EncryptPdfMutationHookResult = ReturnType<typeof useEncryptPdfMutation>;
export type EncryptPdfMutationResult = Apollo.MutationResult<EncryptPdfMutation>;
export type EncryptPdfMutationOptions = Apollo.BaseMutationOptions<EncryptPdfMutation, EncryptPdfMutationVariables>;
export const ExtractImagesDocument = gql`
    mutation ExtractImages($input: ExtractImagesInputType!) {
  extractImages(input: $input) {
    error {
      ...ErrorFragment
    }
    success
    response {
      images
      sessionId
      sessionType
      documentName
    }
  }
}
    ${ErrorFragmentFragmentDoc}`;
export type ExtractImagesMutationFn = Apollo.MutationFunction<ExtractImagesMutation, ExtractImagesMutationVariables>;

/**
 * __useExtractImagesMutation__
 *
 * To run a mutation, you first call `useExtractImagesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useExtractImagesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [extractImagesMutation, { data, loading, error }] = useExtractImagesMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useExtractImagesMutation(baseOptions?: Apollo.MutationHookOptions<ExtractImagesMutation, ExtractImagesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ExtractImagesMutation, ExtractImagesMutationVariables>(ExtractImagesDocument, options);
      }
export type ExtractImagesMutationHookResult = ReturnType<typeof useExtractImagesMutation>;
export type ExtractImagesMutationResult = Apollo.MutationResult<ExtractImagesMutation>;
export type ExtractImagesMutationOptions = Apollo.BaseMutationOptions<ExtractImagesMutation, ExtractImagesMutationVariables>;
export const ReadPdfMetaDocument = gql`
    mutation ReadPDFMeta($input: GetPDFMetaDataInputType!) {
  getPDFMetaData(input: $input) {
    success
    error {
      ...ErrorFragment
    }
    response {
      sessionId
      sessionType
      documentName
      pages
      author
      producer
      creator
      createdAt
      modifiedAt
      pageLayout
      pageLabels
      isLocked
      pdfHeader
      pageMode
    }
  }
}
    ${ErrorFragmentFragmentDoc}`;
export type ReadPdfMetaMutationFn = Apollo.MutationFunction<ReadPdfMetaMutation, ReadPdfMetaMutationVariables>;

/**
 * __useReadPdfMetaMutation__
 *
 * To run a mutation, you first call `useReadPdfMetaMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReadPdfMetaMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [readPdfMetaMutation, { data, loading, error }] = useReadPdfMetaMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useReadPdfMetaMutation(baseOptions?: Apollo.MutationHookOptions<ReadPdfMetaMutation, ReadPdfMetaMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ReadPdfMetaMutation, ReadPdfMetaMutationVariables>(ReadPdfMetaDocument, options);
      }
export type ReadPdfMetaMutationHookResult = ReturnType<typeof useReadPdfMetaMutation>;
export type ReadPdfMetaMutationResult = Apollo.MutationResult<ReadPdfMetaMutation>;
export type ReadPdfMetaMutationOptions = Apollo.BaseMutationOptions<ReadPdfMetaMutation, ReadPdfMetaMutationVariables>;
export const MergePdFsDocument = gql`
    mutation MergePDFs($input: MergePDFFilesInputType!) {
  mergePDFs(input: $input) {
    error {
      ...ErrorFragment
    }
    success
    response {
      sessionId
      documentName
      sessionType
      url
    }
  }
}
    ${ErrorFragmentFragmentDoc}`;
export type MergePdFsMutationFn = Apollo.MutationFunction<MergePdFsMutation, MergePdFsMutationVariables>;

/**
 * __useMergePdFsMutation__
 *
 * To run a mutation, you first call `useMergePdFsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMergePdFsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [mergePdFsMutation, { data, loading, error }] = useMergePdFsMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useMergePdFsMutation(baseOptions?: Apollo.MutationHookOptions<MergePdFsMutation, MergePdFsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MergePdFsMutation, MergePdFsMutationVariables>(MergePdFsDocument, options);
      }
export type MergePdFsMutationHookResult = ReturnType<typeof useMergePdFsMutation>;
export type MergePdFsMutationResult = Apollo.MutationResult<MergePdFsMutation>;
export type MergePdFsMutationOptions = Apollo.BaseMutationOptions<MergePdFsMutation, MergePdFsMutationVariables>;
export const ConvertPdf2WordDocument = gql`
    mutation ConvertPDF2Word($input: ConvertPDFToWordDocInputType!) {
  convertPDFToDocx(input: $input) {
    error {
      field
      message
    }
    success
    response {
      url
      sessionId
      sessionType
      documentName
    }
  }
}
    `;
export type ConvertPdf2WordMutationFn = Apollo.MutationFunction<ConvertPdf2WordMutation, ConvertPdf2WordMutationVariables>;

/**
 * __useConvertPdf2WordMutation__
 *
 * To run a mutation, you first call `useConvertPdf2WordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useConvertPdf2WordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [convertPdf2WordMutation, { data, loading, error }] = useConvertPdf2WordMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useConvertPdf2WordMutation(baseOptions?: Apollo.MutationHookOptions<ConvertPdf2WordMutation, ConvertPdf2WordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ConvertPdf2WordMutation, ConvertPdf2WordMutationVariables>(ConvertPdf2WordDocument, options);
      }
export type ConvertPdf2WordMutationHookResult = ReturnType<typeof useConvertPdf2WordMutation>;
export type ConvertPdf2WordMutationResult = Apollo.MutationResult<ConvertPdf2WordMutation>;
export type ConvertPdf2WordMutationOptions = Apollo.BaseMutationOptions<ConvertPdf2WordMutation, ConvertPdf2WordMutationVariables>;
export const ReducePdfSizeDocument = gql`
    mutation ReducePDFSize($input: ReducePDFSizeInputType!) {
  reducePDFSize(input: $input) {
    error {
      ...ErrorFragment
    }
    success
    response {
      url
      sessionId
      sessionType
      documentName
      inputSize
      outputSize
    }
  }
}
    ${ErrorFragmentFragmentDoc}`;
export type ReducePdfSizeMutationFn = Apollo.MutationFunction<ReducePdfSizeMutation, ReducePdfSizeMutationVariables>;

/**
 * __useReducePdfSizeMutation__
 *
 * To run a mutation, you first call `useReducePdfSizeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReducePdfSizeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [reducePdfSizeMutation, { data, loading, error }] = useReducePdfSizeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useReducePdfSizeMutation(baseOptions?: Apollo.MutationHookOptions<ReducePdfSizeMutation, ReducePdfSizeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ReducePdfSizeMutation, ReducePdfSizeMutationVariables>(ReducePdfSizeDocument, options);
      }
export type ReducePdfSizeMutationHookResult = ReturnType<typeof useReducePdfSizeMutation>;
export type ReducePdfSizeMutationResult = Apollo.MutationResult<ReducePdfSizeMutation>;
export type ReducePdfSizeMutationOptions = Apollo.BaseMutationOptions<ReducePdfSizeMutation, ReducePdfSizeMutationVariables>;
export const SetPdfMetaDocument = gql`
    mutation SetPDFMeta($input: SetPDFMetaDataInputType!) {
  setMetaData(input: $input) {
    error {
      ...ErrorFragment
    }
    success
    response {
      url
      sessionId
      sessionType
      pages
      author
      producer
      createdAt
      modifiedAt
      creator
      documentName
    }
  }
}
    ${ErrorFragmentFragmentDoc}`;
export type SetPdfMetaMutationFn = Apollo.MutationFunction<SetPdfMetaMutation, SetPdfMetaMutationVariables>;

/**
 * __useSetPdfMetaMutation__
 *
 * To run a mutation, you first call `useSetPdfMetaMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetPdfMetaMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setPdfMetaMutation, { data, loading, error }] = useSetPdfMetaMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSetPdfMetaMutation(baseOptions?: Apollo.MutationHookOptions<SetPdfMetaMutation, SetPdfMetaMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SetPdfMetaMutation, SetPdfMetaMutationVariables>(SetPdfMetaDocument, options);
      }
export type SetPdfMetaMutationHookResult = ReturnType<typeof useSetPdfMetaMutation>;
export type SetPdfMetaMutationResult = Apollo.MutationResult<SetPdfMetaMutation>;
export type SetPdfMetaMutationOptions = Apollo.BaseMutationOptions<SetPdfMetaMutation, SetPdfMetaMutationVariables>;
export const ConvertWord2PdfDocument = gql`
    mutation ConvertWord2PDF($input: ConvertWordDocToPDFInputType!) {
  convertDocToPDF(input: $input) {
    error {
      ...ErrorFragment
    }
    success
    response {
      url
      sessionId
      sessionType
      documentName
    }
  }
}
    ${ErrorFragmentFragmentDoc}`;
export type ConvertWord2PdfMutationFn = Apollo.MutationFunction<ConvertWord2PdfMutation, ConvertWord2PdfMutationVariables>;

/**
 * __useConvertWord2PdfMutation__
 *
 * To run a mutation, you first call `useConvertWord2PdfMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useConvertWord2PdfMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [convertWord2PdfMutation, { data, loading, error }] = useConvertWord2PdfMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useConvertWord2PdfMutation(baseOptions?: Apollo.MutationHookOptions<ConvertWord2PdfMutation, ConvertWord2PdfMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ConvertWord2PdfMutation, ConvertWord2PdfMutationVariables>(ConvertWord2PdfDocument, options);
      }
export type ConvertWord2PdfMutationHookResult = ReturnType<typeof useConvertWord2PdfMutation>;
export type ConvertWord2PdfMutationResult = Apollo.MutationResult<ConvertWord2PdfMutation>;
export type ConvertWord2PdfMutationOptions = Apollo.BaseMutationOptions<ConvertWord2PdfMutation, ConvertWord2PdfMutationVariables>;
export const GetPdfMetaDataDocument = gql`
    query GetPDFMetaData($input: GetPDFMetaDataInputType!) {
  meta(input: $input) {
    success
    error {
      ...ErrorFragment
    }
    response {
      sessionId
      sessionType
      documentName
      pages
      author
      producer
      creator
      createdAt
      modifiedAt
      pageLayout
      pageLabels
      isLocked
      pdfHeader
      pageMode
    }
  }
}
    ${ErrorFragmentFragmentDoc}`;

/**
 * __useGetPdfMetaDataQuery__
 *
 * To run a query within a React component, call `useGetPdfMetaDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPdfMetaDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPdfMetaDataQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetPdfMetaDataQuery(baseOptions: Apollo.QueryHookOptions<GetPdfMetaDataQuery, GetPdfMetaDataQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPdfMetaDataQuery, GetPdfMetaDataQueryVariables>(GetPdfMetaDataDocument, options);
      }
export function useGetPdfMetaDataLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPdfMetaDataQuery, GetPdfMetaDataQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPdfMetaDataQuery, GetPdfMetaDataQueryVariables>(GetPdfMetaDataDocument, options);
        }
export type GetPdfMetaDataQueryHookResult = ReturnType<typeof useGetPdfMetaDataQuery>;
export type GetPdfMetaDataLazyQueryHookResult = ReturnType<typeof useGetPdfMetaDataLazyQuery>;
export type GetPdfMetaDataQueryResult = Apollo.QueryResult<GetPdfMetaDataQuery, GetPdfMetaDataQueryVariables>;

      export interface PossibleTypesResultData {
        possibleTypes: {
          [key: string]: string[]
        }
      }
      const result: PossibleTypesResultData = {
  "possibleTypes": {}
};
      export default result;
    