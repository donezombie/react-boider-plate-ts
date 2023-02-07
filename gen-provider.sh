#!/bin/bash

# Prompt for the name of the module
read -p "Enter the name of the PROVIDER: " module_name

# Lowercase and capitalize the string
lowercase_foldername="$(echo "$module_name" | tr '[:upper:]' '[:lower:]')"
capitalized_foldername="$(echo "${lowercase_foldername:0:1}" | tr '[:lower:]' '[:upper:]')${lowercase_foldername:1}"

SOURCEDIR="src/providers/$capitalized_foldername"Provider.tsx""
if [ -f $SOURCEDIR ]
then
echo "File $SOURCEDIR already exists."
else

echo "Creating module: $capitalized_foldername"
cd "src/providers"

touch $capitalized_foldername"Provider.tsx"
echo "import React, { useMemo } from 'react';

interface $capitalized_foldername"I" {}

const $capitalized_foldername"Context" = React.createContext<$capitalized_foldername"I">({});

export const use$capitalized_foldername = () => React.useContext($capitalized_foldername"Context");

const $capitalized_foldername"Provider" = ({ children }: { children: any }) => {
  const value = useMemo(() => {
    return {};
  }, []);

  return <$capitalized_foldername"Context".Provider value={value}>{children}</$capitalized_foldername"Context".Provider>;
};

export default $capitalized_foldername"Provider";" > $capitalized_foldername"Provider.tsx"
fi