import { useState, useEffect } from "react"; //get just useState and useEffect
import axios from 'axios'; //get all of axios

const useAxiosFetch = (dataUrl) => {
    const [data, setData] = useState([]); //Set an array as the data comes back as an array
    const [fetchError, setfetchError] = useState(null);
    const [isLoading, setisLoading] = useState(false);

    useEffect(() => {
        let isMounted = true;
        const source = axios.CancelToken.source();


        const fetchData = async (url) => {
            setisLoading(true);
            try{
                const response = await axios.get(url,{
                    CancelToken: source.token
                }); 
                if(isMounted)
                    setData(response.data);
                    setfetchError(null);
            }catch(err){
                if(isMounted)
                    setfetchError(err.message);
                    setData([]);
            }finally{
                isMounted && setisLoading(false);         
            }
           
        }//end of fetch data
        
        //Invoke the  function as being anonymous, you must invoke it
        fetchData(dataUrl); //pass in dataURL

        const cleanUp = () => {

            isMounted(false);
            source.cancel();
        }

        return cleanUp;
    }, [dataUrl]) //end of useEffect

    return {data, fetchError, isLoading };
}

export default useAxiosFetch;