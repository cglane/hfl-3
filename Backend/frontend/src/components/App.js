import React from "react";
import ReactDOM from "react-dom";
import DataProvider from "./DataProvider";
import PropertyLayout from "./PropertyLayout"
import ListingsLayoutDynamic from './ListingsLayoutDynamic'
import Footer from './Footer'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Helmet } from 'react-helmet';
import Header from './Header'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AboutLayout from './AboutLayout'
import {pluckAgents, pickAgent} from '../helpers'
import AgentLayout from "./AgentLayout";
import LandingLayout from './LandingLayout'
import '../jquery'
import '../styles.scss'

const LandingPage = () => {
  $('body, html').css({'overflow-y': 'hidden'})
  return (
    <DataProvider endpoint="api/landing-content"
                  render={data => 
                    <div>
                       <Helmet>
                        <title>Holcombe, Fair & Lane | Charleston, SC | Plantations, Recreational Land and Commercial Real Estate</title>
                        <meta name="description" content="Discover your next South Carolina Lowcountry home or plantation! HFL is a real estate firm serving commercial and recreational clients for over 80 years." />

                        <meta name="theme-color" content="#008f68" />
                      </Helmet>
                      <LandingLayout data={data} />
                    </div>
                } />
  );
}

const EstateProperty = (props) => {
  $('body, html').css({'overflow-y': 'visible'})

  return (
    <DataProvider firstparam={props.match.params.name} endpoint="api/listing_detail"
      render={data =>
        <div>
              <Helmet>
                <title>{  data[0]['html_title']}</title>
                <meta name="description" content={data[0]['html_description'] || data[0]['description']} />
                <meta name="theme-color" content="#008f68" />
              </Helmet>
              <PropertyLayout data={data[0]}/>
        </div>
    } />
  )
}

const LandPage = () => {
  $('body, html').css({'overflow-y': 'visible'})
  return (
  <DataProvider firstparam='Land' endpoint="api/listings"
    render={data => 
      <div>
            <Helmet>
              <title>Holcombe, Fair & Lane | Charleston, SC | Plantations, Recreational Land and Commercial Real Estate</title>
              <meta name="description" content='Land Listings' />
              <meta name="theme-color" content="#008f68" />
            </Helmet>
            <ListingsLayoutDynamic header="Land Listings" data={data}/>
      </div>
  } />
  )
}
const CommercialPage = () => {
  $('body, html').css({'overflow-y': 'visible'})
  return (
  <DataProvider firstparam='Commercial' endpoint="api/listings"
    render={data => 
      <div>
            <Helmet>
              <title>Holcombe, Fair & Lane | Charleston, SC | Plantations, Recreational Land and Commercial Real Estate</title>
              <meta name="description" content='Commercial Listings' />
              <meta name="theme-color" content="#008f68" />
            </Helmet>
            <ListingsLayoutDynamic header="Commercial Listings" data={data}/>
      </div>
  } />
  )
}
const ResidentialPage = () => {
  $('body, html').css({'overflow-y': 'visible'})
  return (
  <DataProvider firstparam='Residential' endpoint="api/listings"
    render={data => 
      <div>
            <Helmet>
              <title>Holcombe, Fair & Lane | Charleston, SC | Plantations, Recreational Land and Commercial Real Estate</title>
              <meta name="description" content='' />
              <meta name="theme-color" content="#008f68" />
            </Helmet>
            <ListingsLayoutDynamic header="Residential Listings" data={data}/>
      </div>
  } />
  )
}
const SoldPage = () => {
  $('body, html').css({'overflow-y': 'visible'})
  return (
  <DataProvider firstparam='Sold' endpoint="api/listings"
    render={data => 
      <div>
            <Helmet>
              <title>Holcombe, Fair & Lane | Charleston, SC | Plantations, Recreational Land and Commercial Real Estate</title>
              <meta name="description" content='Sold Listings' />
              <meta name="theme-color" content="#008f68" />
            </Helmet>
            <ListingsLayoutDynamic header="Sold Listings" data={data}/>
      </div>
  } />
  )
}

const AboutPage = () => {
  $('body, html').css({'overflow-y': 'visible'})
  return (
  <DataProvider endpoint="api/about"
    render={data => 
      <div>
            <Helmet>
              <title>Holcombe, Fair & Lane | Charleston, SC | Plantations, Recreational Land and Commercial Real Estate</title>
              <meta name="description" content={data['description']} />
              <meta name="theme-color" content="#008f68" />
            </Helmet>
            <AboutLayout data={data[0]}/>
      </div>
  } />
  )
}
const AgentPage = (props) => {
  $('body, html').css({'overflow-y': 'visible'})
  return (
  <DataProvider  endpoint="api/agents"
    render={agents => 
      {
        const agent = pickAgent(props.match.params.name, agents)
        const otherAgents = pluckAgents(props.match.params.name, agents)
        return (
          <div>
            <Helmet>
              <title>{`${agent['first_name']} ${agent['last_name']}`}</title>
              <meta name="description" content={agent['description']} />
              <meta name="theme-color" content="#008f68" />
            </Helmet>
            <AgentLayout data={agent} agents={otherAgents}/>
          </div>  
        )
      }
  } />
  )
}
const App = () => (
  <MuiThemeProvider>
    <Router>
      <div>
        <Header/>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/about" component={AboutPage} />
        <Route exact path="/land-listings" component={LandPage} />
        <Route exact path="/commercial-property" component={CommercialPage} />
        <Route exact path="/residential-listings" component={ResidentialPage} />
        <Route exact path="/sold-listings" component={SoldPage} />
        <Route exact path="/estate_property/:name?" component={EstateProperty}/> 
        <Route exact path="/agents/:name?" component={AgentPage}/> 
        <Footer/> 
      </div>
    </Router>
  </MuiThemeProvider>
);

const wrapper = document.getElementById("app");
wrapper ? ReactDOM.render(<App />, wrapper) : null;