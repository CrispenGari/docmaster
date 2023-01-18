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

export type ConvertPdfToWordDocumentMutation = {
  __typename?: 'ConvertPDFToWordDocumentMutation';
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

export type ConvertWordDocumentToPdfMutation = {
  __typename?: 'ConvertWordDocumentToPDFMutation';
  error?: Maybe<ErrorType>;
  response?: Maybe<ConvertWordDocToPdfType>;
  success: Scalars['Boolean'];
};

export type ErrorType = {
  __typename?: 'ErrorType';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type GetPdfMetaDataInputType = {
  file: Scalars['Upload'];
};

export type GetPdfMetaDataMutation = {
  __typename?: 'GetPDFMetaDataMutation';
  error?: Maybe<ErrorType>;
  response?: Maybe<PdfMetaDataType>;
  success: Scalars['Boolean'];
};

export type Mutation = {
  __typename?: 'Mutation';
  convertDocToPDF?: Maybe<ConvertWordDocumentToPdfMutation>;
  convertPDFToDocx?: Maybe<ConvertPdfToWordDocumentMutation>;
  getPDFMetaData?: Maybe<GetPdfMetaDataMutation>;
};


export type MutationConvertDocToPdfArgs = {
  input: ConvertWordDocToPdfInputType;
};


export type MutationConvertPdfToDocxArgs = {
  input: ConvertPdfToWordDocInputType;
};


export type MutationGetPdfMetaDataArgs = {
  input: GetPdfMetaDataInputType;
};

export type PdfMetaDataType = {
  __typename?: 'PDFMetaDataType';
  author?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['String']>;
  creator?: Maybe<Scalars['String']>;
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

export type ReadPdfMetaMutationVariables = Exact<{
  input: GetPdfMetaDataInputType;
}>;


export type ReadPdfMetaMutation = { __typename?: 'Mutation', getPDFMetaData?: { __typename?: 'GetPDFMetaDataMutation', success: boolean, error?: { __typename?: 'ErrorType', message: string, field: string } | null, response?: { __typename?: 'PDFMetaDataType', sessionId: string, sessionType: string, pages?: number | null, author?: string | null, producer?: string | null, creator?: string | null, createdAt?: string | null, modifiedAt?: string | null, pageLayout?: string | null, pageLabels?: Array<number | null> | null, isLocked?: boolean | null, pdfHeader?: string | null, pageMode?: string | null } | null } | null };

export const ErrorFragmentFragmentDoc = gql`
    fragment ErrorFragment on ErrorType {
  message
  field
}
    `;
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

      export interface PossibleTypesResultData {
        possibleTypes: {
          [key: string]: string[]
        }
      }
      const result: PossibleTypesResultData = {
  "possibleTypes": {}
};
      export default result;
    