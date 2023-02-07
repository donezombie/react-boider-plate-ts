#!/bin/bash

# Prompt for the name of the module
read -p "Enter the name of the SERVICE: " module_name

# Lowercase and capitalize the string
lowercase_foldername="$(echo "$module_name" | tr '[:upper:]' '[:lower:]')"
capitalized_foldername="$(echo "${lowercase_foldername:0:1}" | tr '[:lower:]' '[:upper:]')${lowercase_foldername:1}"

SOURCEDIR="src/services/$lowercase_foldername"Service.ts""
if [ -f $SOURCEDIR ]
then
echo "File $SOURCEDIR already exists."
else

echo "Creating module: $capitalized_foldername"
cd "src/services"

touch $lowercase_foldername"Service.ts"
echo "import {} from 'constants/apiUrl';
import { PromiseResponseBase } from 'interfaces/common';
import httpService from './httpService';

class $capitalized_foldername"Service" {
}

export default new $capitalized_foldername"Service"();
" > $lowercase_foldername"Service.ts"
fi
