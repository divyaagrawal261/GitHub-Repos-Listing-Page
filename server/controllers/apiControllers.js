import { Octokit } from "octokit";
import fetch from "node-fetch";
import expressAsyncHandler from "express-async-handler";

const octokit = new Octokit({auth: process.env.TOKEN});
var previousUrl=null;
var nextUrl=null;
var lastUrl=null;
var currentUrl=null;
var username=null;

export const getDetails=expressAsyncHandler(async(req,res)=>{
  username=req.body.username;
  console.log(username)
    const events=await octokit.request(`/users/${username}`)
    res.status(200).json(events.data);
})

export const fetchRepos=async(req,res)=>{
  var {username,perPage,page}=req.body;

  if(!perPage)
  perPage=10;

  const url=`https://api.github.com/users/${username}/repos?per_page=${perPage}&page=${page}`;

  try{
    const response=await fetch(url);
    const repositories = await response.json();
    const linkHeader = response.headers.get("Link");

    if(linkHeader)
    {
      nextUrl=((linkHeader.split(",")[0]).split(";")[0]).slice(1,-1);
      lastUrl=((linkHeader.split(",")[1]).split(";")[0]).slice(2,-1);
      
      var totalPages=lastUrl.split("&page=")[1];
    }
    else{
      totalPages=1;
    }
    
    res.status(200).json({repositories,totalPages});
  }
  catch(err)
  {
    console.log(err)
    res.status(400).json({message:"Error!"})
  }
}