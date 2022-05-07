## Using this app

To start up this application run `npm install` followed by `npm start` in the root directory of the project.
The app will be available at http://localhost:3000

## App information

The toggles component is currently configured to accept three props:
- The list of toggles: The `IInputToggle` interface is used for this, each toggle has a list of options following the interface `IInputToggleOption` specifiying the name of the option
and whether that is correct or not
- The question: A string value of the question associated with the toggles
- Layover Image Url: This is a string value for the url of the image that appears once all of the toggles have been set to their correct positions


The background of the application dynamically changes based on the number of toggles that are currently in a correct state, the "most correct" and "least correct" background
colors have been hard-coded based on the tech test figma file, a gradient is then created based on the number of toggles and the background will change to a step on that gradient
dependent on the number of correct answers.

The list of toggles and selected options is randomly shuffled upon each render. It is also set a condition where it won't render if more than half of the toggles are in the correct position to avoid issues such as the page rendering with all of the correct options selected.

## Assumptions and Limitations

- The toggles are currently only set-up to handle two options, with more time I would've adapted it to allow more than two. 
- There is an assumption made that the number of toggles is unlikely to exceed 6, with a bit more if necessary, some form of pagination would probably be added
- The background colours are hard-coded, a potential to add in optional props to make the brackgrounds more adaptable