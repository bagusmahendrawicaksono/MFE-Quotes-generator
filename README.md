# Interactive React Web Application

## Event Listenner

Static website vs web applicaiton is ability for user to interact with what we see in the screen

how to make the user can interact with the web component:

```JSX
import "./App.css";

function App() {
  const handleClick = () => {
    console.log("Im CLicked");
  };
  const handleMouseOver = () => {
    console.log("Mouse Over");
  };
  return (
    <div className="App">
      <img src="https://picsum.photos/640/360" onMouseOver={handleMouseOver} />
      <button onClick={handleClick}>Click Me</button>
    </div>
  );
}

export default App;
```

This is the detail about mouse event listener:
https://reactjs.org/docs/events.html#mouse-events

## State

Lets develop the application as below:

**Header.jsx**

```JSX
import React from "react";

export default function Header() {
  return (
    <header className="App-header">
      <img src="brainyquote.png" class="header--image" />
    </header>
  );
}
```

**Quotes.jsx**

```JSX
import React from "react";
import MockData from "../MockData";

export default function Quotes() {
  function handleClick() {
    const imageArray = MockData.data.Images;
    const randomNo = Math.floor(Math.random() * imageArray.length);
    const { url } = imageArray[randomNo];
    console.log(url);
  }
  return (
    <div className="main">
      <div className="form">
        <button className="form--button" onClick={handleClick}>
          Get a new Quote Image
        </button>
        <img src="elonmusk1.jpg" className="quotes--image" />
      </div>
    </div>
  );
}
```

Now how to put the URL value inside the

### Props vs State

**PROPS** refers to the properties being passed into a component in order for it to work correctly, similar to how a function receive parameters: “from above”. A component receiving props is not allowed to modify those props (_immutable_)

```Javascript
function addTwoNumbers(a, b) {
    a = 42
    return a + b
}

console.log(addTwoNumbers(1, 2))

function Navbar(props) {
    props.coverImage = "something else"
}
```

**STATE** refer to value that are managed by the component, similar to variable declared inside a function. Any time you have changing the values that should be saved/display, you’ll likely be using state

### Counter program

This is example to create counter application to demo the use of State

```JSX
import React from "react"

export default function App() {
    /**
     * Challenge:
     * Add functionality to the minus button
     */
    const [count, setCount] = React.useState(0)

    function add() {
        setCount(count + 1)
    }

    function subtract() {
        setCount(count - 1)
    }

    return (
        <div className="counter">
            <button className="counter--minus" onClick={subtract}>–</button>
            <div className="counter--count">
                <h1>{count}</h1>
            </div>
            <button className="counter--plus" onClick={add}>+</button>
        </div>
    )
}
```

### Complex State (Arrays)

This is example for Arrays state

```JSX
import React from 'react';
import ReactDOM from 'react-dom';

function App() {
    const [thingsArray, setThingsArray] = React.useState(["Thing 1", "Thing 2"])

    function addItem() {
        setThingsArray(prevState => {
            return [...prevState, `Thing ${prevState.length + 1}`]
        })
    }

    const thingsElements = thingsArray.map(thing => <p key={thing}>{thing}</p>)

    return (
        <div>
            <button onClick={addItem}>Add Item</button>
            {thingsElements}
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));
```

### COmplex state (Object)

```JSX
import React from "react"

export default function App() {
    const [contact, setContact] = React.useState({
        firstName: "John",
        lastName: "Doe",
        phone: "+1 (719) 555-1212",
        email: "itsmyrealname@example.com",
        isFavorite: false
    })

    let starIcon = contact.isFavorite ? "star-filled.png" : "star-empty.png"

    function toggleFavorite() {
        setContact(prevContact => ({
            ...prevContact,
            isFavorite: !prevContact.isFavorite
        }))
    }

    return (
        <main>
            <article className="card">
                <img src="./images/user.png" className="card--image" />
                <div className="card--info">
                    <img
                        src={`../images/${starIcon}`}
                        className="card--favorite"
                        onClick={toggleFavorite}
                    />
                    <h2 className="card--name">
                        {contact.firstName} {contact.lastName}
                    </h2>
                    <p className="card--contact">{contact.phone}</p>
                    <p className="card--contact">{contact.email}</p>
                </div>

            </article>
        </main>
    )
}
```

### Passing State to Child

```JSX
import React from "react"
import Star from "./Star"

export default function App() {
    const [contact, setContact] = React.useState({
        firstName: "John",
        lastName: "Doe",
        phone: "+1 (719) 555-1212",
        email: "itsmyrealname@example.com",
        isFavorite: true
    })

    function toggleFavorite() {
        setContact(prevContact => ({
            ...prevContact,
            isFavorite: !prevContact.isFavorite
        }))
    }

    return (
        <main>
            <article className="card">
                <img src="./images/user.png" className="card--image" />
                <div className="card--info">
                    <Star isFilled={contact.isFavorite} handleClick={toggleFavorite} />
                    <h2 className="card--name">
                        {contact.firstName} {contact.lastName}
                    </h2>
                    <p className="card--contact">{contact.phone}</p>
                    <p className="card--contact">{contact.email}</p>
                </div>

            </article>
        </main>
    )
}

```

## FORM

To work with form this is what we need to do:

- Create State for current form value
- Add onChange handler to listen to change of value
- Create function handler for that onChange event to update the state value

```JSX
import React from "react"

export default function Form() {
    const [firstName, setFirstName] = React.useState("")

    console.log(firstName)

    function handleChange(event) {
        setFirstName(event.target.value)
    }

    return (
        <form>
            <input
                type="text"
                placeholder="First Name"
                onChange={handleChange}
            />
        </form>
    )
}

```

This is more complex example

```JSX
import React from "react"

export default function Form() {
    const [formData, setFormData] = React.useState(
        {firstName: "", lastName: ""}
    )

    console.log(formData)

    function handleChange(event) {
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [event.target.name]: event.target.value
            }
        })
    }

    return (
        <form>
            <input
                type="text"
                placeholder="First Name"
                onChange={handleChange}
                name="firstName"
            />
            <input
                type="text"
                placeholder="Last Name"
                onChange={handleChange}
                name="lastName"
            />
        </form>
    )
}

```

### Controlled component

Component that is tied to State

```JSX
import React from "react"

export default function Form() {
    const [formData, setFormData] = React.useState(
        {firstName: "", lastName: "", email: ""}
    )

    function handleChange(event) {
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [event.target.name]: event.target.value
            }
        })
    }

    return (
        <form>
            <input
                type="text"
                placeholder="First Name"
                onChange={handleChange}
                name="firstName"
                value={formData.firstName}
            />
            <input
                type="text"
                placeholder="Last Name"
                onChange={handleChange}
                name="lastName"
                value={formData.lastName}
            />
            <input
                type="email"
                placeholder="Email"
                onChange={handleChange}
                name="email"
                value={formData.email}
            />
        </form>
    )
}

```
