import type * as Types from './operations';

import gql from 'graphql-tag';
import type * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';

export const GetPostsDocument = gql`
  query getPosts($options: PageQueryOptions) {
    posts(options: $options) {
      data {
        id
        title
        body
      }
      meta {
        totalCount
      }
    }
  }
`;
export function useGetPostsQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<Types.GetPostsQuery, Types.GetPostsQueryVariables>,
) {
  return ApolloReactHooks.useQuery<Types.GetPostsQuery, Types.GetPostsQueryVariables>(GetPostsDocument, baseOptions);
}
export function useGetPostsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<Types.GetPostsQuery, Types.GetPostsQueryVariables>,
) {
  return ApolloReactHooks.useLazyQuery<Types.GetPostsQuery, Types.GetPostsQueryVariables>(
    GetPostsDocument,
    baseOptions,
  );
}
export type GetPostsQueryHookResult = ReturnType<typeof useGetPostsQuery>;
export type GetPostsLazyQueryHookResult = ReturnType<typeof useGetPostsLazyQuery>;
export type GetPostsQueryResult = ApolloReactCommon.QueryResult<Types.GetPostsQuery, Types.GetPostsQueryVariables>;
export const UpdatePostDocument = gql`
  mutation updatePost($id: ID!, $input: UpdatePostInput!) {
    updatePost(id: $id, input: $input) {
      id
      body
    }
  }
`;
export type UpdatePostMutationFn = ApolloReactCommon.MutationFunction<
  Types.UpdatePostMutation,
  Types.UpdatePostMutationVariables
>;
export function useUpdatePostMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<Types.UpdatePostMutation, Types.UpdatePostMutationVariables>,
) {
  return ApolloReactHooks.useMutation<Types.UpdatePostMutation, Types.UpdatePostMutationVariables>(
    UpdatePostDocument,
    baseOptions,
  );
}
export type UpdatePostMutationHookResult = ReturnType<typeof useUpdatePostMutation>;
export type UpdatePostMutationResult = ApolloReactCommon.MutationResult<Types.UpdatePostMutation>;
export type UpdatePostMutationOptions = ApolloReactCommon.BaseMutationOptions<
  Types.UpdatePostMutation,
  Types.UpdatePostMutationVariables
>;
export const CreatePostDocument = gql`
  mutation createPost($input: CreatePostInput!) {
    createPost(input: $input) {
      id
      body
    }
  }
`;
export type CreatePostMutationFn = ApolloReactCommon.MutationFunction<
  Types.CreatePostMutation,
  Types.CreatePostMutationVariables
>;
export function useCreatePostMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<Types.CreatePostMutation, Types.CreatePostMutationVariables>,
) {
  return ApolloReactHooks.useMutation<Types.CreatePostMutation, Types.CreatePostMutationVariables>(
    CreatePostDocument,
    baseOptions,
  );
}
export type CreatePostMutationHookResult = ReturnType<typeof useCreatePostMutation>;
export type CreatePostMutationResult = ApolloReactCommon.MutationResult<Types.CreatePostMutation>;
export type CreatePostMutationOptions = ApolloReactCommon.BaseMutationOptions<
  Types.CreatePostMutation,
  Types.CreatePostMutationVariables
>;
export const DeletePostDocument = gql`
  mutation deletePost($id: ID!) {
    deletePost(id: $id)
  }
`;
export type DeletePostMutationFn = ApolloReactCommon.MutationFunction<
  Types.DeletePostMutation,
  Types.DeletePostMutationVariables
>;
export function useDeletePostMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<Types.DeletePostMutation, Types.DeletePostMutationVariables>,
) {
  return ApolloReactHooks.useMutation<Types.DeletePostMutation, Types.DeletePostMutationVariables>(
    DeletePostDocument,
    baseOptions,
  );
}
export type DeletePostMutationHookResult = ReturnType<typeof useDeletePostMutation>;
export type DeletePostMutationResult = ApolloReactCommon.MutationResult<Types.DeletePostMutation>;
export type DeletePostMutationOptions = ApolloReactCommon.BaseMutationOptions<
  Types.DeletePostMutation,
  Types.DeletePostMutationVariables
>;
