import html from "../../assets/about/html.png"
import css from "../../assets/about/css.svg/"
import javascript from "../../assets/about/javascript.png"
import react from "../../assets/about/react.png"
import redux from "../../assets/about/redux.png"
import vite from "../../assets/about/vite.png"
import mongodb from "../../assets/about/mongodb.png"
import bootstrap from "../../assets/about/bootstrap.png"
import express from "../../assets/about/express.png"
import style from "./About.module.css";
import { FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa"

const About = () => {
  const techSkills = [
    { tech: "HTML", image: html }, 
    { tech: "CSS", image: css }, 
    { tech: "JavaScript", image: javascript }, 
    { tech: "React", image: react }, 
    { tech: "Redux", image: redux }, 
    { tech: "Vite", image: vite }, 
    { tech: "MongoDB", image: mongodb }, 
    { tech: "Bootstrap", image: bootstrap }, 
    { tech: "Express", image: express }, 
  ];


  return (
    <div className="container text-white bg-dark"
      style={{ 
        width: "100%",
        maxWidth: "1200px",
        backgroundColor: "#2a2a2a" 
    }}
    >
      <div className="mb-5">
        <div id="theBarkSide" className="d-flex justify-content-center pt-3">
          <h1>The Bark Side</h1>
        </div>
        <p>Welcome to The Bark Side🐶, an exciting online haven created exclusively for dog lovers. Immerse yourself in a fascinating world where all canine breeds come together in harmony.
        </p>
        <p>Our mission is to provide you with a unique experience by granting access to a comprehensive database encompassing every dog breed in the world. Whether you seek information on popular breeds or wish to uncover details about hidden gems within the canine community, you'll find everything you need here.
        </p>
        <p>At The Bark Side, your interaction is pivotal. We've designed an intuitive search system that allows you to quickly discover the dog breed that captivates you the most. Moreover, if you choose to register or log in, you'll have the opportunity to personalize your experience. Add your favorite dogs to a special list and share details about your own pets with our community.
        </p>
        <p>We value your convenience and security, which is why we offer the option to register easily using your <span className={style.Facebook}> Facebook </span> account or through a manual form. We want you to feel part of this community from the very beginning.
        </p>
        <p>At The Bark Side, we believe in providing comprehensive and valuable information. For each dog breed, you'll find a detailed description, including their temperament, height, weight, origin, and life expectancy. And, of course, charming images that capture the essence of each breed couldn't be missed.
        </p>
        <p>Additionally, to streamline your search, we've implemented personalized filters. Now you can explore dogs based on their temperaments, life expectancy, or origin, making it easier to find the perfect canine companion for you.</p>
        <p>The Bark Side is more than just a website; it's a community of passionate dog enthusiasts. Here, we share our love and knowledge about these wonderful creatures that provide us with so much love and companionship.</p>
        <p>So, if you consider yourself a true dog lover, join us at The Bark Side and let yourself be captivated by the diversity and beauty of canine life. Welcome to our marvelous world of dogs!
        </p>
      </div>

      <br />

      <div className="mt-5">
        <div id="aboutMe" className="d-flex justify-content-center">
          <h2>About Me</h2>
        </div>
        <p>
          Hi there! My name is Elias Martinez, and I'm a passionate full stack
          web developer based in Buenos Aires. At just 20 years old, I've found my
          passion in the world of programming, and I love building functional and
          appealing web applications.
        </p>
        <p>
          Throughout my journey, I've had the opportunity to work on the
          development of three exciting full stack web applications
          independently. These applications are built on the REST API
          architecture and utilize a diverse set of technologies, including 
          <span className={style.Mongo}> MongoDB</span>,
          <span className={style.Postgres}> Postgres</span>,
          <span className={style.Sequelize}> Sequelize</span>,
          <span className={style.React}> React</span>,
          <span className={style.Redux}> Redux</span>,
          <span className={style.Vite}> Vite</span>,
          <span className={style.Bootstrap}> Bootstrap</span>,
          <span className={style.Html}> HTML</span>,
          <span className={style.Css}> CSS</span>,
          and 
          <span className={style.Express}> Express</span>, all powered by the mighty 
          <span className={style.Javascript}> JavaScript </span>
          programming language.
        </p>
        <p>
          One of the standout features of my projects is the option for users to
          register and log in using 
          <span className={style.G}> G</span>
          <span className={style.o}>oo</span>
          <span className={style.o2}>o</span>
          <span className={style.G}>g</span>
          <span className={style.l}>l</span>
          <span className={style.e}>e</span> or 
          <span className={style.Facebook}> Facebook </span>
          accounts, providing a
          smoother and more secure user experience by authenticating users with
          JSON Web Tokens.
        </p>
        <p>
          My journey in the world of development started with my training in full
          stack web programming at Henry, an enriching experience that equipped
          me with strong technical knowledge and practical skills to tackle web
          development challenges. Currently, I'm also studying Computer Science
          at the University of Buenos Aires to further expand my knowledge and
          delve deeper into the world of computer science.
        </p>
        <p>
          When I'm not coding, I love exploring new technologies and trends in
          the programming world, and I enjoy sharing my knowledge with other tech
          enthusiasts.
        </p>
        <p>
          I'm excited about what the future holds, and I look forward to
          continuing to create innovative and valuable solutions in the digital
          world!
        </p>
      </div>

      <div className="d-flex justify-content-center">
        <h5 className="mt-3 ">My social media</h5>
      </div>
      <div className="d-flex justify-content-center mb-5">
        <div className={style.redesSociales}>
          <a href="https://www.github.com/XliazZz" target="_blank" rel="noreferrer">
            <FaGithub title="GitHub" className={style.GitHub} />
          </a>
          <a href="https://www.instagram.com/xliazzzx" target="_blank" rel="noreferrer">
            <FaInstagram title="Instagram" className={style.Instagram} />
          </a>
          <a href="https://www.linkedin.com/in/elias-martinez-040980246/" target="_blank" rel="noreferrer">
            <FaLinkedin title="Linkedin" className={style.Linkedin} />
          </a>
      </div>

      </div>

      <div className="d-flex justify-content-center m-2">
        <h4 >A webpage created with:</h4>
      </div>
      <div className="d-flex justify-content-center pb-5">
        <ul className={`list-unstyled row ${style.unorderedList}`}>
          {techSkills.map((skill, index) => (
            <li className={`col-md-6 ${style.listItem}`} key={index}>
              {skill.tech}
              <img src={skill.image} alt={skill.tech} />
            </li>
          ))}
        </ul>
      </div>
  </div>
  )
};

export default About;