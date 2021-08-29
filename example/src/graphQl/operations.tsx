import type * as Types from './schemas';

export type GetPostsQueryVariables = Types.Exact<{
  options: Types.Maybe<Types.PageQueryOptions>;
}>;

export type GetPostsQuery = {
  posts: Types.Maybe<{
    data: Types.Maybe<Array<Types.Maybe<Pick<Types.Post, 'id' | 'title' | 'body'>>>>;
    meta: Types.Maybe<Pick<Types.PageMetadata, 'totalCount'>>;
  }>;
};

export type UpdatePostMutationVariables = Types.Exact<{
  id: Types.Scalars['ID'];
  input: Types.UpdatePostInput;
}>;

export type UpdatePostMutation = { updatePost: Types.Maybe<Pick<Types.Post, 'id' | 'body'>> };

export type CreatePostMutationVariables = Types.Exact<{
  input: Types.CreatePostInput;
}>;

export type CreatePostMutation = { createPost: Types.Maybe<Pick<Types.Post, 'id' | 'body'>> };

export type DeletePostMutationVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;

export type DeletePostMutation = Pick<Types.Mutation, 'deletePost'>;
