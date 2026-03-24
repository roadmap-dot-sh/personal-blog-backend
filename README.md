# Personal Blog

Build a personal blog to write and publish articles on various topics.

Project URL: <a href="https://roadmap.sh/projects/personal-blog">https://roadmap.sh/projects/personal-blog</a>

You are required to build a personal blog where you can write and publish articles. The blog will have two sections: a
guest section and an admin section.

## Requirements

<b>Guest Section</b> — A list of pages that can be accessed by anyone:

- <b>Home Page</b>: This page will display the list of articles published on the blog.

- <b>Article Page</b>: This page will display the content of the article along with the date of publication.

<b>Admin Section</b> — are the pages that only you can access to publish, edit, or delete articles.

- <b>Dashboard</b>: This page will display the list of articles published on the blog along with the option to add a new
  article,
  edit an existing article, or delete an article.

- <b>Add Article Page</b>: This page will contain a form to add a new article. The form will have fields like title,
  content,
  and
  date of publication.

- <b>Edit Article Page</b>: This page will contain a form to edit an existing article. The form will have fields like
  title,
  content, and date of publication.

Here are the mockups to give you an idea of the different pages of the blog.

Pages that anyone can access

<img src="https://assets.roadmap.sh/guest/blog-guest-pages.png" alt="">

Pages that only the admin can access

<img src="https://assets.roadmap.sh/guest/blog-admin-pages.png" alt="">

## How to Implement

Here are some guidelines to help you implement the personal blog:

### Storage

To keep things simple for now, you can use the filesystem to store the articles. Each article will be stored as a
separate file in a directory. The file will contain the title, content, and date of publication of the article. You can
use JSON or Markdown format to store the articles.

### Backend

You can use any programming language to build the backend of the blog. You don't have to make it as an API for this
project, we have other projects for that. You can have pages that render the HTML directly from the server and forms
that submit data to the server.

### Frontend

For the frontend, you can use HTML and CSS (no need for JavaScript for now). You can use any templating engine to render
the articles on the frontend.

### Authentication

You can implement basic authentication for the admin section. You can either use
the <a href="https://www.youtube.com/watch?v=mwccHwUn7Gc&t=20s" target="_blank">standard HTTP basic
authentication</a>
or simply hardcode the username and password in the code for now and create a simple login page that will create a
session for the admin.