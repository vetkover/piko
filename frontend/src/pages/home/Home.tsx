import React from "react";
import {getText} from "../../components/languageProcessing/localize";

import "./Home.scss";

import greetingWalpaper from "./greetingWalpaper.png";

import like from "./like.png";
import comment from "./comment.png";
import repost from "./repost.png";
import favorite from "./favorite.png";

import fileIco from "./fileIco.png";
import cloudIco from "./cloudIco.png";
import postIco from "./postIco.png";
import serverIco from "./serverIco.png";

import avatar1 from "./media/avatar.png";
import avatar2 from "./media/avatar2.webp";
import avatar3 from "./media/avatar3.webp";
import avatar4 from "./media/avatar4.webp";
import avatar5 from "./media/avatar5.webp";
import avatar6 from "./media/avatar6.webp";
import avatar7 from "./media/avatar7.webp";
import avatar8 from "./media/avatar8.webp";

import messageChibi from "./messageChibi.png";
import postChibi from "./postChibi.png";
import fileChibi from "./fileChibi.png";

import arrow from "./lineArrow.png";
import file1 from "./file1.png";
import lockIco from "./lockIco.png";
import laptop from './laptop.png';

function PostList() {
  const posts = [
    {
      id: "post1",
      nickname: "EnderSwap",
      avatar: avatar2,
      text: "Can you recommend in the comments some сhinese visual novels about cat girls?",
      like: 27,
      dislike: 8,
      comments: 47,
      favorite: 6,
      reposts: 3,
    },
    {
      id: "post2",
      nickname: "Eldritch",
      avatar: avatar1,
      text: "Voting for a new party will begin next week which president did you choose?",
      like: 168,
      dislike: 38,
      comments: 238,
      favorite: 48,
      reposts: 85,
    },
    {
      id: "post3",
      nickname: "Marta",
      avatar: avatar5,
      text: "Life is like a camera. Focus on what’s important, capture the good times, develop from the negatives, and if things don’t work out, take another shot.",
      like: 52,
      dislike: 8,
      comments: 27,
      favorite: 18,
      reposts: 7,
    },
    {
      id: "post4",
      nickname: "Rinnda",
      avatar: avatar4,
      text: "After the last joint stream in the community you sent so many memes that next time we will watch your memes for the first 3 hours XD",
      like: "4K",
      dislike: 268,
      comments: "1K",
      favorite: "2.4K",
      reposts: 7,
    },
    {
      id: "post5",
      nickname: "Rariani",
      avatar: avatar3,
      text: "Hexagonal architecture has become a popular architectural pattern to help separate business logic from infrastructure. This separation allows technology decisions to be delayed or easily replaced. In addition, it allows you to test business logic in isolation from external systems.",
      like: 53,
      dislike: 3,
      comments: 29,
      favorite: 6,
      reposts: 3,
    },
    {
      id: "post6",
      nickname: "WeLiveInSociety",
      avatar: avatar7,
      text: "The government forces us to buy food so that they can then send us to poop in paid public toilets, instead of legalizing eating poop and solving the problem of hunger forever. But do you think politicians care about hunger? Do they care that hundreds of people are dying from hunger in Africa right now? Of course not. They only think about how to fill their pockets, and not about helping us.",
      like: "17.3K",
      dislike: 357,
      comments: "2.8K",
      favorite: "3K",
      reposts: "9.1K",
    },
    {
      id: "post7",
      nickname: "Aura-chan",
      avatar: avatar8,
      text: "I wanted to add the site to the ad blocker exceptions and regretted it, I probably won’t make such a mistake again...",
      like: 36,
      dislike: 2,
      comments: 6,
      favorite: 2,
      reposts: 0,
    },
  ];

  const postTSX = posts.map((post) => (
    <div className="post-example" id={post.id} key={post.id}>
      <div className="post-top">
        <div className="avatar">
          <img id="avatar" src={post.avatar} />
        </div>
        <div className="nickname">{post.nickname}</div>
      </div>

      <div className="post-down">
        <div className="post-text">
          <a>{post.text}</a>
        </div>

        <div className="control-container">
          <div className="control-option" id="like">
            <img src={like} />
            <a>{post.like}</a>
          </div>

          <div className="control-option" id="dislike">
            <img src={like} />
            <a>{post.dislike}</a>
          </div>

          <div className="control-option" id="comments">
            <img src={comment} />
            <a>{post.comments}</a>
          </div>

          <div className="control-option" id="repost">
            <img src={repost} />
            <a>{post.reposts}</a>
          </div>

          <div className="control-option" id="favorite">
            <img src={favorite} />
            <a>{post.favorite}</a>
          </div>
        </div>
      </div>
    </div>
  ));

  return <React.Fragment>{postTSX}</React.Fragment>;
}

function Home() {
  return (
    <div className="home">
      <div className="greetings-container">
        <img className="greetingWalpaper" src={greetingWalpaper} />
        <div className="post-example-container">
          <PostList />
        </div>
      </div>

      <div className="about-service-container">
        <a id="about_text">
          {getText("home.about_text")}
        </a>

        <div className="about-service">
          <div className="service" id="service1">
            <img className="icoCloud" src={postIco} id="service1Cloud1" />
            <img className="icoCloud" src={postIco} id="service1Cloud2" />
            <img className="icoCloud" src={postIco} id="service1Cloud3" />
            <img src={postChibi} id="serviceImg" />
            <a>{getText("home.postChibi")}</a>
          </div>

          <div className="service" id="service2">
            <img className="icoCloud" src={fileIco} id="service2Cloud1" />
            <img className="icoCloud" src={fileIco} id="service2Cloud2" />
            <img className="icoCloud" src={fileIco} id="service2Cloud3" />
            <img src={fileChibi} id="serviceImg" />
            <a>{getText("home.fileChibi")}</a>
          </div>

          <div className="service" id="service3">
            <img className="icoCloud" src={cloudIco} id="service3Cloud1" />
            <img className="icoCloud" src={cloudIco} id="service3Cloud2" />
            <img className="icoCloud" src={cloudIco} id="service3Cloud3" />
            <img className="icoCloud" src={cloudIco} id="service3Cloud4" />
            <img className="icoCloud" src={cloudIco} id="service3Cloud5" />

            <img src={messageChibi} id="serviceImg" />
            <a>{getText("home.messageChibi")}</a>
          </div>
        </div>
      </div>

      <div className="piko-trust-container">
        <a id="piko-trust_text">{getText("home.piko-trust_text")}</a>

        <div className="piko-trust">
          <div className="piko-trust-line" style={{backgroundImage: `url(${arrow})`}}/>
          <div className="piko-trust-dot-container">
            <div className="piko-trust-dot1"></div>
          </div>
            <img id="serverIco" src={serverIco}></img>

            <img id="file1" src={file1}></img>
            <img id="lockIco" src={lockIco}></img>
            <img id="textFile" src={cloudIco}></img>

            <img id="laptop" src={laptop}></img>
            
        </div>

      </div>
    </div>
  );
}

export default Home;
