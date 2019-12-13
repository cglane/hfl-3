
import {
    map, 
    keys,
    addIndex,
    is,
    find,
    propEq,
    join,
    pluck,
    uniq,
    contains,
    filter,
    sortBy,
    prop,
    reverse
  } from 'ramda'
import config from './config'

const pickAgent = (name, agents) => find(propEq('url_path', name))(agents)

const pluckAgents = (name, agents) => {
  
  return filter((x) => {
    if(!propEq('url_path', name)(x)){
      return true
    }
  })(agents)
}

const orderByWeight = (listArray) => {
    return reverse(sortBy(prop('weight'))(listArray))
}

const getFilters = (listArray, delimeter=',') => {
  const listFeatures = pluck('features')(listArray)
  const mergeLists = [].concat.apply([], listFeatures);
  const uniqueFeatures = uniq(mergeLists)
  const filters = config['price_range'].concat(uniqueFeatures)

  return filters
  }
  const dollarToInt = (dollarString) => {
    const price_no_commas = dollarString.replace(',', '')
    const price_no_dollar = price_no_commas.replace('$', '')
    try {
      return parseInt(price_no_dollar)
    } catch (error) {
      return 0
    }
  }
  const filterListings = (filter, listings) => {
    let filteredListingsIdx = []
    const filteredListings = []

    const filter_lower = filter.toLowerCase()
    //Price range filter
    if (filter[0] === '$' && contains('-', filter)) {
      const filterRange = filter.split('-')
      if (filterRange && filterRange.length > 0){
        const filterOne = dollarToInt(filterRange[0])
        const filterTwo = dollarToInt(filterRange[1])
          mapIndexed((x, itr) => {
            if(x.price){
              const listing_price = parseInt(x.price)
              if (listing_price >= filterOne && listing_price <= filterTwo) {
                filteredListingsIdx.push(itr)
              }
            }
          })(listings)
      }
    }else {
      mapIndexed((x, itr) => {
        const price = (x.price_formatted || x.price_sqft_formatted)
        try{
          if(
            contains(filter_lower,join(' ', x.features).toLowerCase()) 
          || contains(filter_lower, x.street_address.toLowerCase())
          || contains(filter_lower, x.property_name.toLowerCase())
          || contains(filter_lower, price)
        ){
            filteredListingsIdx.push(itr)
          }
        }
          catch{
            console.log('hello ')
          }
      })(listings)
    }
      return pluckListings(filteredListingsIdx, listings)
  }

const pluckListings = (idxList, listings)=>{
  let arr = []
  for (let index = 0; index < idxList.length; index++) {
    if(contains(index, idxList)){
      arr.push(listings[idxList[index]])
    }
  }
  if(arr.length > 0){
    return arr
  }
  return listings
}
const displayListing = (listings) => {
  let preferredListing =  find(propEq('display_listing', true))(listings)
  if (!preferredListing){
    return listings[0]
  }else{
    return preferredListing
  }

}
const mainImage = (listing) => {
    if (listing.images && listing.images.length > 0) {
      const preferredImg = find(propEq('main_image', true))(listing.images)
      if (preferredImg) return preferredImg.get_absolute_image_url
      const firstImage = find((x)=> {return (!!x.get_absolute_image_url)})(listing.images)
      return firstImage.get_absolute_image_url
    }
  }
  const mapIndexed = addIndex(map);

  const snakeCaseConverter = (str) => {
    return str.replace('_', ' ').toUpperCase()
  }
  const detailsData = (obj) => {
    const objKeys = keys(obj)
    //Don't want to add description to page
    objKeys.splice(objKeys.indexOf('description'), 1)
    objKeys.splice(objKeys.indexOf('terrastride_src'), 1)
    objKeys.splice(objKeys.indexOf('html_description'), 1)
    objKeys.splice(objKeys.indexOf('html_title'), 1)
  
    const returnList = []
    map((x) => {
      if(!is(Object, obj[x]) && obj[x]) {
        returnList.push({
          value: obj[x],
          title: snakeCaseConverter(x)
        })
      }
    })(objKeys)
    return returnList
  }
  const listingPath = (listing) => {
    if (listing['property_name']) {
        return `/estate_property/${listing['property_name'].split(' ').join('-')}`
      }
      return `/estate_property/${listing['street_address'].split(' ').join('-')}`
    }

    const agentPath = (agent) => {
      return `/agents/${agent['url_path']}`
    }
  export {
      mainImage,
      mapIndexed,
      detailsData,
      listingPath,
      getFilters,
      filterListings,
      pluckAgents,
      agentPath,
      pickAgent,
      displayListing,
      orderByWeight
  }