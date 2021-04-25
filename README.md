<p align="center">
  <a href="" rel="noopener">
 <img width=200px height=200px src="https://github.com/getcovidhelpindia/react/blob/main/public/logo_64.png?raw=true" alt="Project logo"></a>
</p>

<h3 align="center">cloudflare_workers</h3>

<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)

</div>

---

<p align="center"> The backend for getcovidhelp.in
    <br> 
</p>



## 📝 Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Deployment](#deployment)
- [Usage](#usage)
- [Built Using](#built_using)
- [Contributing](../CONTRIBUTING.md)
- [Authors](#authors)
- [Acknowledgments](#acknowledgement)

## 🧐 About <a name = "about"></a>

The backend was built using Nodejs and deployed on cloudflare workers. It uses cloudflare workers kv as its database. 

## 🏁 Getting Started <a name = "getting_started"></a>

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See [deployment](#deployment) for notes on how to deploy the project on a live system.

### Prerequisites

- Create a cloudflare account. Free tier works too.
- Create a kv namespace. This will be needed later
- Install [Wrangler](https://developers.cloudflare.com/workers/cli-wrangler/install-update)
`npm i @cloudflare/wrangler -g`
- Login to your cloudflare account `wrangler login`


### Installing

- Clone this repo `git clone https://github.com/getcovidhelpindia/cloudflare_workers.git`
- Create a `wrangler.toml` file in the root directory. Then add the corresponding account id and namespace ids in the `wrangler.toml`. 
- To run it locally, run `wrangler dev`
- Try pushing data to your kv using postman
API endpoint ` <LOCALHOST>/addData `
Sample body
``` JSON
{
    "state":"Bihar",
    "district":"Arwal",
    "type":"0",
    "info":{
        "name":"Jhumri Teliya",
        "contact":"123456789",
        "description":"Oxygen supplier",
        "location":"Arwal"
        },
    "source":"zyx data",
    "createdAt":"2021-04-22T02:24:07.962Z",
    "isApproved":true,
    "isFlagged":false,
    "Usefulness":0,
    "isHidden":false,
    "key":"bihar_arwal_hanwk1bchhxnn6fn"
    }
```
P.S- Add body as raw text in postman. Form data does not work currently.


## 🚀 Deployment <a name = "deployment"></a>

To deploy to your worker, run `wrangler publish`

## ⛏️ Built Using <a name = "built_using"></a>

- [Cloudflare Workers](https://workers.cloudflare.com/) - Serverless solution
- [Cloudflare Workers KV](https://www.cloudflare.com/en-gb/products/workers-kv/) - Database
- [NodeJs](https://nodejs.org/en/) - Server Environment

## ✍️ Authors <a name = "authors"></a>

- [Chinmay Kabi](https://github.com/Chinmay-KB) - Initial developer


## 🎉 Acknowledgements <a name = "acknowledgement"></a>

- Huge inspiration [covid19india.org](covid19india.org)

