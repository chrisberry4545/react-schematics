# React schematics

## React components

Angular schematics used to generate a set of Typescript React components.

Running this will:

- Generate a .ts file with a set of interfaces for the input and dispatch props
- Generate a .tsx file with a React component which expects the combination of the input and dispatch props
- Generate a .ts connector file connecting the component to the store if the 
connected option is not set to false
- Generate a .scss file if the scss option is not set to false
- Update the parents barrel file if it exists exporting either the connected 
component or the base React component depending on whether the connected option
is set or not


## Setup

Running schematics requires angular cli to be installed
`npm i -g @angular/cli`

Install the package via npm:
`npm i @chrisb-dev/react-schematics --save-dev`

## Running

To run with default options
`schematics @chrisb-dev/react-schematics:react-components`

If you run without any options you will prompted to add any required options.
Alternatively these can be specified in the command.

`schematics @chrisb-dev/react-schematics:react-components --name=MyComponent`

### Options

Check out the schema file to view the
[possible options](https://github.com/chrisberry4545/react-schematics/blob/master/src/react-components/schema.json).
