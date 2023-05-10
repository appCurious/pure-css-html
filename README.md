# pure-css-html
There are any number of reasons why a pure css and html web page is desired.  Strict security policies, lack of browser support for latest features, SEO opportunity with all the content available.

This is an experiment to discover how to create fully functioning web content using only CSS and HTMl without using JavaScript.

The second experiment is to have the ability to regenerate the content with JavaScript when scripting is desired and allowed. Find a way to rehydrate the content when javascript is allowed or desired.

## Concept
Maintain separation of Data, Model, View and produce an interesting interactive web page that performs without JavaScript. 

JSON models contain the display content definitions for each type of display

JSON content contains the structure definition for all of the desired display content using the JSON from models

## Purposeful Learning 
Working to build up animations, transitions and selections without using JavaScript.

Create fully functioning content without JavaScript

Then discover a way to allow JavaScript and content control using JavaScript by rehyrdrating the existing content.


## Content Generator
Content is developed and generated by JavaScript in order to build up the pure HTML, CSS implementation.

Content generator produces 2 files

## Run
### CLI
flags tell the system how to output your content
```
flags do not need to be in order
named flags with : will be parsed as key value pairs
named flags without : are acted upon as boolean true when present

  process.argv [
       run,
       outfilepath:pathforoutput, // will default to build directory
       contentjson:"{stringified-json}", // will default to sample data
       javascript,
  ]
```

```
codebase\AppCurious\pure-css-html>node content-generator.js run
```

## Directories
### build
Just like any application this is the operating code for the display content.
### export
These are the files produced by the Content Generator.
Pure HTML / CSS content display
Integrated content with JavaScript 
### experiements
Yup just as its indicated, some trial and error and learning without the overhead of script files and build processes

## TODO
### Integrated Content with JavaScript 
Develop a way to produce JavaScript operations
My initial thoughts are to check for the snabby update function passed to the view methods.  When it is present then JavaScript functionality will be added.
### Experiment With User Selections
Try to control content display that can transition into view when the user interacts with controls.  Try to create controls with corresponding content.  1 control, 1 display
### Provide Content
Inlcude some assortment of visual display content.  Assets, Media, Text Values that can be injested by the Content Generator

## Lessons Learned
### CSS Counters
* Counters are not available as query selectors.  button-counter can be used to display the counter value within css content, however it is not available for use within nth-of-type(button-counter)
This means that in order to style content based on active buttons we need to have a style defined for each button and each corresponding content



