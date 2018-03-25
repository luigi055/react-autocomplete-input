
# React Input autocompletion
React Input Autocompletation is a little component where you can use independently, since long time ago i wanted to create and implement my own autocomplete input module and now i had the chance to do one for a dev task for Quandoo.

## Creation Steps

- Dev enviroment and tools prepare, using Webpack Legato (V4) ready for produce modern React apps

	- for this step i used my own boilerplate prepared for using the latest version of Webpack with React (and also Redux). For further information about my tech tooling, webpack configuration and packages. Please visit the repository
[Webpack React Boilerplate](https://github.com/luigi055/React-Redux-Boilerplate)

- Controlled component for the input field
	- __Uncontrolled Component vs Controlled Component__
		- In order to keep the form local state updated with the search value term it is needed to implement a Controlled Component. For this case we have to create a stateful class component since we have to store the result value in the component state
		- In React we can see 2 kinds of Form input components
		- __Uncontrolled Component__ Which is like traditional HTML form input so you have a regular form field and in order to receive or get the value, you have to pull the value from the field when needed. the common use case is implementing form submition.
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
        |     :---:      |          :---: |
        | Cannot Manage its own state     | manage its own state    |
        | It doesn't access to neither lifecycle methods nor ref       | Have access to lifecycles methods and ref      |
       	| Can receive Props       | Can Receive Props      |
        | Ease to read due it encorages smaller, focused component       | Sometimes it could be messy to read      |
        | Easier to Test       | Due to its complex nature, it tends to be a little harder to test     |
        | it communicates a clearer interface with less noisy (UI focused instead behavior)       | little noisy to see the UI      |
        | No _this_ keyboard	 | _This_ bound to the component      |
        
