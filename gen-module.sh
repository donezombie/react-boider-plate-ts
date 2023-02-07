#!/bin/bash

# Prompt for the name of the module
read -p "Enter the name of the module: " module_name
read -p "Enter the Endpoint API: " api_url
read -p "Enter the Route path: " route_path

# Lowercase the string
lowercase_foldername="$(echo "$module_name" | tr '[:upper:]' '[:lower:]')"
capitalized_foldername="$(echo "${module_name:0:1}" | tr '[:lower:]' '[:upper:]')${module_name:1}"
uppercase_foldername="$(echo "$module_name" | tr '[:lower:]' '[:upper:]')"

# Check if dir has already exists
SOURCEDIR="src/pages/$capitalized_foldername"
if [ -d $SOURCEDIR ]
then
echo "Directory $SOURCEDIR already exists."
else

# If path is inputed
if [ -z "$route_path" ]; then
  echo ""
else
  # Add path to base url
  string_replace_base_url="ImportBaseURL\n $capitalized_foldername: '\\$route_path'\,"
  sed -i '' "s/ImportBaseURL/$string_replace_base_url/g" "./src/constants/baseUrl.ts"

  # Import path
  string_replace="appendHere\n { name: '$capitalized_foldername', \n component: $capitalized_foldername, \n path: BaseUrl.$capitalized_foldername, isPrivateRoute: false },"
  sed -i '' "s/appendHere/$string_replace/g" "./src/routes/routes.tsx"

  # Import pages
  string_import_replace="importHere\n const $capitalized_foldername = lazy\(\(\) => import\('pages\/$capitalized_foldername'\)\);"
  sed -i '' "s/importHere/$string_import_replace/g" "./src/routes/routes.tsx"

  prettier --write './src/routes/routes.tsx'
  prettier --write './src/constants/baseUrl.ts'
  echo "Path generated: [$route_path]"
fi

# Import API URL to API url
cd "src/constants"
string_api_url="ImportAPIURL\n export const $uppercase_foldername"_URL" = \`\$\{ROOT_URL\}\\$api_url\`;"
sed -i '' "s/ImportAPIURL/$string_api_url/g" "apiUrl.ts"
cd ..
cd ..
prettier --write './src/constants/apiUrl.ts'

cd "src/pages"

# Create the folder
echo "Creating module: $capitalized_foldername"
mkdir $capitalized_foldername

# Change into the folder
cd $capitalized_foldername

# Create folder components
mkdir "components"

# Create folder hooks
mkdir hooks
cd "hooks"
touch "index.tsx"
echo "import { useMutation, useQuery } from '@tanstack/react-query';
import { PromiseResponseBase } from 'interfaces/common';
import { showError } from 'helpers/toast';
import httpService from 'services/httpService';
import { $uppercase_foldername"_URL" } from 'constants/apiUrl';

export const API_URL = $uppercase_foldername"_URL";

export const queryKeys$capitalized_foldername = {
  list: '$lowercase_foldername-list',
  create: '$lowercase_foldername-create',
  delete: '$lowercase_foldername-delete',
  edit: '$lowercase_foldername-edit',
  detail: '$lowercase_foldername-detail',
};

interface $capitalized_foldername {}

interface RequestList {}

interface RequestCreate {}

interface RequestEdit {}

interface RequestDelete {}

interface RequestDetail {}

export const $capitalized_foldername"Hooks" = {
  useGetList: (filters?: RequestList) =>
    useQuery({
      queryKey: [queryKeys$capitalized_foldername.list, filters],
      queryFn: (): PromiseResponseBase<$capitalized_foldername[]> =>
        httpService.get(\`\${API_URL}\`),
      onError: (error) => showError(error),
    }),
  useGetDetail: (body?: RequestDetail) =>
    useQuery({
      queryKey: [queryKeys$capitalized_foldername.detail, body],
      queryFn: () => httpService.get(\`\${API_URL}/\${body}\`),
      onError: (error) => showError(error),
    }),
  useCreate: (body?: RequestCreate) =>
    useMutation({
      mutationKey: [queryKeys$capitalized_foldername.create, body],
      mutationFn: (body: RequestCreate) => httpService.post(\`\${API_URL}\`, body),
    }),
  useEdit: (body?: RequestEdit) =>
    useMutation({
      mutationKey: [queryKeys$capitalized_foldername.edit, body],
      mutationFn: (body: RequestEdit) => httpService.post(\`\${API_URL}\`, body),
    }),
  useDelete: (body?: RequestDelete) =>
    useMutation({
      mutationKey: [queryKeys$capitalized_foldername.delete, body],
      mutationFn: (body: RequestDelete) => httpService.delete(\`\${API_URL}/\${body}\`),
    }),
};
" > "index.tsx"
cd ..

# Create folder dialogs
mkdir "dialogs"
cd "dialogs"
mkdir cells
cd ..

# Create folder styles
mkdir "styles"
cd "styles"

filename_scss="$lowercase_foldername.style.scss"
touch $filename_scss
echo ".$lowercase_foldername {}" > $filename_scss
cd ..

# Create interfaces
mkdir "interfaces"
cd "interfaces"
touch "index.tsx"
cd ..

# Create index tsx
touch "index.tsx"
echo "import React from 'react';
import { $capitalized_foldername"Hooks" } from './hooks';
import './styles/$filename_scss';

const { useGetList, useCreate, useDelete, useEdit, useGetDetail } = $capitalized_foldername"Hooks";

interface $capitalized_foldername"Props" {}

const $capitalized_foldername = (props: $capitalized_foldername"Props") => {
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
    <div className='$lowercase_foldername'>
      $capitalized_foldername generated!
    </div>
  );
};

export default React.memo($capitalized_foldername);" > "index.tsx"

echo "Module [$module_name] generated with API: [$api_url] successfully!"
fi