import { ITableList } from '@/components/Form/TableCrud';
import { ISuccessAction, successAction } from '@/components/Form/TableCrud/successAction';
import { ICrudState } from '@/components/Form/TableCrud/TableCrud';
import { useCreatePostMutation, useDeletePostMutation, useGetPostsQuery, useUpdatePostMutation } from '@/graphQl/hooks';
import { useCreation } from 'ahooks';
import { useLocalStorageState, usePersistFn, useReactive } from 'ahooks/es';
import { Form } from 'antd';
import isEmpty from 'lodash/isEmpty';

/**
 * ----------------------- Interface ----------------------
 */
export type IJobType = {
  filter: API.GetPostsQueryVariables['options'];
  record: API.GetPostsQuery;
};

type IState = Partial<ICrudState & { record: IJobType['jobRecord'] }>;

export const useIndex = () => {
  /**
   * ----------------------- State and Function ----------------------
   */
  const [form] = Form.useForm<IJobType['jobRecord']>();

  const [columnsStateMap, setColMap] = useLocalStorageState('book', {});

  const defaultFilter: IJobType['filter'] = {};

  const filterValue = useReactive<{ filter?: IJobType['filter'] }>({
    filter: defaultFilter,
  });

  const { filter } = filterValue || {};

  const state = useReactive<IState>({
    type: 'table',
    add: true,
  });

  const { type } = state;
  const isModifyMode = type === 'form';

  /**
   * ----------------------- useGetJobsQuery ----------------------
   */
  const { data: dataPosts, loading: loadingGetPosts, refetch: refetchPosts } = useGetPostsQuery({
    variables: {
      options: filter,
    },
  });

  const afterSuccessAction = (params?: ISuccessAction) => {
    successAction({ form, state: state as any, refetch: refetchPosts, ...params });
  };

  /**
   * ----------------------- deletePostMutation ----------------------
   */
  const [deletePostMutation, { loading: loadingDeletePost }] = useDeletePostMutation({
    onCompleted: (res) => {
      res?.deletePost && afterSuccessAction({ msg: 'Delete post successfully' });
    },
  });

  /**
   * ----------------------- updatePostMutation ----------------------
   */
  const [updatePostMutation, { loading: loadingUpdatePost }] = useUpdatePostMutation({
    onCompleted: (res) => {
      res?.updatePost && afterSuccessAction({ msg: 'Update post successfully' });
    },
  });

  /**
   * ----------------------- createPostMutation ----------------------
   */
  const [createPostMutation, { loading: loadingCreatePost }] = useCreatePostMutation({
    onCompleted: (res) => {
      res.createPost && afterSuccessAction({ msg: 'Create post successfully' });
    },
  });

  /**
   *   ----------------------- Submit Part ----------------------
   */
  const setMode = ({ record }: { record: IState['record'] }) => {
    if (state.isDelete) {
      deletePostMutation({ variables: { id: record?.id } });
    }
  };

  /**
   * ----------------------- Return State& Props ----------------------
   */
  const dataSource = dataPosts?.posts?.data;

  const pageName = 'Posts';
  const tabTitleCrud = useCreation(() => (state.edit && 'Edit') || (state.view && 'View') || (state.add && 'Add'), [
    state?.view,
    state?.edit,
    state?.add,
  ]);

  /**
   * all custom props here
   */
  const customProps = {
    setColMap,
    setMode,
    isModifyMode,
    state,
    tabTitleList: 'List ' + pageName,
    tabTitleCrud: tabTitleCrud + ' ' + pageName,
    pageName,
  };

  return {
    ...customProps,
    dataSource,
    columnsStateMap,
    form,
    loadingSubmit: loadingUpdatePost || loadingCreatePost,
    loading: state.loadingRefetch || loadingGetPosts || loadingDeletePost,
    options: {
      reload: () => {
        afterSuccessAction({ isReload: true });
      },
      search: {
        type: 'search',
        onSearch: (q) => {
          filterValue.filter = {
            ...filterValue.filter,
            search: { q },
          };
        },
      },
    },
    /**
     * submit
     */
    onSubmit: usePersistFn((record: IJobType['jobRecord']) => {
      // console.log('submit', record);
      if (!isEmpty(record)) {
        const { body, id, title } = record || {};
        if (state.edit) {
          updatePostMutation({ variables: { id, input: { body, title } } });
        }
        if (state.add) {
          createPostMutation({ variables: { input: { body, title } } });
        }
      }
    }),

    // beforeSearchSubmit: (params?: IJobType['jobRecord'] & PageInfo) => {
    //   // const newParam = getOnlyValue(params) as typeof params;
    //   console.log('ss', params);
    //   if (!isEmpty(params)) {
    //     filterValue.filter = {
    //       ...filterValue.filter,
    //       search:{q: }
    //     };
    //   }
    // },
    onChange: (pagination) => {
      const { pageSize, current } = pagination;
      // console.log('dd', pagination);
      filterValue.filter = {
        ...filterValue.filter,
        paginate: { limit: pageSize, page: current },
      };
    },
  } as Partial<ITableList & typeof customProps>;
};
