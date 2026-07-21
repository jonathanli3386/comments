# Challenge Spec

The verbatim take-home requirements, kept here as the reference for the build.

## About this challenge

This is an exercise that represents some of the work you may encounter at
Bobyard. There is no single right answer — we've left it intentionally
open-ended to understand how you think.

Please don't spend more than ~2 hours on this. If time runs out before
everything is done, no worries this task is meant to take longer! Just write up
a quick explanation of where you would have taken things from where you left
off if there had been more time.

## Getting started

We are going to build comment functionality (similar to that of YouTube or
Reddit). Download the provided JSON file to get started — it has a list of
comments that you will use as data.

## Part 1: Backend

Using any database, language, and framework, set up a simple RESTful backend
API. Please use what you are comfortable with; we expect you to be able to demo
all its functionality & build new features upon it during a follow up. (Bobyard
uses Django REST Framework with PostgreSQL, so slight preference for that
stack.)

Implement edit, add, and delete functionality to comments. Update the database
accordingly when these APIs are called.

**Requirements:**

- Edit text of existing comments
- Add a comment, with new text (from "Admin" user), with the current time
- Delete existing comments
- List all comments

## Part 2: Frontend setup

Please create a simple React.js page displaying these comments. We are judging
the code quality/readability and design of the page.

**Requirements:**

- Get the data from the backend
- Display the text, author, date, likes, and images for the comments
- Clean design

## Part 3: Frontend edit, add, and delete

Now add edit, add, and delete functionality to comments (pretend that the user
is the admin and can change any of the comments). Use the APIs you just made in
the backend.

**Requirements:**

- Edit text of existing comments
- Add a comment with new text (from "Admin" user), with the current time
- Delete comments

## Submission

Put your solution on GitHub. We'll clone it and run it locally, so include a
short README with setup steps — how to install dependencies and start the
backend and frontend.

For the data: no need to host a database remotely. The comments originate from
the provided JSON, so include a seed/load step (e.g. a migration + script or
management command that reads the JSON into a fresh local database) and note it
in the README. Local Postgres or SQLite are both fine — whatever's cleanest to
reproduce.
