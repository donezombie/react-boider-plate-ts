# Start script
clear
NOW=$(date +"%m-%d-%Y %H:%M:%S")
echo 'Start Module'
echo -e "Please enter your module: "
read name
echo -e "Please enter your parent module (if any): "
read parentName
echo -e "Please enter your author name: "
read AUTHOR

AUTHORNAME="hoanglv"
[ ! -z "$AUTHOR" ] && AUTHORNAME="$AUTHOR"

COPPYRIGHT="/*
  Created by ${AUTHORNAME} at ${NOW}
  Module ${name}
*/"

SRC_SOURCE="src"

if [ ! -z "$parentName" ]
then
mkdir -p "src/views/$parentName"
SOURCEDIR="src/views/$parentName/$name"
PAGE_NAME="views/$parentName/$name"
else
SOURCEDIR="src/views/$name"
PAGE_NAME="views/$name"
fi

if [ -d $SOURCEDIR ]
then
echo "Directory $SOURCEDIR already exists."
else

STYLES_PATH="src/styles/scss/styles.scss"

mkdir $SOURCEDIR
nameLower=${name:l}
nameUpper=${name:u}

# Create file scss
touch "${SOURCEDIR}/$name.styles.scss"
echo ".$nameLower-container {}"  | tee -a "${SOURCEDIR}/$name.styles.scss"
echo "@import '../../views/$name/$name.styles.scss';"  | tee -a $STYLES_PATH

# Create file hooks
SOURCE_HOOKS="${SOURCEDIR}/$name.hooks.tsx"
touch ${SOURCE_HOOKS}
echo "import { useEffect, useState, useCallback } from 'react';
import { ResponseGenerator } from 'interfaces/index';
import useSagaCreators from 'hooks/useSagaCreators';

const use$name"Hooks" = () => {
  const { dispatch } = useSagaCreators();
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [refetching, setRefetching] = useState(false);
  const [error, setError] = useState<any>(null);

  const fetch = useCallback(() => {
    return new Promise(async (resolve, reject) => {});
  }, [dispatch]);

  const refetch = useCallback(async () => {
    try {
      setRefetching(true);
      await fetch();
      setRefetching(false);
    } catch (error) {
      setRefetching(false);
    }
  }, [fetch]);

  const refetchWithLoading = useCallback(async () => {
    try {
      setLoading(true);
      await fetch();
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }, [fetch]);

  useEffect(() => {
    refetchWithLoading();
  }, [refetchWithLoading]);

  return { data, loading, refetching, error, refetch, refetchWithLoading };
};

export default use$name"Hooks";"  | tee -a ${SOURCE_HOOKS}

# Create file api constants
SOURCE_SERVICES="$SRC_SOURCE/constants/api.ts"
echo "export const "$nameUpper"_URL = 'v1/api/$nameLower';" | tee -a ${SOURCE_SERVICES}

#Create file models
SOURCE_MODELS="$SRC_SOURCE/models/${nameLower}.model.ts";
touch ${SOURCE_MODELS}

echo "class ${name}Model {
  constructor(data: ${name}Model) {}
}

export default ${name}Model;" | tee -a ${SOURCE_MODELS}

# Create file services
SOURCE_SERVICES="$SRC_SOURCE/services/${nameLower}Services.ts"
touch ${SOURCE_SERVICES}

echo "import httpService from './httpServices';
import ${name}Model from 'models/$nameLower.model';
import { ${nameUpper}_URL } from 'constants/api';
import { ResponseGenerator } from 'interfaces';

class ${name}Services {
  getList(): Promise<ResponseGenerator<${name}Model>> {
    return httpService.get(${nameUpper}_URL);
  }

  getDetail(): Promise<ResponseGenerator<${name}Model>> {
    return httpService.get(${nameUpper}_URL);
  }

  delete(): Promise<ResponseGenerator<${name}Model>> {
    return httpService.delete(${nameUpper}_URL);
  }
}

