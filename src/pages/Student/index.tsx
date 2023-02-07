import React from 'react';
import { StudentHooks } from './hooks';
import './styles/student.style.scss';

const { useGetList, useCreate, useDelete, useEdit, useGetDetail } = StudentHooks;

interface StudentProps {}

const Student = (props: StudentProps) => {
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
    <div className='student'>
      Student generated!
    </div>
  );
};

export default React.memo(Student);
