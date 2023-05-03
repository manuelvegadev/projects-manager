# Projects Manager

This project is a simple projects manager that can be used to manage the
projects installed in my server.

## 💡 How it works

For the git actions like clone, pull, push, etc. this project uses
the [simple-git](https://www.npmjs.com/package/simple-git) package.

The list of the projects is read from the `config/projects.ts` file and the
credentials are read from the `.env` file.

## ⚙️ Initialization

To initialize this project you must create the configuration files
`config/projects.ts` and `.env` if you want to store the credentials outside the
project code.

Each file has a template with the postfix `.example` that you can use to create

## 🚀 Deployment

To deploy this project you can follow the next guide:

- Must have the previous configuration files and run

    ```bash
    yarn build
    ```

- This project is deployed using [pm2](https://pm2.keymetrics.io/) and the
  ecosystem file is located in `ecosystem.config.js` using the next command

    ```bash
    pm2 start ecosystem.config.js
    ```

- You can use authentication for this project
  with [Nginx](https://www.nginx.com/) using Basic Authentication easily
  following [this](https://docs.nginx.com/nginx/admin-guide/security-controls/configuring-http-basic-authentication/)
  guide

---

> You are free to clone this project and use it as you want, but I will be happy
> if you give me a star ⭐️ and if you want to contribute to this project you can
> create a pull request 🤝 and I will be happy to review it 😁
 
---