# React Input autocompletion

React Input Autocompletation is a little component where you can use independently, since long time ago i wanted to create and implement my own autocomplete input module and now i had the chance to do one for a dev task for Quandoo.

## Table of contents
- [Next To Do](#next-to-do)
- [Installation](#installation)
- [Enviroments](#enviroments)
  - [Production](#production)
  - [Development](#development)
- [How to use](#how-to-use)
- [Clearing Public Folder](clearing-public-folder)
- [Tech Stack](#tech-stack)
- [Creation Steps](#creation-steps)
- [Software used](#software-used)
- [Author](#author)
- [license](#license)

## Next To Do
- [x] Keyboard controls
- [ ] Accesibility considerations
- [ ] Documentation revisions
- [ ] styled-component template to simplify customization
- [ ] NPM module

## Installing

First step clone this repo
```
$git clone https://github.com/luigi055/react-autocomplete-input.git
```
And then dependning wheather you use npm or yarn

Case using __yarn__:
```
$cd react-autocomplete-input && yarn
```
Case using __npm__
```
$cd react-autocomplete-input && npm install
```
## Enviroments
### Production
  in case you want to emulate a production enviroment use
```
$yarn run start
```
__ONCE YOU WANT TO DEPLOY YOUR APP MAKE SURE TO REMOVE. export NODE_ENV=production || SET \"NODE_ENV=production\" && IN START SCRIPT__

make sure the start script look like this when deploy:
```
"start": "webpack -p --optimize-minimize && node server.js"
```

which runs our local express server and run webpack which build the public folder

In case you just want to build the app inproduction use
```
$yarn run build
```
visit http://localhost:3000 in any browser

### Development
the development enviroment use all the power of webpack dev server. the next script runs the dev server
```
$yarn run dev
```

to build a development package use
```
$yarn run build:dev
```

or in case to want build to compile automatically on save

```
$yarn run build:dev--watch
```

visit http://localhost:3000 in any browser

## How to use

first Import the module
```
import AutoCompleteInput from "./../components/AutoCompleteInput/AutoCompleteInput";
```

Then use the component here i leave all available props supported for now
- __stateName__: __(Is required)__ and is the name which will extract the value of the component
- __parentUpdateState__: __(Is required)__ and together with stateName will extract the value of the component.
- __autoCompleteItems__: __(Is required)__ array of strings with suggested options.
- __maxSuggests__: how many suggests to show _default = 4_.
- __maxWidth__: component max width _default=300px_
- __labelName__: name of the label. (for accesibility is good practice to include it)
- __showLabel__: if show label name _default=false_
- __placeholder__: placeholder of the component _default= ""_
```
        <AutoCompleteInput
          stateName="selectedCountry"
          parentUpdateState={this.updateGlobalState}
          autoCompleteItems={this.state.countries}
          maxSuggests={5}
          maxWidth="280px"
          labelName="Search Country: "
          placeholder="Type a Country Name"
        />
```

## Clearing Public Folder
There's an easy way to remove the public folder via npm or yarn script. it is good practice to remove the build folder before produce it again you can remove this using the following script

```
$yarn run clear
```

## Tech Stack
- React Fiber (V16)
- React dev tools
- Webpack Legato (V4)
- Flow Type checker
- styled-components v3
- Babel (ES6 - ES8)
- ESLint
- Yarn
- git / git flow / github
- PostCSS

## Creation Steps

- Dev enviroment and tools prepare, using Webpack Legato (V4) ready for produce modern React apps

	- for this step i used my own boilerplate prepared for using the latest version of Webpack with React (and also Redux). For further information about my tech tooling, webpack configuration and packages. Please visit the repository

  [Webpack React Boilerplate](https://github.com/luigi055/React-Redux-Boilerplate)

- Controlled component for the input field 
	- __Uncontrolled Component vs Controlled Component__ 
		- In order to keep the form local state updated with the search value term it is needed to implement a Controlled Component. For this case we have to create a stateful class component since we have to store the result value in the component state 
		- In React we can see 2 kinds of Form input components - __Uncontrolled Component__ Which is like traditional HTML form input so you have a regular form field and in order to receive or get the value, you have to pull the value from the field when needed. the common use case is implementing form submition.

          ```
            class NameForm extends React.Component {
              constructor(props) {
                super(props);
                this.handleSubmit = this.handleSubmit.bind(this);
              }

              handleSubmit(event) {
                alert('A name was submitted: ' + this.input.value);
                event.preventDefault();
              }

              render() {
                return (
                  <form onSubmit={this.handleSubmit}>
                    <label>
                      Name:
                      <input type="text" ref={(input) => this.input = input} />
                    </label>
                    <input type="submit" value="Submit" />
                  </form>
                );
              }
            }
          ```
        - __Controlled Components:__ accepts its current value as a prop, as well as a callback to change its value.
        - The value of this type of component live in the state, in the state of other component or a state container like Redux or MobX.
        - Every time you type a new character to the input this update the state and then the new value(which is the same state value) is re-rendered in the component
        - This type of component is particularly useful for validating form inputs.
        ```
        class AutoCompleteInput extends Component<{}, State> {
          state = {
            searchTerm: ""
          };

          handleTermChange = (event: SyntheticInputEvent<HTMLInputElement>) => {
            this.setState({
              searchTerm: event.currentTarget.value
            });
          };

          render() {
            return (
              <label htmlFor="autoComplete">
                Search Input:
                <input
                  id="autoComplete"
                  type="text"
                  value={this.state.searchTerm}
                  onChange={this.handleTermChange}
                  placeholder="Search Item"
                />
              </label>
            );
          }
        }
        ```
      	- __Stateful Class Component vs Stateless Functional Component__
      		- As mention before since whe need to keep the state updated our component needs to be a stateful class component. there is some differencies between Class Components and Stateless Functional Component.
      		| Stateful Class Component | Stateless Functional Component |
        | :---: |  :---: |
        | Cannot Manage its own state | manage its own state |
        | It doesn't access to neither lifecycle methods nor ref | Have access to lifecycles methods and ref |
       	| Can receive Props | Can Receive Props |
        | Ease to read due it encorages smaller, focused component | Sometimes it could be messy to read |
        | Easier to Test | Due to its complex nature, it tends to be a little harder to test |
        | it communicates a clearer interface with less noisy (UI focused instead behavior) | little noisy to see the UI |
        | No _this_ keyboard | _This_ bound to the component |

- Static UI(Presentational Component). Show suggestions and style them using styled-components for this task - Styled-components is a css-in-js implementation this is a modular aproach that fits great together to React components. It Utilises tagged template literals string to style the UI, when you defining your styled you're actually creating a normal Recat component, that has the styles you wrote attached to it!. - Since quandoo uses styled-component i decided to choose the aproach since developers could be more familiar with this syntax.

- Adding Interaction when show and close suggestions
  In this step it's still using static data as suggestions but this time there are interactions when open or close Suggestions component.
  Here i explain you each events i needed and why.
  - onFocus
  Simply pass the input a Focus event listener. when someone focus the input and the search term has at least one 1 characters the suggestions box appears. 
  - onSuggestionClick
  Every LI tag which generates each option has an on click event. When suggestions is open and you click one of the options this replace the searchTerm with this option.

  - onChange
    this event is naturally a feature needed for controlled component. and feed the searchTerm state. 
  - close autosuggestions when click outside or lose focus
    In this case. when you click somewhere outside the component, if suggestion box is open. the open state will turn to false and close it automatically. The best practice and the best way to achieve this or (access the dom element of the component) is using ref. but in this case i'm having some problem implementing ref. so. to save time and temporally to show the result i decided to use ReactDOM.findDOMNode(this) for now. after finish this component i plan to resolve this issue and use a better way to implement it. 
    - ReactDOM.findDOMNode(this) vs get DOM element using ref - If this component has been mounted into the DOM, this returns the corresponding native browser DOM element. This method is useful for reading values out of the DOM, such as form field values and performing DOM measurements. In most cases, you can attach a ref to the DOM node and avoid using findDOMNode at all. - findDOMNode is an escape hatch used to access the underlying DOM node. In most cases, use of this escape hatch is discouraged because it pierces the component abstraction.

    - findDOMNode only works on mounted components (that is, components that have been placed in the DOM). If you try to call this on a component that has not been mounted yet (like calling findDOMNode() in render() on a component that has yet to be created) an exception will be thrown. This is one of the reason i used componentDidMount.

    - findDOMNode cannot be used on functional components.
    - [Read more in the documentation](https://reactjs.org/docs/react-dom.html#finddomnode)
    - About Ref: In the typical React dataflow, props are the only way that parent components interact with their children. To modify a child, you re-render it with new props. However, there are a few cases where you need to imperatively modify a child outside of the typical dataflow. The child to be modified could be an instance of a React component, or it could be a DOM element. For both of these cases, React provides an escape hatch.
    - [Read more in the documentation](https://reactjs.org/docs/refs-and-the-dom.html)
    - componentDidMount vs componentWillMount
    - __componentWillMount__ is similar to the constructor, but can cause sideeffects. When possible, use constructor or componentDidMount. The main use case is subscribing to event and dispatching actions in non-browser enviroment.
    - __componentWillMount__ is invoked just before mounting occurs. It is called before render() therefore calling setState() synchronously in this lifecycle hook will not trigger extra rendering. Generally, it's recommended using the contructor instead. Avoid introducing any side-effects or subscription in this method, for those cases. Use componentDidMount instead. __This is the only lifecycle hook called on server rendering__
    - in __componentDidMount__ you can subscribe to events, dispatch actions using Redux, make any necessary calls to the DOM. this is not called in non-browser enviroment since there is not DOM to mount into. This is invoked after component is mounted. Initialization that requires DOM Nodes should go here. If you need to load data from a remote endpoint this is a good place to instantiate the network request.
        This method is a good place to set up any subscription. If you do that don't forget to unsubscribe in componentWillUnmount().
        Calling setState in this method will trigger extra rendering but it will happen before the browser updates the screen
  - onKeydown close suggestions when press ESC
  	- when suggestion box is open and you need to close it. You can press ESC and the suggestions will close.
  	- differences between event handlers syntax
  	- In React there are different ways to implement Event handlers. For example you can create your event handlers inside the component even if it's functional or class component. Through the time i've preferred to use a component external event handler approach. this way the event function would not be read for the browser Javascript engine until you trigger the event, saving load time and improving UI readability since all the logic would be written after the component declaration.

        ```
            class AutoCompleteInput extends Component<{}, State> {
              state = {
                searchTerm: "",
                open: false
              };
              updateLocalState = state => setState(state);
              render() {
                return (
                  <label htmlFor="autoComplete">
                    Search Input:
                    <input
                      id="autoComplete"
                      type="text"
                      value={this.state.searchTerm}
                      onChange={AutoCompleteInput.handleTermChange(this.updateLocalState)}
                      placeholder="Search Item"
                    />
                  </label>
                );
              }
            }
            AutoCompleteInput.handleTermChange = (updateLocalState: Function) => (
              event: SyntheticInputEvent<HTMLInputElement>
            ) => {
                  updateLocalState({
                    searchTerm: event.currentTarget.value,
                    open: true
                  });
            };
        ```

- Installing and passing data to the autocompletion
  - the autocomplete input is now modular. so the component can be reused as many time as needed.
  - now you can pass some props like state name where can receive the value of the autocomplete input, also the max width, max quantity of options to show, placeholder, labelName, show labelName and a function where you can update state.
  - using the country Rest api we fetch and pass an array with all the country names.

- Store the amount of suggestions in state and send this to Suggests Component
	- this step is for future implementations. To know how many options have the suggestion box and select the options using keyboard.

- Keyboard control is now posible to interact with the autocomplete input. you can select the option using up and down options and select one when pressing enter.

## Software Used

- [visual studio code](https://code.visualstudio.com/)
- [git with git flow](https://git-scm.com/)
- [Haroopad](http://pad.haroopress.com/)
- [yarn](https://yarnpkg.com/lang/en/docs/install/)

## Author
-  __[Pedro La Rosa (luigi055)](https://github.com/luigi055)__

See also the list of [contributors](https://github.com/luigi055/TDAH-REST-API/contributors) who participated in this project.

## License
This project is licensed under the MIT License.