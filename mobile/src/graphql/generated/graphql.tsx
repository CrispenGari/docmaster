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
};

export type ConvertPdfToWordDocType = {
  __typename?: 'ConvertPDFToWordDocType';
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
};

export type ConvertWordDocToPdfType = {
  __typename?: 'ConvertWordDocToPDFType';
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

export type DeleteSession = {
  __typename?: 'DeleteSession';
  error?: Maybe<ErrorType>;
  success: Scalars['Boolean'];
};

export type DeleteSessionInputType = {
  sessionId: Scalars['String'];
  sessionType: Scalars['String'];
};

export type ErrorType = {
  __typename?: 'ErrorType';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type GetPdfMetaData = {
  __typename?: 'GetPDFMetaData';
  error?: Maybe<ErrorType>;
  response?: Maybe<PdfMetaDataType>;
  success: Scalars['Boolean'];
};

export type GetPdfMetaDataInputType = {
  file: Scalars['Upload'];
};

export type Mutation = {
  __typename?: 'Mutation';
  convertDocToPDF?: Maybe<ConvertWordDocumentToPdf>;
  convertPDFToDocx?: Maybe<ConvertPdfToWordDocument>;
  deleteSession?: Maybe<DeleteSession>;
  getPDFMetaData?: Maybe<GetPdfMetaData>;
};


export type MutationConvertDocToPdfArgs = {
  input: ConvertWordDocToPdfInputType;
};


export type MutationConvertPdfToDocxArgs = {
  input: ConvertPdfToWordDocInputType;
};


export type MutationDeleteSessionArgs = {
  input: DeleteSessionInputType;
};


export type MutationGetPdfMetaDataArgs = {
  input: GetPdfMetaDataInputType;
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

export type Query = {
  __typename?: 'Query';
  hello?: Maybe<Scalars['String']>;
};

export type ErrorFragmentFragment = { __typename?: 'ErrorType', message: string, field: string };

export type DeleteSessionMutationVariables = Exact<{
  input: DeleteSessionInputType;
}>;


export type DeleteSessionMutation = { __typename?: 'Mutation', deleteSession?: { __typename?: 'DeleteSession', success: boolean, error?: { __typename?: 'ErrorType', message: string, field: string } | null } | null };

export type ReadPdfMetaMutationVariables = Exact<{
  input: GetPdfMetaDataInputType;
}>;


export type ReadPdfMetaMutation = { __typename?: 'Mutation', getPDFMetaData?: { __typename?: 'GetPDFMetaData', success: boolean, error?: { __typename?: 'ErrorType', message: string, field: string } | null, response?: { __typename?: 'PDFMetaDataType', sessionId: string, sessionType: string, documentName: string, pages?: number | null, author?: string | null, producer?: string | null, creator?: string | null, createdAt?: string | null, modifiedAt?: string | null, pageLayout?: string | null, pageLabels?: Array<number | null> | null, isLocked?: boolean | null, pdfHeader?: string | null, pageMode?: string | null } | null } | null };

export type ConvertPdf2WordMutationVariables = Exact<{
  input: ConvertPdfToWordDocInputType;
}>;


export type ConvertPdf2WordMutation = { __typename?: 'Mutation', convertPDFToDocx?: { __typename?: 'ConvertPDFToWordDocument', success: boolean, error?: { __typename?: 'ErrorType', field: string, message: string } | null, response?: { __typename?: 'ConvertPDFToWordDocType', url: string, sessionId: string, sessionType: string } | null } | null };

export type ConvertWord2PdfMutationVariables = Exact<{
  input: ConvertWordDocToPdfInputType;
}>;


export type ConvertWord2PdfMutation = { __typename?: 'Mutation', convertDocToPDF?: { __typename?: 'ConvertWordDocumentToPDF', success: boolean, error?: { __typename?: 'ErrorType', message: string, field: string } | null, response?: { __typename?: 'ConvertWordDocToPDFType', url: string, sessionId: string, sessionType: string } | null } | null };

export const ErrorFragmentFragmentDoc = gql`
    fragment ErrorFragment on ErrorType {
  message
  field
}
    `;
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

      export interface PossibleTypesResultData {
        possibleTypes: {
          [key: string]: string[]
        }
      }
      const result: PossibleTypesResultData = {
  "possibleTypes": {}
};
      export default result;
    