export default new ${name}Services();" | tee -a ${SOURCE_SERVICES}


# Create file creators
SOURCE_CREATORS="$SRC_SOURCE/redux/creators/modules/${nameLower}.ts"
touch ${SOURCE_CREATORS}

echo "import { SagaCreator } from 'interfaces/redux';
import ReducerInterface from 'interfaces/reducerInterface';
import { put } from '@redux-saga/core/effects';
import { call } from 'typed-redux-saga';
import produce from 'immer';
import ${nameLower}Services from 'services/${nameLower}Services';

//! Actions
export const ${nameLower}Actions = {
  getList: 'getList',
  getListSuccess: 'getListSuccess',
  getListFailed: 'getListFailed',
  getDetail: 'getDetail',
  getDetailSuccess: 'getDetailSuccess',
  getDetailFailed: 'getDetailFailed',
  delete: 'delete',
  deleteSuccess: 'deleteSuccess',
  deleteFailed: 'deleteFailed',
};

//! Sagas
export const ${nameLower}Sagas = {
  [${nameLower}Actions.getList]: {
    saga: function* ({ payload }) {
      const callbacks = payload?.callbacks;
      try {
        const response = yield* call(${nameLower}Services.getList);
        callbacks?.onSuccess && callbacks.onSuccess(response);
        yield put({ type: ${nameLower}Actions.getListSuccess });
      } catch (error) {
        callbacks?.onFailed && callbacks.onFailed(error);
        yield put({ type: ${nameLower}Actions.getListFailed, error });
      }
    },
  },
  [${nameLower}Actions.getDetail]: {
    saga: function* ({ payload }) {
      const callbacks = payload?.callbacks;
      try {
        const response = yield* call(${nameLower}Services.getDetail);
        callbacks?.onSuccess && callbacks.onSuccess(response);
        yield put({ type: ${nameLower}Actions.getDetailSuccess });
      } catch (error) {
        callbacks?.onFailed && callbacks.onFailed(error);
        yield put({ type: ${nameLower}Actions.getDetailFailed, error });
      }
    },
  },
  [${nameLower}Actions.delete]: {
    saga: function* ({ payload }) {
      const callbacks = payload?.callbacks;
      try {
        const response = yield* call(${nameLower}Services.delete);
        callbacks?.onSuccess && callbacks.onSuccess(response);
        yield put({ type: ${nameLower}Actions.deleteSuccess });
      } catch (error) {
        callbacks?.onFailed && callbacks.onFailed(error);
        yield put({ type: ${nameLower}Actions.deleteFailed, error });
      }
    },
  },
} as SagaCreator;

//! Reducers
export const ${nameLower}Reducer = (
  state = {
    loading: false,
  },
  action: ReducerInterface,
) => {
  return produce(state, (draftState) => {
    switch (action.type) {
      case ${nameLower}Actions.getList: {
        draftState.loading = true;
        break;
      }

      case ${nameLower}Actions.getListSuccess: {
        draftState.loading = false;
        break;
      }

      case ${nameLower}Actions.getListFailed: {
        draftState.loading = false;
        break;
      }

      default:
        break;
    }
  });
};" | tee -a ${SOURCE_CREATORS}

# Create file tsx
SOURCE_TSX="${SOURCEDIR}/$name.page.tsx"
touch ${SOURCE_TSX}
echo "/*
  Created by ${AUTHORNAME} at ${NOW}
  Module ${name}
*/

import React from 'react';
import use$name"Hooks" from '${PAGE_NAME}/$name.hooks';

interface $name"I" {}

const $name = (props: $name"I") => {
  //! State
  const {} = use$name"Hooks"();

  //! Function

  //! Render
  return <div className=\""$nameLower-container"\">$name screen</div>;
};

export default $name;"  | tee -a ${SOURCE_TSX}


echo "Create successfully! -> End Scripts!"
fi