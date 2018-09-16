export const FETCH_STATUS = {
    PENDING:"PENDING",
    FETCHED:"FETCHED",
    REJECTED:"REJECTED",
    INITIAL:"INITIAL",
    FETCH:"FETCH"
}

export const LOCATION_URL="";

const dynamicUrl = query => `www.example.com/${query}/current.json`

export const DATA_URL = (origin,destination,fromdate,todate) => `/api/rates/${origin}/${destination}/${fromdate}/${todate}`;

export const PORTS = (inputValue) =>`/api/ports/search/${inputValue}`

export const DATE_FORMAT = "YYYY-MM-DD";