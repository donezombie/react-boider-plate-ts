import React from 'react';
import { TeacherNewHooks } from './hooks';
import './styles/teachernew.style.scss';

const { useGetList, useCreate, useDelete, useEdit, useGetDetail } = TeacherNewHooks;

interface TeacherNewProps {}

const TeacherNew = (props: TeacherNewProps) => {
  //! State
  const { data: resList, isLoading: isLoadingList } = useGetList();
  const { data: resDetail, isLoading: isLoadingDetail } = useGetDetail(1);
  const { mutateAsync: create, isLoading: isCreating } = useCreate();
  const { mutateAsync: edit, isLoading: isEditing } = useEdit();
  const { mutateAsync: remove, isLoading: isDeleting } = useDelete();

  //! Function

  //! Render
  console.log({ resList, resDetail });
  return (
    <div className='teachernew'>
      TeacherNew generated!
    </div>
  );
};

export default React.memo(TeacherNew);
